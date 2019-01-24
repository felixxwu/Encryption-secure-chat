var selectedInput;

class SendBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showKeyboard: true
        }
    }

    render() {
        this.nickname = this.props.nickname;
        this.group = this.props.group;
        this.id = "chat-input";
        selectedInput = "chat-input";
        let icon = "keyboard_hide";
        let keyboard = e(Keyboard);
        if (this.state.showKeyboard == false) {
            icon = "keyboard";
            keyboard = null;
        };
        resizeTextarea();

        return e("div", null, 
            e("div", {className: "sendBar"},

                e("textarea", {
                    id: this.id,
                    autoComplete: "off",
                    autoFocus: true,
                    onChange: () => resizeTextarea()
                }),

                e("div", {className: "grid3x3"},
                    e("i", {className: "material-icons send", onClick: () => {
                        this.sendMessage($(`#${this.id}`).val());
                        $(`#${this.id}`).val("");
                        resizeTextarea();
                    }}, "send")
                )
            )
        )
    }

    componentDidMount() {
        resizeTextarea();
    }

    sendMessage(msg) {
        if (msg == "") return;
        showSpinner();
        msg = encrypt(msg, state.password);
        socket.emit("send message", msg, this.group, this.nickname);
        // changeKeyboard("uppercase");
    }
}