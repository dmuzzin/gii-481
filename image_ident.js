var images = document.getElementsByTagName('img');
for(i = 0; i < images.length; ++i){
    if(images[i].getAttribute('alt')){
	//Image contains alt-text.  We probably don't want to do anything
    }else{
	console.log("Page contains image: " + images[i].getAttribute("src") + " that doesn't have alt-text")
	//Now do something with the image
    }
}
