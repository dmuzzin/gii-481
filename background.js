//alert("This page can runs in the backgrouna and could eventually be used for caching")
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'webpage_settings') {
        chrome.tabs.create({
            url: chrome.extension.getURL('popup.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
});