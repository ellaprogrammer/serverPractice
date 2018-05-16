/*
http://server162.site:54022/query?num=200
http://server162.site:54022/testWHS2.html
*/


/*---------------READ IN THE JSON FILE-----------------*/
// global variables
var fs = require('fs');  // file access module

var imgList = [];

// code run on startup
loadImageList();

// just for testing, you can cut this out
//console.log(imgList[354]);


function loadImageList () {
    var data = fs.readFileSync('photoList.json');
    if (! data) {
	    console.log("cannot read photoList.json");
    } else {
	    listObj = JSON.parse(data);
	    imgList = listObj.photoURLs;
    }
}
/*---------------READ IN THE JSON FILE-----------------*/

var static = require('node-static');
var http =  require('http');
 
var fileServer = new static.Server('./public');

var server = http.createServer(handler);


function handler (request, response) {
    request.addListener('end', function () {
    	var url = request.url; //get the url

    	//FIXME: if there is a query and a random string, behave like miniserver:

    	//if there is a query & FIXME a number in the url, print the name of the photo that corresponds to the photo id:
    	var queryB = url.split("/")[1];
    	console.log(queryB);

    	if (queryB.split("?")[0] == "query"){
    		var numID = queryB.split("num=")[1];
    		console.log(numID); //this works
    		//console.log(imgList[numID]);
           // console.log(numID.isInteger);
    		if (numID > 988 || numID % 1 != 0){ //need to add if it's not a number
                 console.log("bad query");
    		     response.writeHead(400, {"Content-type": "text/html"});
		         response.write("<div> 400 Not Found. </div>");
		         response.end();
                 
    		 } else {
    			response.writeHead(200, {"Content-Type": "text/html"});
	    		response.write(imgList[numID]);
	    		response.end();
    		}
    	} 

    	else{
    		fileServer.serve(request, response, function (e, res){
                if (e){
                    fileServer.serveFile('/error.html', 404, {}, request, response);
                }
            });
    	}
    	//fileServer.serveFile('/error.html', 500, {}, request, response); ?
    	//console.log(request.url); //url property of the rquest object (string)
        
    }).resume();
}

server.listen("52924");