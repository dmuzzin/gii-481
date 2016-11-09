		function transcribe() 
		{ 
			window.open('','_parent',''); 
			window.close();
		} 
		function not_transcribe() 
		{
			window.open(",'_parent',");
			window.close();
		}
		document.getElementById('transcribe').onclick = transcribe;
		document.getElementById('not_transcribe').onclick = not_transcribe;