class Key extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        this.letter = this.props.letter;
        let className = "key";
        if (this.letter == "space") className = "spaceRowKey";
        return e("div", {
            className: "grid3x3 " + className,
            onMouseUp: () => this.keyAction()
        },
            e("div", null, this.displayLetter())
        );
    }

    displayLetter() {
        switch (this.letter) {
            case "^":
                return e("i", {className: "material-icons"}, "keyboard_arrow_up");
            case ">":
                return e("i", {className: "material-icons"}, "keyboard_capslock");
            case "<":
                return e("i", {className: "material-icons"}, "backspace");
            case "symbols":
                return e("div", {className: "bottomLeft"}, "123");
            case "space":
                return e("div", {className: "space"});
            case "enter":
                return e("i", {className: "material-icons bottomRight"}, "keyboard_return");
            case "letters":
                return e("div", {className: "bottomLeft"}, "abc");
            default:
                return this.letter;
        }
    }

    keyAction() {
        if (this.letter == ">" || this.letter == "letters") {
            changeKeyboard("lowercase");
            return;
        }
        if (this.letter == "^") {
            changeKeyboard("uppercase");
            return;
        }
        if (this.letter == "symbols") {
            changeKeyboard("symbols");
            return;
        }

        if (this.letter == "space") {
            document.getElementById(selectedInput).value += " ";

        } else if (this.letter == "enter") {
            document.getElementById(selectedInput).value += "\n";
            specialEnterAction();

        } else if (this.letter == "<") {
            let text = document.getElementById(selectedInput).value;
            document.getElementById(selectedInput).value = text.slice(0, -1);
            if (text.length == 1) changeKeyboard("uppercase")

        } else {
            document.getElementById(selectedInput).value += this.letter;
        }


        if (this.letter.charCodeAt() >= 65 && this.letter.charCodeAt() <= 90) {
            changeKeyboard("lowercase");
        }
        resizeTextarea();
    }
}