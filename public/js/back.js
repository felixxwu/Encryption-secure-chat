window.addEventListener("hashchange", function(e) {
    // this check is so when forward is called, the hashchange listener is activated, but nothing happens
    // because the current hash is the last element in the hashstack
    // if it wasnt, we know that the user changed it
    if (location.hash != "#" + state.screen) {
        // transitions[state.screen]();
    }
});

// transitions for going back in the browser
var transitions = {
    start: () => exitApp(),
    chat: () => leaveGroup()
}

// forces back button until app is exited
function exitApp() {
    history.back();
    exitApp();
}

function leaveGroup() {
    socket.emit("leave group", () => {
        setState({
            screen: "start",
            group: null,
            password: null
        });
    });
}
