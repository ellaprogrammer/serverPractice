// For or each filename in the list, adds a row to the database, with a unique ID number, the filename, 
//the width, the height, and two empty strings for the landmark and tags fields

var http = require('http');
var fs = require('fs');
var sizeOf = require('image-size');
var sqlite3 = require("sqlite3").verbose();
var url = require('url');

var dbFileName = "PhotoQ.db";
var db = new sqlite3.Database(dbFileName);
http.globalAgent.maxSockets = 1;
var cmdStr = ' INSERT OR REPLACE INTO photoTags VALUES ( _IND, "_FILENAME", _WIDTH, _HEIGHT , "", "") ';
var cbCount = 0;
//fixed_url = encodeURIComponent(url); //run on full URL before make query

function loadImgList () {
    var data = fs.readFileSync('6whs.json');
    if (! data) {
	    console.log("cannot read 6whs.json");
    } else {
	    listObj = JSON.parse(data);
	    urlList = listObj.photoURLs;
	    return urlList;
    }
}

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

function saveImgDims(){



}

function createImgList(){
	var tempArr = [];
	var urlList = loadImgList();

	//add row to the database, with unique ID number, filename, 
	//width, height, and two empty strings for the landmark and tags fields
	for(let i=0; i < urlList.length;i++){

		var fixed_url = encodeURIComponent(urlList[i]);
		var cbGoal = urlList.length;

		console.log("Enqueing item "+ i + urlList[i]);
		//getImageDims(i,imgList[i],saveImgDims);

		console.log(cbGoal);

		/*db.run(cmdStr);

		getSize(i,fixed_url, function(i=i,fixed_url,) {
			db.run('UPDATE photoTags SET tags = "," WHERE idNum = '+ i, updateCallback);
			function updateCallback(err){
				if(err) console.log("update error!",err);
				else{
					db.get('SELECT tags FROM photoTags WHERE idNum = '+i ,dataCallback);
				}
			}
		}*/


	}
}

createImgList();

/*
var url = require('url');
var http = require('http');
 
var sizeOf = require('image-size');
 
var imgUrl = 'http://my-amazing-website.com/image.jpeg';
var options = url.parse(imgUrl);
 
http.get(options, function (response) {
  var chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    var buffer = Buffer.concat(chunks);
    console.log(sizeOf(buffer));
  });
});*/