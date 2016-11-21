                                                                                                                                                                                        
function sleep (seconds) {
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
}

function Replacer() {

    this.parseMicrosoftOCR = function(img, recurse_count) {

	var _this = this;

	if(recurse_count >= 2){
	    console.log("Couldn't transcribe image.  Too many failures");
	    return;
	}

        var params = {
            // Request parameters
            "language": "unk",
            "detectOrientation ": "true",
        };

	var dta = {
	    url: img.src,
	}

        var s = $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/ocr?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", mskey);
            },
            type: "POST",
            // Request body
            data: JSON.stringify(dta),
        })
            .done(function(data) {
		var txt = "";
		for(var reg = 0; reg < data.regions.length; ++reg){
		    for(var line = 0; line < data.regions[reg].lines.length; ++line){
			for(var word = 0; word < data.regions[reg].lines[line].words.length; ++word){
			    txt = txt + " " + data.regions[reg].lines[line].words[word].text;
			}
		    }
		}
		console.log(txt);
		console.log("Success after " + recurse_count + " retries");
		if(txt.length != 0){
		    //img.alt = img.alt + " Image contains the text: " + txt;
            return txt;
		}
            })
            .fail(function(data) {
		if(data.status == 429){
		    //Timeout error.  Try again
		    console.log("Rate limit error.  Retrying.");
		    setTimeout( _this.parseMicrosoftDescribe(img, recurse_count + 1), 5000);
		    console.log("End sleep");
		}else{
		    console.log(data);
		}
            });

    }

    //Microsoft's image description seemes to be A LOT better
    this.parseMicrosoftDescribe = function(img, recurse_count) {

	var _this = this;

	if(recurse_count >= 2){
	    console.log("Couldn't transcribe image.  Too many failures");
	    return;
	}

        var params = {
            // Request parameters
            "maxCandidates": "1",
        };

	var dta = {
	    url: img.src,
	}

        var s = $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/describe?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", mskey);
            },
            type: "POST",
            // Request body
            data: JSON.stringify(dta),
        })
            .done(function(data) {
		var text =  data.description.captions[0].text;
		console.log(text);
		console.log("Success after " + recurse_count + " retries");
		img.alt += "This image is described as: " + text + ". ";
        return text;
            })
            .fail(function(data) {
		if(data.status == 429){
		    //Timeout error.  Try again
		    console.log("Rate limit error.  Retrying.");
		    setTimeout( _this.parseMicrosoftDescribe(img, recurse_count + 1), 5000);
		    console.log("End sleep");
		}else{
		    console.log(data);
		}
            });
    }

	this.toDataUrl = function(img, type) {
  		var xhr = new XMLHttpRequest();
  		xhr.responseType = 'blob';
  		xhr.onload = function() {
    		var reader = new FileReader();
    		reader.onloadend = function() {
    			var content = reader.result.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, "");
    			if(type == "OCR") {
    				sendToGoogleOCR(img, content);
    			} else {
    				sendToGoogleLabel(img, content)
    			}
    		}
    		reader.readAsDataURL(xhr.response);
  		};
  		xhr.open('GET', img.src);
  		xhr.send();
	}

    function sendToGoogleLabel(img, encoded) {
    	var content = encoded;
    	var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + gcvkey;
    	var request = {
	    	requests: [{
				image: {
		    		content: content
				},
				features: [{
		    		type: "LABEL_DETECTION",
		    		maxResults: 200
				}]
	    	}]
		};
		$.ajax({
			type: 'POST',
            crossDomain : true,
    		url: CV_URL,
    		data: JSON.stringify(request),
    		contentType: 'application/json',
    		success: function (data) {
    			var altText = data['responses'][0]['labelAnnotations'][0]['description'];
    			console.log(altText);
                displayJSON(data);
                return altText;
            },
            error: function (e) {
                console.log(e);
            }
  		});

    }

    function sendToGoogleOCR(img, encoded) {
    	var content = encoded;
    	var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + gcvkey;
    	var request = {
	    	requests: [{
				image: {
		    		content: content
				},
				features: [{
		    		type: "TEXT_DETECTION",
		    		maxResults: 200
				}]
	    	}]
		};
		$.ajax({
			type: 'POST',
            crossDomain : true,
    		url: CV_URL,
    		data: JSON.stringify(request),
    		contentType: 'application/json',
    		success: function (data) {
    			var altText = data['responses'][0]['textAnnotations'][0]['description'];
    			altText = altText.replace(/(\r\n|\n|\r)/gm, ' ');
    			console.log(altText);
                displayJSON(data);
                img.alt += "This image contains the text: " + altText + ". "
            },
            error: function (e) {
                console.log(e);
            }
  		});
    }

    function displayJSON (data) {
  		var contents = JSON.stringify(data, null, 4);
  		console.log(contents);
	}
}
