
$(function() {

              function saveToStorage(obj) {
       
                          chrome.storage.local.set(obj, function() {
                          // Notify that we saved.
                          //alert('Settings saved');
                          //console.log(obj);
              });
}


});
      

        

          //chrome.identity.onSignInChanged.addListener(function(account, signedIn){
              //if(signedIn)
              //{
                  //chrome.identity.getProfileUserInfo(function(userInfo){
                        ////alert(userInfo.id + ":" + userInfo.email);
                        //alert(userInfo.email);
                         //userInfo.email;
//                        
                  //});
              //}
//
             //});

         
