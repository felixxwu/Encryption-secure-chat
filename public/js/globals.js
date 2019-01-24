// start menu
const nicknameInputID = "nickname";
const groupInputID = "input";
const passwordInputID = "password";
const nicknameInputHint = "Nickname (required)";
const groupInputHint = "Group name (required)";
const passwordInputHint = "Password (10+ characters)";
const submitButtonText = "OK";

const redirectIfHidden = false;
const redirectToHttps = false;

// keyboard
var selectedInput;
var specialEnterAction;

var socket = io();
var myID;
var myNickname;

// loading spinner
function hideSpinner() {
    $("#loading").hide();
}

function showSpinner() {
    $("#loading").show();
}