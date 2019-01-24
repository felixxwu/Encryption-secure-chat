var setMessages = msg => console.warn("setMessages() not yet initialised");
var updateOnlineUsers = users => console.warn("updateOnlineUsers() not yet initialised");
socket.on("receive message", msgs => setMessages(msgs));
socket.on("online users", users => updateOnlineUsers(users.ids));

class Chat extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: [],
            users: []
        }
    }
    
    render() {
        this.nickname = this.props.nickname;
        this.group = this.props.group;
        hideSpinner();
        specialEnterAction = () => {};

        setMessages = msgs => {
            if (msgs != null)
                this.setState({messages: msgs.results})
        };
        updateOnlineUsers = users => this.setState({users: users});
        
        return e("div", {className: "fullscreen messaging"},
            this.title(),
            this.chat(),
            e(SendBar, {group: this.group, nickname: this.nickname})
        );
    }

    title() {
        return e("div", {className: "title grid3x3 center"},
            e("div", null,
                "Group: ",
                e("b", null, this.group)
                ,
                e("br"),
                "Online users: ",
                this.getUsers()
            )
        )
    }

    chat() {
        let key = 0;
        return e("div", {className: "chat"},
            this.state.messages.map(msg => 
                e(Message, {message: msg, key: key++})
            ),
            e("div", {className: "chatActions"},
                e("i", {
                    className: "material-icons",
                    onClick: () => this.clearAll()
                }, "delete"),
                e("i", {
                    className: "material-icons",
                    onClick: () => this.refresh()
                }, "refresh")
            )
        )
    }

    getUsers() {
        let key = 0;
        let users = this.state.users.map(user =>
            [e(Id, {id: user, key: key++}), ", "]
        ).flat();
        users[users.length - 1] = e("br", {key: key++});
        return users;
    }

    clearAll() {
        showSpinner();
        socket.emit("clear all", this.group);
    }

    refresh() {
        showSpinner();
        socket.emit("refresh", this.group);
    }
}


