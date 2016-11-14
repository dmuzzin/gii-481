 var port = chrome.extension.connect({
      name: "Sample Communication"
 });

function transcribe() 
{ 
	var save = document.getElementById('save').checked;
	console.log("var = " + save);
	if(save)
	{
		port.postMessage("savetrans");
	}
	//window.open('','_parent',''); 
	//window.close();
} 
function not_transcribe() 
{
	var save = document.getElementById('save').checked;
	console.log("var = " + save);
	if(save)
	{
		port.postMessage("savenot");
	}
	//window.open(",'_parent',");
	//window.close();
}

document.getElementById('transcribe').onclick = transcribe;
document.getElementById('not_transcribe').onclick = not_transcribe;