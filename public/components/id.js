class Id extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }
    
    render() {
        this.id = this.props.id;
        this.nickname = this.props.nickname;
        let className = "id";
        let id = (() => {
            if (this.state.expanded) return this.id;
            if (this.nickname == myNickname) {
                className += " me";
                return `Me (${myNickname})`;
            }
            if (this.id == myID) {
                className += " me";
                return "Me";
            }
            if (this.nickname) return this.nickname;
            return this.id.substring(0, 4);
        })();
        return e("span", {className: className, onClick: () => {
            this.setState({expanded: !this.state.expanded})
        }}, id);
    }
}
