window.onload = function () {


    var titleHeight = document.querySelector(".title").offsetHeight;

    if (document.querySelector(".nav") != null) {
        document.querySelector(".nav").style.top = titleHeight + "px";
        var headerHeight =
            document.querySelector(".title").offsetHeight +
            document.querySelector(".nav").offsetHeight;
        document.querySelector(".bodyClass").style.marginTop = headerHeight + "px";
    } else {
        document.querySelector(".bodyClass").style.marginTop = titleHeight + "px";
    }

}
window.onscroll = function () {
    if (document.querySelector(".nav") != null) {
        var titleHeight = document.querySelector('.title').offsetHeight;
        var pos = titleHeight - window.pageYOffset;
        console.log(titleHeight);
        document.querySelector('.nav').style.top = pos + 'px';
    }
}
