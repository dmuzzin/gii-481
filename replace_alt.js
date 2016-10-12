function prototypeReplacement(img) {
	img.setAttribute("alt", "This is alternative text for an image");
}

function parseMicrosoftOCR(img, transcription) {
	var response = JSON.parse(transcription);
	var regions = response.regions;
	var transcribed = "";
	for(var i in regions) {
		lines = regions[i].lines;
		for(var j in lines) {
			words = lines[j].words;
			for(var k in words) {
				transcribed = transcribed.concat(" " + k.text);
			}
		}
	}
	transcribed = transcribed.substring(1, transcribed.length - 1);
	img.setAttribute("alt", transcribed);
	return;
}

function parseMicrosoftDescribe(img, description) {
	var response = JSON.parse(description);
	var caption = response.captions[0].text;
	img.setAttribute("alt", caption);
}

function parseGoogleOCR(img, transcription) {

}

function parseGoogleDescribe(img, description) {
	
}