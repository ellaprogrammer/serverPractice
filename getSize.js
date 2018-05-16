// Get size of one image, then call cbFun
function getSize(ind, name, cbFun) {
    var imgURL = imgServerURL+name;
    var options = url.parse(imgURL);

    // call http get 
    http.get(options, function (response) {
	var chunks = [];
	response.on('data', function (chunk) {
	    chunks.push(chunk);
	}).on('end', function() {
	    var buffer = Buffer.concat(chunks);
	    dimensions = sizeOf(buffer);
	    cbFun(ind, name, dimensions.width, dimensions.height);
	})
    })
}
