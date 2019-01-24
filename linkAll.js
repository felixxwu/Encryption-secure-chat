// inside index.js use: const linkAll = require("path/to/linkAll.js");
// then use: res.render('pages/index', {linkAll: linkAll.getFiles})
// inside index.ejs write:
// for js: <%- linkAll("public/ [your js folder]","js") %>
// for css: <%- linkAll("public/ [your css folder]","css") %>
module.exports = { getFiles: getFiles };

// MODIFY THIS depending on where the public folder is relative to index.js
const publicFolder = "public/";

// returns a string of js script tags or css links tags for all files
// within a specified folder recursively
function getFiles(currentDirPath, type = "js") {
    var links = "";
    var fs = require("fs"),
        path = require("path");

    if (!fs.existsSync(currentDirPath))
        return `<script>console.warn("Directory doesn't exist: ${currentDirPath}")</script>`;

    // read directory files and folders
    var files = fs.readdirSync(currentDirPath);

    for (let i = 0; i < files.length; i++) {
        const name = files[i];

        // get path to this file
        var filePath = path.join(currentDirPath, name);

        // check if it's a file or folder
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            // append js or css link
            links += generateTag(filePath, type);
        } else if (stat.isDirectory()) {
            // recurse
            links += getFiles(filePath, type);
        }
    }
    return links;
}

// returns an html tag as string that links a js or css file
function generateTag(path, type) {
    // check if the file is inside the public folder
    const removed = path.substring(0, publicFolder.length);
    const rest = path.substring(publicFolder.length);

    // windows uses \ but others use //, so check for both
    if (removed != publicFolder && removed != publicFolder.replace("/", "\\")) {
        console.error(
            "linkAll.js: ",
            type,
            "file is not in the public folder. Public folder:",
            publicFolder,
            "File path:",
            path
        );
        return `type: ${type} public folder: ${publicFolder} path: ${path}`;
    }

    // check if the filetype is correct
    if (!verifySuffix(path, type)) return "incorrect suffix";

    // return the link tags
    if (type == "js") {
        return `<script src="${rest}"></script>\n`;
    } else if (type == "css") {
        return `<link rel="stylesheet" href="${rest}">\n`;
    } else {
        console.error("linkAll.js: Type is not valid, use js or css. Type:", type);
        return "";
    }
}

// returns true if the suffix (filetype) matches a the true suffix
function verifySuffix(path, trueSuffix) {
    // grab the last few characters from the path, including the .
    var suffix = path.slice(trueSuffix.length * -1 - 1);

    if (suffix != "." + trueSuffix) {
        console.warn(
            "linkAll.js: Trying to link",
            trueSuffix,
            "files, but found",
            suffix,
            "in the folder. File will be skipped:",
            path
        );
        return false;
    } else {
        return true;
    }
}
