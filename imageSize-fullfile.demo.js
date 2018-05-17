var url = require('url');
var http = require('http');
var sizeOf = require('image-size');
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var dbFileName = "PhotoQ.db";
var db = new sqlite3.Database(dbFileName);

// prevent denial-of-service attacks against the TA's lab machine!
http.globalAgent.maxSockets = 1;

function getImageDims( index, name, callback ) {

    //console.log("Original name is: "+ name);
    /* encodeURIComponent escapes characters that are in the filename but invalid in a URL */
    //var nameFixed = encodeURIComponent(name);
    //console.log("Name set to: "+ nameFixed);
    var imgUrl = 'http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/' + name;
    var options = url.parse(name); //CHANGED FROM imgUrl

    http.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function() {
            var buffer = Buffer.concat(chunks);

            console.log(sizeOf(buffer));

            // once we have the data we need, call the callback to continue the work...
            callback(index, name, sizeOf(buffer));
        });
    });

}

var imglist = JSON.parse(fs.readFileSync("6whs.json")).photoURLs;
var cmdStr = 'INSERT INTO photoTags VALUES ( _IDX, "_FILENAME", _WIDTH, _HEIGHT , "",  "")';
var cbCount = 0;
var cbGoal = imglist.length;

// Always use the callback for database operations and print out any error messages you get.
function insertDataCallback(err) {
    if (err) {
        console.log("Error while saving data in DB: ",err);
    }

    cbCount += 1;
    if (cbCount == cbGoal) db.close()
}

function saveImageDims( index, name, dims ) {

    //console.log("SUPRISE WE'RE IN THE CALLBACK");

    var cmd = cmdStr.replace("_IDX", index)
    cmd = cmd.replace("_FILENAME", name)
    cmd = cmd.replace("_WIDTH", dims.width)
    cmd = cmd.replace("_HEIGHT", dims.height)

    console.log("        item ", index, " complete!");
    //console.log("Dimensions are width: ", dims.width, " height: ", dims.height);

    db.run(cmd,insertDataCallback);
}

for (var i = 0; i < imglist.length; i++) {
    console.log("Enqueuing item ", i, "   ", imglist[i]);
    //var imgName = imglist[i].substring(51);
    getImageDims( i, imglist[i], saveImageDims );
}

console.log("End of script file...");
