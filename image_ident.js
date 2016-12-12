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
				sendToServer(images[i]);
			}
		}
		if(confirm("Would you like to save this setting? Note that you can clear saved settings for a webpage add any time by pressing control plus shift plus Y or with command plus shift plus Y on mac.")) { //save settings if confirmed to
			localStorage.setItem(document.domain, "transcribe");
		}
	} else {
		var images = document.getElementsByTagName("img");
		for(i = 0; i < images.length; ++i){
			images[i].tabIndex = 0;
		}
		if(confirm("Would you like to save this setting? Note that you can clear saved settings for a webpage add any time by pressing control plus shift plus Y or with command plus shift plus Y on mac.")) { //save settings if confirmed to
			localStorage.setItem(document.domain, "not transcribe");
		}
	}

	$('img').focus(function () {
		if(this.alt == "" || !this.alt) {
			//Hacky way to prevent confirm message from firing twice
			this.alt = " ";
			if(confirm("This is an image that your screen reader cannot read.  Would you like to try to transcribe it?")){
				sendToServer(this);
			}
			this.blur();
		}
		//What if the user wants to get a better description than the one the website provides
		else if(this.alt && this.alt != "" && this.alt != " " && this.alt.substring(this.alt.length - 1, this.alt.length) != " ") {
			this.alt += " ";
			if(!this.alt.includes("GII has provided the following description:")) {
				if(confirm("This image contains alternate text but would you like to try to get a better description?")) {
					sendToServer(this);
				}
			}
			this.blur();
		}
	})
}