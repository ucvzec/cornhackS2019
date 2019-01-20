const fs = require("fs");
const path = require("path");
const logger = require(path.resolve(__dirname,"logger.js"))("vcf");

//This method will read ALL of the VCF's from a given directory
//tasks is a map that will talk about what fields we need to load from paths.
//current task options: description | article
function readVCFDir(pathToAllVCF,tasks){

	let vcfObjs = [];
	let filesInDir = fs.readdirSync(pathToAllVCF).filter((fileName)=>{
		return fileName.split(".").pop() == "vcf";
	});
	
	filesInDir.forEach((fileName)=>{
		let vcfObj = JSON.parse(fs.readFileSync(path.resolve(pathToAllVCF,fileName)));

		vcfObj = performVCFTasks(vcfObj);

		vcfObjs.push(vcfObj);
	});

	logger.logLine(`Successfully created all ${vcfObjs.length} VCF objects.`);

	return vcfObjs;
}

function readVCF(pathToVCFDir,fileName,tasks){

	let pathForVCFFile = path.resolve(pathToVCFDir,`${fileName.replace(/(?:\.vcf)$/,"")}.vcf`);
	if(fs.existsSync(pathForVCFFile)){
		let vcfObj = JSON.parse(fs.readFileSync(pathForVCFFile));
		
		vcfObj = performVCFTasks(vcfObj,tasks);

		return vcfObj
	}else{
		logger.logAndConsole(`No VCF was found for ${fileName} in ${pathToVCFDir}.`);
		return null;
	}
}

function performVCFTasks(vcfObj,tasks){
	if(typeof tasks !== 'undefined'){
		if(typeof tasks.description !== 'undefined' && tasks.description){
			loadVCFDescription(vcfObj);
		}
		if(typeof tasks.article !== 'undefined' && tasks.article){
			loadVCFArticle(vcfObj);
		}
	}else{
		logger.logLine(`No tasks were assigned for ${vcfObj}.`);
	}
	return vcfObj;
}

function loadVCFDescription(vcfObj){
	let descriptionPath = path.resolve(__dirname,vcfObj.videoDescriptionPath);

	if(fs.existsSync(descriptionPath)){
		vcfObj.videoDescription = fs.readFileSync(descriptionPath);
		logger.logAndConsole(`Sucessfully loaded description from ${descriptionPath}`);
	}else{
		logger.logAndConsole(`Failed to load description from ${descriptionPath}`);
	}
}
function loadVCFArticle(vcfObj){
	let articlePath = path.resolve(__dirname,vcfObj.videoArticlePath);

	if(fs.existsSync(vcfObj.videoArticlePath)){
		vcfObj.videoArticle = fs.readFileSync(articlePath);
		logger.logAndConsole(`Sucessfully loaded article from ${descriptionPath}`);
	}else{
		logger.logAndConsole(`Failed to load article from ${articlePath}`);
	}
}

module.exports = {
	readVCFDir,
	readVCF,
}