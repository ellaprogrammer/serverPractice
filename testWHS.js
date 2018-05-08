// Global; will be replaced by a call to the server! 
var photoURLArray = 
[
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/A%20Torre%20Manuelina.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg" },
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Sejong tomb 1.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Serra%20da%20Capivara%20-%20Painting%207.JPG"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Royal%20Palace%2c%20Rabat.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Red%20pencil%20urchin%20-%20Papahnaumokukea.jpg"}
 ];


// Called when the user pushes the "submit" button 
// FIXME: add in the request for a specific number 
function photoByNumber() {

	var num = document.getElementById("num").value;
	num = num.trim();
	var photoNum = Number(num);
	if (photoNum != NaN) {
		var photoURL = photoURLArray[photoNum].url;
		var display = document.getElementById("photoImg");
		display.src = photoURL;
	    }


	var oReq = new XMLHttpRequest(); // sending an AJAX request requires an object, so this makes an AJAX request object
	var url = "query?num="+num; //
	oReq.open("GET", url); // tell the server it's going to be a get request, and tell the AJAX request object to "open".
	// when you define a URL for an AJAX request, you don't give it the whole thing because it knows where the page was downloaded
	// from (the server site) and it knows the response will go back to that site.
	oReq.addEventListener("load", reqListener); // this sets up a callback function -- on the load event (when it loads), call reqListener 
	// which is the callback function
	oReq.send(); //end the call
}

function reqListener(){
	var photoURL = this.responseText; // method of the oReq so "this" is oReq
	var display = document.getElementById("photoImg");
	display.src = photoURL;
}



