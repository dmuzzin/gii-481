var images = document.getElementsByTagName('img');
for(i = 0; i < images.length; ++i){
    if(images[i].attr('alt')){
	//Image contains alt-text.  We probably don't want to do anything
    }else{
	console.log("Page contains image: " + images[i].attr("src") + " that doesn't have alt-text")
    }
}
