var showing = true;
window.onload = function () {
    var titleHeight = document.querySelector(".title").offsetHeight;
    document.querySelector(".bodyClass").style.marginTop = titleHeight + "px";
    document.querySelector(".showMoreTranscript").addEventListener("click", () => {
        clickedShowMoreTranscript();
    });
};

function clickedShowMoreTranscript() {
    if (showing) {
        showing = false;
        document.querySelector(".transcript").style.height = "auto";
        document.querySelector(".showMoreTranscript").innerHTML = "Show Less...";
    } else {
        showing = true;
        document.querySelector(".transcript").style.height = "150px";
        document.querySelector(".showMoreTranscript").innerHTML = "Show More...";
    }
}
//http://developer.blackberry.com/design/bb10/color.html