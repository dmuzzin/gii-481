//alert("This page can runs in the backgrouna and could eventually be used for caching")
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'webpage_settings') {
        chrome.tabs.create({
            url: chrome.extension.getURL('popup.html'),
            active: false
        }, function(tab) {
            // inject the new tab into window
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
				height: 150,
				width:250
                // other settings
            });
        });
    }
});

