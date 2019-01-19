var listLessons = [{
        name: "site one",
        imageURL: "https://1.bp.blogspot.com/--M8WrSToFoo/VTVRut6u-2I/AAAAAAAAB8o/dVHTtpXitSs/s1600/URL.png",
        typeOfSite: "Drupal 8.6.2",
        jobNumber: "Job #",
        baseSiteURL: "SiteOne",
        visible: true
    },
    {
        name: "site two",
        imageURL: "https://1.bp.blogspot.com/--M8WrSToFoo/VTVRut6u-2I/AAAAAAAAB8o/dVHTtpXitSs/s1600/URL.png",
        typeOfSite: "Drupal 7.5.9",
        jobNumber: "55555",
        baseSiteURL: "SiteTwo",
        visible: true
    },
    {
        name: "site tres",
        imageURL: "https://1.bp.blogspot.com/--M8WrSToFoo/VTVRut6u-2I/AAAAAAAAB8o/dVHTtpXitSs/s1600/URL.png",
        typeOfSite: "Static",
        jobNumber: "33333",
        baseSiteURL: "siteThree",
        visible: true
    },
    {
        name: "a site",
        imageURL: "https://1.bp.blogspot.com/--M8WrSToFoo/VTVRut6u-2I/AAAAAAAAB8o/dVHTtpXitSs/s1600/URL.png",
        typeOfSite: "Static",
        jobNumber: "666666",
        baseSiteURL: "ASiteForSR",
        visible: true
    }
];
var listOrig = JSON.parse(JSON.stringify(listLessons));
window.onload = function () {
    var titleHeight = document.querySelector(".title").offsetHeight;

    document.querySelector(".nav").style.top = titleHeight + "px";
    var headerHeight =
        document.querySelector(".title").offsetHeight +
        document.querySelector(".nav").offsetHeight;
    document.querySelector(".bodyClass").style.marginTop = headerHeight + "px";
    populate(0);
};

function populate(typeOfList) {
    var areaForItems = document.querySelector(".lessons");
    while (areaForItems.hasChildNodes()) {
        areaForItems.removeChild(areaForItems.lastChild);
    }
    for (var i = 0; i < listLessons.length; ++i) {
        if (listLessons[i].visible) {
            switch (typeOfList) {
                case 0:
                    //list
                    areaForItems.appendChild(createListLongVideo(listLessons[i]));
                    break;
                case 2:
                    //grid
                    break;
            }
        }
    }
}

function createListLongVideo(video) {
    server.get('/*', (req, res) => {
        console.log(`recieved a request from ${req.ip} for ${req.originalUrl}`);
        res.render('videoListItem', {
            video: video
        });
    });
}
function createCardVideo(video) {
    server.get('/*', (req, res) => {
        console.log(`recieved a request from ${req.ip} for ${req.originalUrl}`);
        res.render('videoCard', {
            video: video
        });
    });
}
window.onscroll = function () {
    var titleHeight = document.querySelector(".title").offsetHeight;
    var pos = titleHeight - window.pageYOffset;
    console.log(titleHeight);
    document.querySelector(".nav").style.top = pos + "px";
};

//http://developer.blackberry.com/design/bb10/color.html