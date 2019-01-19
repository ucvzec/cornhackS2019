const fs = require("fs");
const path = require("path");

class Logger{

	//available options are:
	//timestamp | 
	constructor(logName,settings){
		
		this.logPath = path.resolve(__dirname,"..","logs",`${logName}.log`);

		this.settings = settings;

		this.startMessageLog()
	}
	timeStamp(){
		return new Date().toLocaleTimeString('en-US',{hour12:false});
	}
	
	//box characters
	//https://theasciicode.com.ar/extended-ascii-code/box-drawing-character-double-line-lower-right-corner-ascii-code-188.html
	boxMessage(message){
		let boxedMessage = "";
		
		let barFill = new Array(message.length).fill("═");
		
		//sets up the top row
		boxedMessage += `╔═${barFill}═╗`+"\n";
		
		//sets up the middle row
		boxedMessage += `║ ${message} ║`+"\n";

		//sets up the bottom row
		boxedMessage += `╚═${barFill}═╝`+"\n";

		return boxedMessage;
	}

	startMessageLog(){
		this.logLine(this.boxedMessage(`Started logging at: ${this.timeStamp}.`),false);
	}

	endMessageLog(){
		this.logLine(this.boxedMessage(`Ended logging at: ${this.timeStamp}.`),false);
	}

	logLine(logMessage,timeStamp=true){
		fs.appendFileSync(this.logPath,`${timeStamp?this.timeStamp():""}: ${logMessage}`+"\n");
	}

}