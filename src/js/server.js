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

//This handler will handle image requests


server.get('/htmlStaging/:fileName',(req,res)=>{
	res.sendFile(path.resolve(__dirname,"..","html",req.params.fileName));
});

server.get('/:requestedCategory/:file',(req,res)=>{
	let assetCategory = req.params.requestedCategory;
	let file = req.params.file;

	console.log(`Recieved asset request for ${req.originalUrl}`);

	if( config.assetCategories.includes(req.params.requestedCategory) ){
		
		let filePath = path.resolve(__dirname, assetCategory, `${file}`);
		
		if(fs.existsSync(filePath)){
			res.status(200).sendFile(filePath);
		}
	}
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	res.status(404).end();

});
server.get('/lessonpage',(req,res)=>{
	res.render('lessonsPageTwig', {
		videoList: readVCF(path.resolve(__dirname,"..","vcf"),{
			description:true
		}),
	})
});

server.get('/testplace',(req,res)=>{
	res.render('videoCard', {
		videoList: readVCF(path.resolve(__dirname,"..","vcf"),{
			description:true,
		}),
	});
});


server.get('/*',(req,res)=>{
	console.log(`Recieved a request for ${req.originalUrl}`);
	console.log(`recieved a request from ${req.ip} for ${req.originalUrl}`);
});

logger.logLine("Finished setting up routes.");

server.listen(config.port,()=>{
	console.log(`Server is listening for traffic on ${config.port}!`);
	logger.logLine(`Server is now running on port ${config.port}.`);
});