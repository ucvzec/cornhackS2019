const path = require("path");
const fs = require("fs");

const express = require("express");
const twig = require("twig");

const {readVCF} = require(path.resolve(__dirname,"readVCF.js"));
const 

const config = require(path.resolve(__dirname,"..","config.json"));

const server = express();

//Configures express to use Twig as the view engine, so that we can use the render functon
//from express.
server.set('views',path.resolve(__dirname,"..","view"));
server.set('view engine','twig');

//This handler will handle image requests
server.get('/[requestedCategory]/[fileName].[fileType]',(req,res)=>{
	
	let assetCategory = req.params("requestedCategory");
	let fileName = req.params("fileName");
	let fileType = req.params("fileType");

	if( config.assetCategories.contains( req.params(requestedCategory) ) ){
		
		let filePath = path.resolve(__dirname, assetCategory, `${fileName}.${fileType}`);
		
		if(fs.existsSync(filePath)){
			res.type(fileType).status(200).sendFile(filePath);
		}
	}
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	res.status(404).end();

});
//This handler will handle serving gifs

server.get('/testplace',(req,res)=>{
	res.render('videoCard', {
		videoList: readVCF(path.resolve(__dirname,"..","vcf"),{
			description:true,
		}),
	});
});

server.get('/htmlStaging/[fileName]',(req,res)=>{
	res.sendFile(path.resolve(__dirname,"..","html",req.params("fileName")));
});

server.get('/*',(req,res)=>{
	console.log(`recieved a request from ${req.ip} for ${req.originalUrl}`);
	res.render('test',{
		helloMessage:"Hello Twig World!"
	});
});

server.listen(config.port,()=>{
	console.log(`Server is listening for traffic on ${config.port}!`);
});