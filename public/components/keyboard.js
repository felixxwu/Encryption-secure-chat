var changeKeyboard;

class Keyboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            keyboard: "uppercase"
        }
    }
    
    render() {
        changeKeyboard = keyboard => this.setState({keyboard: keyboard});
        switch (this.state.keyboard) {
            case "uppercase":
                return e("div", {className: "keyboard"}, this.upperCase());
            case "lowercase":
                return e("div", {className: "keyboard"}, this.lowerCase());
            case "symbols":
                return e("div", {className: "keyboard"}, this.symbols());
        }
    }

    upperCase() {
        return [
            this.row("QWERTYUIOP", "row1"),
            this.row("ASDFGHJKL", "row2"),
            this.row(">ZXCVBNM<", "row3"),
            this.spaceRow("symbols")
        ]
    }

    lowerCase() {
        return [
            this.row("qwertyuiop", "row1"),
            this.row("asdfghjkl", "row2"),
            this.row("^zxcvbnm<", "row3"),
            this.spaceRow("symbols")
        ]
    }

    symbols() {
        return [
            this.row("1234567890", "row1"),
            this.row("@#£_&-+()/", "row1"),
            this.row("%*\"':;!?<", "row3"),
            this.spaceRow("letters")
        ]
    }

    row(chars, row) {
        return e("div", {className: row, key: chars},
            chars.split("").map(letter => 
                e(Key, {letter: letter, key: letter})
            )
        );
    }

    spaceRow(left) {
        return e("div", {className: "spaceRow", key: "space"},
            [
                e(Key, {letter: left, key: "left"}),
                e(Key, {letter: "space", key: "space"}),
                e(Key, {letter: "enter", key: "right"})
            ]
        );
    }
}