//runs when transcribe button is pressed
function transcribe() 
{ 
	//true when box is checked
	var save = document.getElementById('save').checked;
	if(save)
	{
		//send message for background.js to save the settings as yes
		chrome.runtime.sendMessage({message: "saveTrans"}, function(response) {
		console.log(response.farewell);
		});
	}
	//have background.js prepare to transcribe
	chrome.runtime.sendMessage({message: "doTrans"}, function(response) {
	console.log(response.farewell);
	});
	//uncomment to close window on press
	//window.open('','_parent',''); 
	//window.close();
} 
//runs when not transcribe button is pressed
function not_transcribe() 
{
	var save = document.getElementById('save').checked;
	if(save)
	{
		//send message for background.js to save settings as no
		chrome.runtime.sendMessage({message: "saveNoTrans"}, function(response) {
		console.log(response.farewell);
		});
	}
	//uncomment to close the window on press
	//window.open(",'_parent',");
	//window.close();
}

document.getElementById('transcribe').onclick = transcribe;
document.getElementById('not_transcribe').onclick = not_transcribe;