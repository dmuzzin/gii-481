//alert("This page can runs in the backgrouna and could eventually be used for caching")
chrome.runtime.onMessage.addListener(function(request, sender, sendBack) {
	//generate the html popup
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
				height: 100,
				width:237
            });
        });
	
		//listen for the popup button press respons
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		if (request.message == "saveTrans")
		{
			//do something to save settings as always transcribe
			//chrome.storage.sync.set({ key: "save as transcribe" });
			sendResponse({farewell: "saving as always transcribe"});
		}
		if(request.message == "saveNoTrans")
		{
			//do something to save settings as never transcribe
			//chrome.storage.sync.set({ key: "save do not transcribe" });
			sendResponse({farewell: "saving as never transcribe"});
		}
		if(request.message == "doTrans")
		{
			//do the transcription for the website
			//chrome.storage.sync.set({ key: "do transcribe"})
			sendResponse({farewell: "do the transcription"});
		}
		if(request.message == "noTrans")
		{
			//do nothing
			//chrome.storage.sync.set({ key: "do not transcribe"})
			sendResponse({farewell: "do not transcribe"});
		}
		});
		//this sends a response back to image_ident
		//the idea was that it send back what image_ident should do
		sendBack({farewell: "pooper scooper"});
    }    
});