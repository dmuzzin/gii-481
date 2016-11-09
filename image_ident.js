var images = document.getElementsByTagName("img");
var unnamed_count = 0;
for(i = 0; i < images.length; ++i){
    if(!images[i].getAttribute("alt")){
	//Image has no alt-text
	unnamed_count = unnamed_count + 1;
    }
}

//If the page contains images without an alt-text, ask the user if we should transcribe them
if(unnamed_count != 0){
	chrome.runtime.sendMessage({type:'webpage_settings'});
	/*
    if(confirm("This page has " + unnamed_count + " images that your screen reader cannot read.  Would you like to try to transcribe them?")){
	//Add generic alt attribute to these images for Alpha release
	var replace = new Replacer();
	for(i = 0; i < images.length; ++i){
	    if(!images[i].getAttribute("alt")){
		//Image has no alt-text.  Send it to be transcribed
		replace.parseMicrosoftDescribe(images[i], 0);
	    }
	}	
    }*/
}

