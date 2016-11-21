var images = document.getElementsByTagName("img");
var unnamed_count = 0;
for(i = 0; i < images.length; ++i){
    if(!images[i].getAttribute("alt")){
	//Image has no alt-text
	images[i].tabIndex = 0;
	//Add generic alt attribute so screen reader doesn't skip image
	images[i].alt = "No alternate text provided";
	unnamed_count = unnamed_count + 1;
    }
}

/*
//old testing code
//If the page contains images without an alt-text, ask the user if we should transcribe them
if(unnamed_count != 0){

	//replace "dingydooo" with the setting to be saved
	localStorage.setItem(document.domain,"dingydooo");
	console.log(localStorage.getItem(document.domain));
	
	
	//create popup window in background
	chrome.runtime.sendMessage({type: 'webpage_settings'}, function(response) {
		console.log(response.farewell); //prints backgrounds response 
	});
	if(localStorage.getItem('key') == 'yes') {
		console.log("we're good");
	}
	
	/*
	var obj;
	chrome.storage.sync.get('key', function (obj) {
    console.log('myKey', obj.key);
    });
	*/
	
/*
    if(confirm("This page has " + unnamed_count + " images that your screen reader cannot read.  Would you like to try to transcribe them?")){
	//Add generic alt attribute to these images for Alpha release
	var replace = new Replacer();
	for(i = 0; i < images.length; ++i){
	    if(!images[i].getAttribute("alt")){
		//Image has no alt-text.  Send it to be transcribed
		replace.parseMicrosoftDescribe(images[i], 0);
		replace.parseMicrosoftOCR(images[i], 0);
	    }
	}
    }
}*/
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
				var replace = new Replacer();
				replace.parseMicrosoftDescribe(this, 0);
				replace.toDataUrl(this, 'OCR');
				this.blur();
			}
			this.blur();
		}
	})
}