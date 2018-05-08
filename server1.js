var static = require('node-static');
var http =  require('http');
 
var fileServer = new static.Server('./public');

var server = http.createServer(handler);

function handler (request, response) {
    request.addListener('end', function () {
    	//check to see if there is query in the URL
    	//if so call a new function

    	//print out on console
    	console.log(request.url); //url property of the rquest object (string)
        fileServer.serve(request, response);
    }).resume();
}

server.listen(54022);