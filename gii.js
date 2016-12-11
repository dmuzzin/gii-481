var server = 'https://valleyofsmoke.getat.us:2000/';

var sendToServer = function(img) {
	$.ajax({
		type: 'POST',
        crossDomain : true,
    	url: server,
    	data: JSON.stringify({'url': img.src,'secret': server_secret}),
    	contentType: 'application/json',
    	success: function (data) {
    		img.alt += "This image is described as: " + data['description'] + ". ";
    		img.alt += "This image contains the text: " + data['text'] + ".";
        },
        error: function (e) {
            console.log(e);
        }
  	});

}