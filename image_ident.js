var images = document.getElementsByTagName("img");
var unnamed_count = 0;
for(i = 0; i < images.length; ++i){
    if(!images[i].getAttribute("alt")){
		unnamed_count = unnamed_count + 1;
    }
}

//listens for when a hotkey is pressed and the background handles it
chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.action && (msg.action == "clearSettings")) {
		console.log("clearing local storage");
        localStorage.clear();
    }
});
if(unnamed_count !=0) {
	//localStorage.clear();
	var settings = localStorage.getItem(document.domain); //load settings if available (null if not saved)
	console.log("settings loaded = " + settings)
	if(settings == "transcribe") { //transcribe because it was saved to do so
		var images = document.getElementsByTagName("img");
		for(i = 0; i < images.length; ++i){
			if(!images[i].getAttribute("alt")){
				var replace = new Replacer();
				replace.parseMicrosoftDescribe(images[i], 0);
				replace.toDataUrl(images[i], 'OCR');
			}
		}
	}
	else if(settings == "not transcribe") {
		var images = document.getElementsByTagName("img");
		for(i = 0; i < images.length; ++i){
			if(!images[i].getAttribute("alt")){
				//Image has no alt-text
				images[i].tabIndex = 0;
			}
		}
	}
	else if(confirm("This page has " + unnamed_count + " images that your screen reader cannot read. Would you like them all transcribed now? If not you can transcribe each image individually")) {
		var images = document.getElementsByTagName("img");
		for(i = 0; i < images.length; ++i){
			if(!images[i].getAttribute("alt")){
				var replace = new Replacer();
				replace.parseMicrosoftDescribe(images[i], 0);
				replace.toDataUrl(images[i], 'OCR');
			}
		}
		if(confirm("Would you like to save this setting?")) { //save settings if confirmed to
			localStorage.setItem(document.domain, "transcribe");
		}
	} else {
		var images = document.getElementsByTagName("img");
		for(i = 0; i < images.length; ++i){
			if(!images[i].getAttribute("alt")){
				//Image has no alt-text
				images[i].tabIndex = 0;
			}
		}
		if(confirm("Would you like to save this setting?")) { //save settings if confirmed to
			localStorage.setItem(document.domain, "not transcribe");
		}
	}

	$('img').focus(function () {
		if(this.alt == "" || !this.alt) {
			//Hacky way to prevent confirm message from firing twice
			this.alt = " ";
			if(confirm("This is an image that your screen reader cannot read.  Would you like to try to transcribe it?")){
				sendToServer(this, false);
			}
			this.blur();
		}
		//What if the user wants to get a better description than the one the website provides
		else if(this.alt && this.alt != "" && this.alt.substring(0, 27) != "This image is described as:") {
			if(confirm("This image contains alternate text but would you like to try to get a better description?")) {
				sendToServer(this, true);
			}
			this.blur();
		}
	})
}