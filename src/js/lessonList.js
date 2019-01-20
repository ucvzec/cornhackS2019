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
    createTheSearchAndSetup();
    setAllVisible();
    populate(0);
};

function createTheSearchAndSetup() {
    var search = document.querySelector(".searchInput");
    search.oninput = function () {
        determineVisibility();
    }
}

function determineVisibility() {
    setAllVisible();
    determineFilterVisibilty();
    determineSortVisibility();
    recreateSite(list);

}

function setAllVisible() {
    for (var i = 0; i < listLessons.length; i++) {
        listLessons[i].visible = true;
        listOrig[i].visible = true;
    }
}

function determineSortVisibility() {
    //search
    var search = document.querySelector(".searchInput");
    var searchText = search.value;
    if (searchText.length > 0) {
        for (var i = 0; i < listLessons.length; i++) {
            if (!listLessons[i].typeOfSite.includes(searchText)) {
                if (!listLessons[i].jobNumber.includes(searchText)) {
                    if (!listLessons[i].name.includes(searchText)) {
                        if (!listLessons[i].baseSiteURL.includes(searchText)) {
                            listLessons[i].visible = false;
                            listOrig[i].visible = false;
                        }
                    }
                }
            }
        }
    }
}
//http://developer.blackberry.com/design/bb10/color.html