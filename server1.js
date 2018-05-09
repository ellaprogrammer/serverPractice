/*
http://server162.site:54022/query?num=200
http://server162.site:54022/testWHS.html
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
    		console.log(imgList[numID]);
    		if (numID > "989"){ //this doesn't work yet
    			response.writeHead(404, {"Content-type": "text/html"});
		        response.write("<p> 404 Picture ID out of range. </p>");
		        response.end();
    		}
    		else {
    			response.writeHead(200, {"Content-Type": "text/html"});
	    		response.write("<h1>"+imgList[numID]+"</h1>");
	    		response.end();
    		}
    	} 

    	//FIXME: check for incorrect url:
    	else if(url.split("/")[1] !='testWHS.html'){  //this will happen if they write something other than testWHS.html
	        response.writeHead(404, {"Content-type": "text/html"});
	        response.write("<p> 404 Not Found. </p>");
	        response.end();
	    }

    	//else, load testWHS.html 
    	else{
    		fileServer.serve(request, response);
    	}
    	//fileServer.serveFile('/error.html', 500, {}, request, response); ?
    	//console.log(request.url); //url property of the rquest object (string)
        fileServer.serve(request, response);
    }).resume();
}

server.listen(54022); //CHANGE TO YOUR PORT NUMBER
