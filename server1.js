
var static = require('node-static');
var http =  require('http');
 
var fileServer = new static.Server('./public');

var server = http.createServer(handler);

function handler (request, response) {
    var url = request.url;
    request.addListener('end', function () {
    if(url.split("/")[1] == 'query'){
        if (url.split("/")[2] <= '989'){
            //here is where we should put the code if you get a query response.              
        }
    }
    else if(url.split("/")[1] !='testWHS.html'){  //this will happen if they write something other than testWHS.html
        response.writeHead(404, {"Content-type": "text/html"});
        response.write("<p> 404 Not Found. </p>");
        response.end();
    }
    	//print out on console
    console.log(request.url); //url property of the rquest object (string)

    fileServer.serve(request, response);
    }).resume();
}




/*var http =  require('http');
var static = require('node-static');
 
var fileServer = new static.Server('./public');

var server = http.createServer(handler);

function handler (request, response) {
    var url = request.url;
    
    if(url.split("/")[1] !='testWHS.html'){  //this will happen if they write something other than testWHS.html
        response.writeHead(404, {"Content-type": "text/html"});
        response.write("<p> 404 Not Found. </p>");
        response.end();
    }
    else{
        request.addListener('end', searchBook).resume();
    }

    function searchBook(request, response){
        fileServer.serve(request, response);
    }

}
    	//print out on console
    	//console.log(request.url); //url property of the rquest object (string)
*/
server.listen("58037");