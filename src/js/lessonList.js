var listLessons;
//need to get var list lessons
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
                        }
                    }
                }
            }
        }
    }
}

function populate(typeOfList) {
    var areaForItems = document.querySelector(".lessons");
    var lessons = areaForItems.querySelectorAll("div");
    for (var i = 0; i < lessons.length; ++i) {
        if (!listLessons[i].visible) {
            lessons[i].style.display = 'none';
        } else {
            lessons[i].style.display = 'flex';

        }
        switch (typeOfList) {
            case 0:
                //list
                if (lessons[i].class === "listItem") {
                    lessons[i].class = "card";
                }
                break;
            case 2:
                //grid
                if (lessons[i].class === "card") {
                    lessons[i].class = "listItem";
                }
                break;
        }

    }
}



//http://developer.blackberry.com/design/bb10/color.html