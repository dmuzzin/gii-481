function Replacer() {
	this.prototypeReplacement = function(img) {
		img.alt = "This is alternative text for an image";
	}

	this.parseMicrosoftOCR = function(img, transcription) {
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
		img.setAttribute('alt', transcribed);
	}

	//Microsoft's image description seemes to be A LOT better
	this.parseMicrosoftDescribe = function(img, description) {
		var response = JSON.parse(description);
		var caption = response.captions[0].text;
		img.setAttribute('alt', caption);
	}

	//Google's OCR seems to be A LOT better
	this.parseGoogleOCR = function(img, transcription) {
		var response = JSON.parse(transcription);
		text = response.textAnnotations;
		transcribed = text[0].description;
		//Remove new line from description text
		transcribed = transcribed.replace(/\n/g, ' ');
		//Remove backslash from description test
		transcribed = transcribed.replace(/\\/g, '');
		img.setAttribute('alt', transcribed);
	}

	this.parseGoogleDescribe = function(img, description) {
		var response = JSON.parse(description);
		labels_returned = response.labelAnnotations;
		labels = '';
		for(i in labels_returned) {
			//Setting arbitrary threshold on whether it is good or not
			if(labels[i].score > 60) {
				labels = labels.concat(labels_returned[i].description + ', ');
			}
		}
		labels = labels.substring(0, labels.length - 2);
		img.setAttribute('alt', labels);
	}
}