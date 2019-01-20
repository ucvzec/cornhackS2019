function retrieveFields(){
	let videoList = [];

	let card = document.querySelector(".list").firstElementChild;
	while(card !== null){
		let video = {};
		video.card = card;

		let infoContainer = card.firstElementChild.nextElementSibling;

		video.title = infoContainer.childNodes[1].textContent;
		
		let temp = infoContainer.childNodes[3].textContent.split(" - ");
		video.author = temp[0];
		video.date = temp[1];
		
		video.description = infoContainer.childNodes[5].textContent;

		videoList.push(video);
		card = card.nextElementSibling;
	}
	return videoList;
}

module.exports = {
	retrieveFields,
}