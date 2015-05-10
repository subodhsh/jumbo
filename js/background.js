

      

         //Data-Sync logic

         chrome.storage.onChanged.addListener(function(changes, areaname) {
              if(areaname=="sync")
              {
                alert('Storage Changed' + changes);

                  //for (key in changes) {
                   // var storageChange = changes[key];
                    //alert(key);
                    //console.log('Storage key "%s" in namespace "%s" changed. ' +
                                //'Old value was "%s", new value is "%s".',
                                //key,
                                //namespace,
                                //storageChange.oldValue,
                                //storageChange.newValue);
                  //}
              }
              //populateBookmarkList();
            });

          chrome.identity.onSignInChanged.addListener(function(account, signedIn){
              if(signedIn)
              {
                  chrome.identity.getProfileUserInfo(function(userInfo){
                        //alert(userInfo.id + ":" + userInfo.email);
                        alert(userInfo.email);
                         userInfo.email;
                        
                  });
              }

             });

         
