window.onload = function () {
    var titleHeight = document.querySelector('.title').offsetHeight;


    document.querySelector('.nav').style.top = titleHeight + 'px';
    var headerHeight = document.querySelector('.title').offsetHeight + document.querySelector('.nav').offsetHeight;
    document.querySelector('.bodyClass').style.marginTop = headerHeight + 'px';
}
window.onscroll = function () {
    var titleHeight = document.querySelector('.title').offsetHeight;
    var pos = titleHeight - window.pageYOffset;
    console.log(titleHeight);
    document.querySelector('.nav').style.top = pos + 'px';
}
//http://developer.blackberry.com/design/bb10/color.html