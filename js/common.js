/* Globals */

  var arrGlobal=[];
  var arrGlobalKnownHosts=["gmail","mail.google","twitter","google"];
  var strGlobalFavPath = "/img/fav/";
  var strGlobalFavExt = ".png";
  var strGlobalUnknownImg = "unknown";

/* Global Ends */


  function arraymove(arr,fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
   
}

  // Save logic
function saveToStorage(obj) {
       
        chrome.storage.local.set(obj, function() {
          // Notify that we saved.
          //alert('Settings saved');
          //console.log(obj);
        });
}
