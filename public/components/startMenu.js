class StartMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedInput: nicknameInputID
        }
        this.nicknameIcon;
        this.groupIcon;
        this.passwordIcon;
    }
    
    render() {
        this.nicknameSelected = "";
        this.groupSelected = "";
        this.passwordSelected = "";
        selectedInput = this.state.selectedInput;
        hideSpinner();

        switch (this.state.selectedInput) {
            case nicknameInputID:
                specialEnterAction = () => {
                    let nickname = $("#" + nicknameInputID).val();
                    if (nickname.length < 1) return;
                    this.selectGroup();
                };
                break;
            case groupInputID:
                specialEnterAction = () => {
                    let groupName = $("#" + groupInputID).val();
                    if (groupName.length < 1) return;
                    this.selectPassword();
                };
                break;
            case passwordInputID:
                specialEnterAction = () => {
                    $("#submit").click();
                };
                break;
        }

        return e("div", {className: "start-menu fullscreen"},
            e("div", {className: "grid3x3"},
                e("div", {style: {textAlign: "center"}}, 
                    this.nicknameInput(),
                    this.groupInput(),
                    this.passwordInput(),
                    this.submitButton()
                )
            )
        );
    }

    nicknameInput() {
        return e("div", {className: "start-menu-input"}, 
            e("div", {
                className: "grid3x3",
                onClick: () => this.selectNickname()
            }, this.nicknameIcon),
            e("input", {
                type: "text",
                placeholder: nicknameInputHint,
                id: nicknameInputID,
                style: {display: "block"},
                className: this.nicknameSelected,
                autoFocus: true,
                onClick: () => this.selectNickname()
            })
        );
    }

    groupInput() {
        return e("div", {className: "start-menu-input"},
            e("div", {
                className: "grid3x3", 
                onClick: () => this.selectGroup()
            }, this.groupIcon),
            e("input", {
                type: "text",
                placeholder: groupInputHint,
                id: groupInputID,
                style: {display: "block"}, 
                className: this.groupSelected,
                onClick: () => this.selectGroup()
            })
        );
    }

    passwordInput() {
        return e("div", {className: "start-menu-input"},
            e("div", {
                className: "grid3x3",
                onClick: () => this.selectPassword()
            }, this.passwordIcon),
            e("input", {
                type: "password",
                placeholder: passwordInputHint,
                id: passwordInputID,
                style: {display: "block"},
                className: this.passwordSelected,
                onClick: () => this.selectPassword()
            })
        );
    }

    submitButton() {
        return e("button", {id: "submit", onClick: () => {
            let nickname = $("#" + nicknameInputID).val();
            let groupName = $("#" + groupInputID).val();
            let password = $("#" + passwordInputID).val();

            if (nickname.length < 1 || groupName.length < 1 || password.length < 10) {
                alert("Input fields are not filled out yet");
                return;
            };
            
            showSpinner();
            socket.emit("join group", groupName, (group, id) => {
                myID = id;
                myNickname = nickname;
                setState({
                    screen: "chat",
                    nickname: nickname,
                    group: group,
                    password: password
                });
            });
        }}, submitButtonText);
    }

    selectNickname() {
        this.setState({selectedInput: nicknameInputID});
    }

    selectGroup() {
        this.setState({selectedInput: groupInputID});
    }

    selectPassword() {
        this.setState({selectedInput: passwordInputID});
    }
}