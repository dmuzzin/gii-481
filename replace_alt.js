
function sleep (seconds) {
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
}

function Replacer() {

    this.parseMicrosoftOCR = function(img, transcription) {
	//Do stuff
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
		img.alt = text;
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

    //Google's OCR seems to be A LOT better
    this.parseGoogleOCR = function(img, transcription) {
	//Do stuff
    }


    function processFile (event) {
	var content = event.target.result;
	sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
    }

    function sendFileToCloudVision (content) {
	var type = file.name.substring(file.name.lastIndexOf('.'));

	// Strip out the file prefix when you convert to json.
	var request = {
	    requests: [{
		image: {
		    content: content
		},
		features: [{
		    type: type,
		    maxResults: 200
		}]
	    }]
	};

	var replace = new Replacer();

	$('#results').text('Loading...');
	$.post({
	    url: CV_URL,
	    data: JSON.stringify(request),
	    contentType: 'application/json'
	}).fail(function (jqXHR, textStatus, errorThrown) {
	    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
	}).done(replace.parseGoogleOCR(img, data));
    }

    
}

