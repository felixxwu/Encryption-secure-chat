const link = require("./linkAll.js");
const sql = require("./sql.js");
const express = require("express");
const path = require("path");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => res.render("pages/index", { link: link.getFiles }));

http.listen(PORT, () => console.log(`Listening on ${PORT}`));

var groups = {};

io.on("connection", function(socket) {
    
    socket.on("join group", async function(group, callback) {
        socket.join(group);
        groups[socket.id] = group;
        callback(group, socket.id);
        updateUsers(group);
        checkMessages(group);
    });

    socket.on("leave group", function(callback) {
        leaveGroup(socket);
        callback();
    });

    socket.on("send message", async function(msg, group, nickname) {
        await sql.query(
            `insert into messages (
                groupName, 
                message, 
                id, 
                time, 
                delete,
                nickname
            ) values (
                '${group}', 
                '${msg}', 
                '${socket.id}', 
                ${(new Date()).getTime()}, 
                0, 
                '${nickname}'
            )`
        );
        
        updateUsers(group);
        checkMessages(group);
    });

    socket.on("delete timer", async function(msg, waitTime, callback) {
        const now = (new Date()).getTime();
        const group = groups[socket.id];
        await sql.query(`update messages set delete = ${now + waitTime}
                         where message = '${msg}' and groupName = '${group}'`);
        deleteTimer(msg, group, waitTime + 1000);
        callback();
    })

    socket.on("refresh", function() {
        let group = groups[socket.id];
        updateUsers(group);
        checkMessages(group);
    })

    socket.on("clear all", async function(group) {
        await sql.query(`delete from messages where groupName = '${group}'`);
        checkMessages(group);
    })

    socket.on("disconnect", function() {
        leaveGroup(socket);
    });
});

async function deleteTimer(msg, group, wait) {
    const condition = `message = '${msg}' and groupName = '${group}'`;
    setTimeout(async () => {
        let results = await sql.query(`select * from messages where ${condition}`);
        if (results.results.length == 0) return;
        const now = (new Date()).getTime();
        if (now > results.results[0].delete) {
            await sql.query(`delete from messages where ${condition}`)
            checkMessages(group);
        } else {
            deleteTimer(msg, group, 2000);
        }
    }, wait);
}

async function checkMessages(group) {
    let messages = await sql.query(`select * from messages where groupName = '${group}' order by time`);
    io.in(group).emit("receive message", messages);
}

function updateUsers(group) {
    let users = [];
    for (let i = 0; i < Object.keys(groups).length; i++) {
        const id = Object.keys(groups)[i];
        if (groups[id] == group) {
            users.push(id);
        }
    }
    io.in(group).emit("online users", {ids: users});
}

function leaveGroup(socket) {
    let group = groups[socket.id];
    delete groups[socket.id];
    
    socket.leaveAll();
    updateUsers(group);
}
