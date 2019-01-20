const path = require("path");
const fs = require("fs");

const express = require("express");
const twig = require("twig");

const {readVCF} = require(path.resolve(__dirname,"readVCF.js"));
const logger = require(path.resolve(__dirname,"logger.js"))("server");

const config = require(path.resolve(__dirname,"..","config.json"));

logger.logLine("Loaded Dependencies.");

const server = express();

//Configures express to use Twig as the view engine, so that we can use the render functon
//from express.
server.set('views',path.resolve(__dirname,"..","view"));
server.set('view engine','twig');

logger.logLine("Set view engine variables.");

//handles serving top level html

let htmlRegex = new RegExp("^\/([0-9a-zA-Z]+)\.htm[l]?$","i");

server.get(htmlRegex,(req,res,next)=>{
	let fileName = req.params[0];

	res.sendFile(path.resolve(__dirname,"..","html",`${fileName}.html`));
});

//resource regex
let assetCategoryOr = config.assetCategories.join("|");
let resourceTypeOr = config.resourceTypes.join("|");

let resourceRegex = new RegExp(`^\/(${assetCategoryOr})\/([a-zA-Z0-9]+)\.(${resourceTypeOr})`);

//the parameters that are stored are:
//0: category | 1: resourceName | 2: resourceType
server.get(resourceRegex,(req,res,next)=>{

	let category = req.params[0];

	let fileName = req.params[1];
	let fileType = req.params[2];

	console.log(`Recieved asset request for ${req.originalUrl}`);
	let filePath = path.resolve(__dirname,"..", category, `${fileName}.${fileType}`);
			
	if(fs.existsSync(filePath)){
		res.status(200).sendFile(filePath);
		return;
	}else{
		logger.logAndConsole(`Requested asset file did not exist using ${filePath}`);
		res.status(404).end();
		return;
	}
});
server.get(/^\/(?:lesson[s]?)((?:page|menu)?[s]?)$/i,(req,res)=>{
	logger.logAndConsole(`Rendered lesson page from absolute route.`);
	res.render('lessonListPage', {
		videoList: readVCF(path.resolve(__dirname,"..","vcf"),{
			description:true
		}),
	})
});

//this handles all of the static first level pages, and serves them if they are matched
server.get('/*',(req,res,next)=>{

	let pageName = req.originalUrl.slice(1);

	let twigAlisas = config.staticTopLevelPages[pageName];

	if(typeof twigAlisas !== 'undefined'){
		logger.logAndConsole(`Rendered ${pageName} using top level static.`);

		res.render(twigAlisas,{

		});
		return;
	}else{
		logger.logLine(`No alias match for ${pageName}.`);
	}
	next();
});

server.get('/*',(req,res)=>{
	logger.logAndConsole(`Reached end route and recieved no instructions for ${req.originalUrl}`);
	res.send("end route");
});

logger.logLine("Finished setting up routes.");

server.listen(config.port,()=>{
	logger.logAndConsole(`Server is now running on port ${config.port}.`);
});