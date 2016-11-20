var images = document.getElementsByTagName("img");
var unnamed_count = 0;
for(i = 0; i < images.length; ++i){
    if(!images[i].getAttribute("alt")){
	//Image has no alt-text
	images[i].tabIndex = 0;
	unnamed_count = unnamed_count + 1;
    }
}

//If the page contains images without an alt-text, ask the user if we should transcribe them
if(unnamed_count != 0){
	//atempt to load settings
	chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
		console.log(message.text);
	});
	
	//test function
	localStorage.setItem(document.domain,"dingydooo");
	console.log(localStorage.getItem(document.domain));
	
	
	//create popup window in background
	chrome.runtime.sendMessage({type:'webpage_settings'});
	
	//read a key that was saved in background.js to determine something
	var settings; 
	var setit="nothing";
	chrome.storage.sync.get('key', function(settings) { 
		setit = settings.key;
	});

	console.log("items = " + setit); 
	
	//chrome.storage.sync.set({ key: "nothing"})
	
	//transcribe based on setting (not working)
	/*
	if(transcribe)
	{
		console.log("transcribe");
	}
	else
	{
		console.log("not transcribe");		
	}*/
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
    }*/
}
/*
$('img').focus(function () {
	if(confirm("This is an image that your screen reader cannot read.  Would you like to try to transcribe it?")){
		var replace = new Replacer();
		replace.toDataUrl(this, "LABEL");
	}
	this.blur();
})
*/