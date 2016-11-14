//alert("This page can runs in the backgrouna and could eventually be used for caching")
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'webpage_settings') {
		confirm("yellow");
        chrome.tabs.create({
            url: chrome.extension.getURL('popup.html'),
            active: false
        }, function(tab) {
            // inject the new tab into window
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
				height: 100,
				width:237
                // other settings
            });
        });
    }    
	//These are supposed to come from the popup.js
	if (request.type === 'savetranscribe') {
		comfirm("orange");
		localStorage["setting"] = true;
    }
	if (request.type === 'savenot') {
		localStorage["setting"] = false;
    }
});

