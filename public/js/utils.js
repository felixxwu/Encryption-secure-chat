// We listen to the resize event
window.addEventListener("resize", () => resize());

setInterval(() => resize(), 1000);

if (location.protocol != "https:" && redirectToHttps) {
    document.body.innerHTML =
      "<meta http-equiv='refresh' content='0; url=https://wikip.herokuapp.com' />";
}

document.addEventListener("visibilitychange", function() {
  if (document.hidden && redirectIfHidden) {
    window.open("", "_parent", "");
    window.close();
    document.body.innerHTML =
      "<meta http-equiv='refresh' content='0; url=https://en.wikipedia.org/wiki/Special:Random' />";
  }
});

function resize() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function range(end, start = 0, step = 1) {
  let range = [];
  for (let i = start; i < end; i += step) {
    range.push(i);
  }
  return range;
}

function resizeTextarea() {
  element = document.getElementById("chat-input");
  if (element == null) return;
  element.style.height = "0px";

  let paddingTop = element.style.paddingTop;
  let paddingBottom = element.style.paddingBottom;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;

  element.style.height = element.scrollHeight + "px";

  element.style.paddingTop = paddingTop;
  element.style.paddingBottom = paddingBottom;
}
