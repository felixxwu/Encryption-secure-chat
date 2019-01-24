class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            showTimer: false,
            wrongPassword: true
        };
    }
    
    render() {
        this.message = this.props.message.message;
        this.id = this.props.message.id;
        this.time = this.props.message.time;
        this.delete = this.props.message.delete;
        this.nickname = this.props.message.nickname;
        
        hideSpinner();
        const myText = (() => {
            if (this.id == myID || this.nickname == myNickname) {
                return "myText";
            } else {
                return "";
            }
        })();

        let timePast = (new Date()).getTime() - this.time;
        const minute = 60000;
        const hour = minute * 60;
        var text = Math.floor((timePast / minute) % 60) + "m ago";
        if (timePast > hour) text = Math.floor(timePast / hour) + "h " + text;
        if (timePast < minute) text = "just now";
        
        return e("div", {className: myText},
            e(Id, { id: this.id, nickname: this.nickname }),
            e("div", {className: "time"}, text),
            e("br"),
            this.decrpyted()
        );
    }

    decrpyted() {
        let decryptedMessage = decrypt(this.message, state.password);
        
        if (decryptedMessage == "") {
            return e("div", {className: "message"},
                e("em", {className: "messageText"}, "Decryption error, wrong password?")
            )
        }
        
        let message = e("i", {className: "material-icons"}, "remove_red_eye");
        let countdown = null;
        if (!this.state.hidden) {
            message = e("div", {className: "messageText"}, decryptedMessage);
        }
        if (this.state.showTimer) {
            countdown = e(Countdown, {delete: (new Date()).getTime() + 30000});
        }
        if (this.delete != 0) {
            countdown = e(Countdown, {delete: this.delete});
        }
        return e("div", {className: "message", onClick: () => {

            if (this.id == myID || this.nickname == myNickname) {
                this.setState({hidden: !this.state.hidden});
                return;
            }
            
            showSpinner();
            let waitTime = 60 * 1000;
            if (!this.state.hidden) waitTime = 5 * 1000;
            socket.emit("delete timer", this.message, waitTime, () => {
                this.setState({
                    hidden: !this.state.hidden,
                    showTimer: true
                });
                this.refresh();
            });
        }}, message, countdown);
    }

    refresh() {
        showSpinner();
        socket.emit("refresh", this.group);
    }
}
