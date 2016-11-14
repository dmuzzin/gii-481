//alert("This page can runs in the backgrouna and could eventually be used for caching")
chrome.runtime.onMessage.addListener(function(request) {
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
    }    
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "saveTrans")
	{
		//do something to save settings as always transcribe
		chrome.storage.sync.set({ "transcribe": "pleaseDo" }, function(){});	
		sendResponse({farewell: "saving as always transcribe"});
	}
	if(request.message == "saveNoTrans")
	{
		//do something to save settings as never transcribe
		chrome.storage.sync.set({ "transcribe": "pleaseNo" }, function(){});
		sendResponse({farewell: "saving as never transcribe"});
	}
	if(request.message == "doTrans")
	{
		//do the transcription for the website
		chrome.runtime.sendMessage({type:'image_ident'});
		sendResponse({farewell: "do the transcription"});
	}
  });
