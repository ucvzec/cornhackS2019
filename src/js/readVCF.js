const fs = require("fs");
const path = require("path");
const logger = require(path.resolve(__dirname,"logger.js")("vcf");

//tasks is a map that will talk about what fields we need to load from paths.
//current task options: description | article
function readVCF(pathToAllVCF,tasks){

	let vcfObjs = [];
	let filesInDir = fs.readdirSync(pathToAllVCF);
	
	filesInDir.forEach((fileName)=>{
		let vcfObj = require(path.resolve(pathToAllVCF,fileName));

		if(typeof tasks !== 'undefined'){
			if(typeof tasks.description !== 'undefined' && tasks.description){
				loadVCFDescription(vcfObj);
			}
			if(typeof tasks.article !== 'undefined' && tasks.article){
				loadVCFArticle(vcfObj);
			}
		}else{
			logger.logLine(`No tasks were assigned for ${pathToAllVCF} read.`);
		}

		vcfObjs.push(vcfObj);
	});

	logger.logLine(`Successfully created all ${vcfObjs.length} VCF objects.`);

	return vcfObjs;
}

function loadVCFDescription(vcfObj){
	let descriptionPath = path.resolve(__dirname,vcfObj.videoDescriptionPath);

	if(fs.existsSync(descriptionPath)){
		vcfObj.videoDescription = fs.readFileSync(descriptionPath);
		console.log(`Sucessfully loaded description from ${descriptionPath}`);
		logger.logLine(`Sucessfully loaded description from ${descriptionPath}`);
	}else{
		console.log(`Failed to load description from ${descriptionPath}`);
		logger.logLine(`Failed to load description from ${descriptionPath}`);
	}
}
function loadVCFArticle(vcfObj){
	let articlePath = path.resolve(__dirname,vcfObj.videoArticlePath);

	if(fs.existsSync(vcfObj.videoArticlePath)){
		vcfObj.videoArticle = fs.readFileSync(articlePath);
		console.log(`Sucessfully loaded article from ${descriptionPath}`);
		logger.logLine(`Sucessfully loaded article from ${descriptionPath}`);
	}else{
		console.log(`Failed to load article from ${articlePath}`);
		logger.logLine(`Failed to load article from ${articlePath}`);
	}
}

module.exports = {
	readVCF,
}