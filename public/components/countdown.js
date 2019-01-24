class Countdown extends React.Component {
    constructor (props) {
        super(props);
        this.countdown;
    }
    
    render() {
        clearTimeout(this.countdown);
        let timeleft = Math.ceil((this.props.delete - (new Date()).getTime()) / 1000);
        this.countdown = setTimeout(() => {
            if (timeleft < 0) return;
            this.forceUpdate()
        }, 1000);
        var text = timeleft + "s";
        if (timeleft < 0) text = "deleting...";
        return e("div", {className: "countdown"}, text);
    }
    
    timer() {
        setInterval(() => {
            if (this.state.time == 0) return;
            this.setState({
                time: this.state.time - 1,
                countdownStarted: true
            });
        }, 1000);
    }
}
