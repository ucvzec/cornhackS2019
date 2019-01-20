var showing = true;
window.onload = function () {
    document.querySelector(".showMoreTranscript").addEventListener("click", () => {
        clickedShowMoreTranscript();
    });
    document.querySelector(".focusContent").appendChild(getVideoTwig());
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

function getVideoTwig(video) {

    return Twig.renderFile('./src/view/videoPage.twig', {
        video: video
    }, (err, html) => {
        html; // compiled string
    });
}
//http://developer.blackberry.com/design/bb10/color.html