const fs = require("fs");
const path = require("path");

function readVCF(pathToAllVCF){

	let vcfObjs = [];
	let filesInDir = fs.readdirSync(pathToAllVCF);
	
	filesInDir.forEach((fileName)=>{
		let vcfObj = require(path.resolve(pathToAllVCF,fileName));
		console.log(`Candidate path ${path.resolve(__dirname,vcfObj.videoDescriptionPath)}`);
		vcfObj.videoDescription = fs.readFileSync(path.resolve(__dirname,vcfObj.videoDescriptionPath));
		vcfObjs.push(vcfObj);
	});

	return vcfObjs;
}

module.exports = {
	readVCF,
}