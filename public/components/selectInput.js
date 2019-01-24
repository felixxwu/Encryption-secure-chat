class SelectInput extends React.Component {
    constructor (props) {
        super(props);
    }
    
    render() {
        this.selected = this.props.selected;
        if (this.selected) {
            return e("i", {className: "material-icons"}, "text_fields");
        } else {
            return e("i", {className: "material-icons"}, "edit");
        }
    }
}