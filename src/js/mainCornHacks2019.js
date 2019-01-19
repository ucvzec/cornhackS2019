window.onload = function () {
}
window.onscroll = function () {
    var titleHeight = document.querySelector('.title').offsetHeight;
    var pos = titleHeight - window.pageYOffset;
    console.log(titleHeight);
    document.querySelector('.nav').style.top = pos + 'px';
}
//http://developer.blackberry.com/design/bb10/color.html