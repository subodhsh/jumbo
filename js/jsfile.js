function saveToStorage(key,val) {
        // Get a value saved in a form.
        //var theValue = "Subodh Shetty"
        // Check that there's some code there.

        if (!key) {
          message('Error: No key specified');
          return;
        }

        if (!val) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({key: val}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
}


function message(msg){
alert(msg);

}

function getFromStorage(key){
	if (!key) {
          message('Error: No key specified');
          return;
        }

        //chrome.storage.sync.get(key,function(object items){
        	//message(items);
       // })
}

 $(function () {
            $("#txtsrch").WaterMark();
        });



