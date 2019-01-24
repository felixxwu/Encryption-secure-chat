const e = React.createElement;
var setState;
var state; 

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            screen: "start",
            nickname: null,
            group: null,
            password: null
        }
    }
    
    render() {
        // location.hash = this.state.screen;
        
        setState = (state, callback) => this.setState(state, callback);
        state = this.state;

        switch (this.state.screen) {
            case "start":
                return e(StartMenu);
            case "chat":
                return e(Chat, {group: this.state.group, nickname: this.state.nickname});
        }
    }
}

window.onload = () => {
    ReactDOM.render(e(App), document.querySelector('#app'));
}