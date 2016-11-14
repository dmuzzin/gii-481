

		function transcribe() 
		{ 
			var save = document.getElementById('save').checked;
			console.log("var = " + save);
			if(save)
			{
				//attempt to run in background (not working?)
				chrome.runtime.sendMessage({type:'savetranscribe'});
			}
			window.open('','_parent',''); 
			window.close();
		} 
		function not_transcribe() 
		{
			var save = document.getElementById('save').checked;
			console.log("var = " + save);
			if(save)
			{
				//attempt to run in background.js (not working?)
				chrome.runtime.sendMessage({type:'savenot'});
			}
			window.open(",'_parent',");
			window.close();
		}
		document.getElementById('transcribe').onclick = transcribe;
		document.getElementById('not_transcribe').onclick = not_transcribe;