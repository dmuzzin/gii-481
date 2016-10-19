//Key for calls to Google Cloud Vision API
var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

//Call to Microsoft Computer Vision API to retrieve a description of the image to replace alt text
function microsoft_describe_image(img) {
    $(function() {
        var params = {
            // Request description of image
            "visualFeatures": "Description",
        };
      	
      	var replace = new Replacer();

        $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}"); //Don't have subscription key yet
            },
            type: "POST",
            // Request body
            data: "{'url': img.src}",
        })
        .done(function(data) {
            alert("success");
            replace.parseMicrosoftDescribe(img, data);
        })
        .fail(function() {
            alert("error");
        });
    });
}

//Call to Google Cloud Vision API to retrieve OCR of Text on Image
function google_ocr(img, event) {
	var reader = new FileReader();
  	reader.onloadend = processFile;
  	reader.readAsDataURL(img); //Need to include actual image data somehow
}

function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

function sendFileToCloudVision (content) {
  var type = $('#fileform [name=type]').val();

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

  $('#results').text('Loading...');
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);
}

/**
 * Displays the results.
 */
function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  $('#results').text(contents);
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}
