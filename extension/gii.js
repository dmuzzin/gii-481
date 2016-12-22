var server = 'https://valleyofsmoke.getat.us:2000/';

var sendToServer = function(img, hasAlt) {
	$.ajax({
		type: 'POST',
        crossDomain : true,
    	url: server,
    	data: JSON.stringify({'url': img.src,'secret': server_secret}),
    	contentType: 'application/json',
    	success: function (data) {
    		img.alt += "GII has provided the following description: ";
    		img.alt += data['description'];
    		img.alt += data['text'];
        },
        error: function (e) {
            console.log(e);
        }
  	});

}