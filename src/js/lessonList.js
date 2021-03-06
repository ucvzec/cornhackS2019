var listLessons;
//need to get var list lessons
window.onload = function () {
    listLessons = retrieveFields();
    createTheSearchAndSetup();
    setAllVisible();
    populate(0);
    document.querySelector(".listButton").addEventListener("click", () => {
        populate(0);
    });
    document.querySelector(".gridButton").addEventListener("click", () => {
        populate(1);
    });
};

function retrieveFields() {
    let videoList = [];

    let card = document.querySelector(".list").firstElementChild;
    while (card !== null) {
        let video = {};
        video.card = card;

        let infoContainer = card.firstElementChild.nextElementSibling;

        video.title = infoContainer.childNodes[1].textContent;

        let temp = infoContainer.childNodes[3].textContent.split(" - ");
        video.author = temp[0];
        video.date = temp[1];

        video.description = infoContainer.childNodes[5].textContent;
        video.visible = true;
        videoList.push(video);
        card = card.nextElementSibling;
    }
    return videoList;
}

module.exports = {
    retrieveFields,
}

function createTheSearchAndSetup() {
    var search = document.querySelector(".searchInput");
    search.oninput = function () {
        determineVisibility();
    }
}

function determineVisibility() {
    setAllVisible();
    determineSortVisibility();
    populate(2);
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
            if (!listLessons[i].videoTitle.includes(searchText)) {
                if (!listLessons[i].author.includes(searchText)) {
                    if (!listLessons[i].publishedDate.includes(searchText)) {
                        if (!listLessons[i].id.includes(searchText)) {

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