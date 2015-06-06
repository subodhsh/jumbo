$(function() {


function getThumbnail(favurl,url){

        url = url.toLowerCase();
        var host = url.replace('http://','').replace('https://','').replace('www.','');
        var split = host.split('.');

        if(split.length > 0)
        {
           var temphost = split[0];
           var  tempsubhost = split[0] +'.' + split[1];
           
           if(arrGlobalKnownHosts.indexOf(temphost) > 0)
           {
            
              return strGlobalFavPath + temphost + strGlobalFavExt;
           }
           else if(arrGlobalKnownHosts.indexOf(tempsubhost) > 0)
           {
              
            return strGlobalFavPath + tempsubhost + strGlobalFavExt;
           }
           else
           {

              if(favurl != undefined)
              {
                return favurl;
              }
              else
                return strGlobalFavPath + strGlobalUnknownImg + strGlobalFavExt;
           }
        }

 
}




function populate(doeffect){
                    $("#container").empty();
                     chrome.storage.sync.get("1", function(items) {
                                                                  
                                                                    if(typeof(items) != "undefined"){

                                                                      if(Object.keys(items).length > 0) {

                                                                        arr = items["1"];

                                                                        if(arr)
                                                                        {

                                                                          if(arr.length > 0)
                                                                          {
                                                                            
                                                                            var url;
                                                                            var title;
                                                                            var img;
                                                                           

                                                                              $.each(arr,function(i, item)
                                                                              {
                                                                                

                                                                                  $.each(item,function(key, element)
                                                                                  {
                                                                                        if(key == 'url'){
                                                                                          url = element;
                                                                                        }
                                                                                        if(key == 'title'){
                                                                                          title = element;
                                                                                        }
                                                                                        if(key == 'img'){
                                                                                          img = element;
                                                                                         
                                                                                        }
                                                                                       
                                                                                         
      
                                                                                  });
 
                                                                                                 
                                                                                                 $("#container").prepend('<div class="box" title="' + title + '" data-url="' + url + '" data-img="' + img + '" draggable="true">\
                                                                                              <div class="content"><img src="' +img+ '"></div>\
                                                                                              <div class="base">' + title.substring(0,14) + '</div>\
                                                                                              <div class="overlay"><p class="x"><span>[ X ]</span></p>\
                                                                                              <button class="blue-butt">Open</button>\
                                                                                              </div>\
                                                                                              </div>');

                                                                                            if(doeffect == true)
                                                                                           {
                                                                                            
                                                                                              if(i == arr.length -1)
                                                                                              {
                                                                                               $("#container .box").first().css({"background-color":"#5cb85c"}).fadeOut().fadeIn(1000).fadeOut(1000,function(){
                                                                                                 $(this).css({"background-color":""});
                                                                                               }).fadeIn(1000);
                                                                                              }
                                                                                            
                                                                                           }
                                                                                           else
                                                                                           {}
                                                                                    
                                                                                    
                                                                                    arrGlobal.push(item) ;
                                                                               
                                                                              });
                                                                          }
                                                                          else // nothing in the list
                                                                          {
                                                                              $("#container").empty();
                                                                              $("#container").append('<div class="empty"><img src="/img/face.png" width="75" height="75"/><p class="msgP">List Empty!</p></div>');
                                                                          }


                                                                        }
                                                                        

                                                                      }
                                                                      else  // nothing in the list
                                                                      {
                                                                        $("#container").empty();
                                                                        $("#container").append('<div class="empty"><img src="/img/face.png" width="75" height="75"/><p class="msgP">List Empty!</p></div>');

                                                                      }
                                                                                
                                                                    }


                     });


}

  
              populate(false);             
            



   $('#container').on('mouseenter','.box',function () {

                    $(this).children('.overlay').show();
   });

    $('#container').on('mouseleave','.box',function () {

                         $(this).children('.overlay').hide();
    });

  

     $('#container').on('click','.box',function(){
       
      chrome.tabs.create({url: $(this).attr("data-url")}, null);

     });

     $(".addContent img").click(function(){
        $(this).prevAll().toggle("right");
        $(".green-butt,.red-butt").show();
        $(this).hide();
     });

   

      $(".red-butt").click(function(){
        $(this).parent().children().hide();
        $(".addContent img").toggle("right");
        $(".green-butt,.red-butt").hide();
       
     });

      $("div").on('click','p.x',function(){          
                  if(confirm("Are you sure, you want to remove it from the speed dial ?"))
                    {
                      var removeitem = $(this).parent().parent().attr("data-url");
                      arrGlobal = $.grep(arrGlobal, function(e){ return e.url != removeitem; });
                      saveToStorage({"1":arrGlobal});
                     $(this).parent().parent().remove();
                     
                     return false;
                    }
                    else
                    {
                      return false;
                    }
      });

      $("img.clearall").click(function(){
                              if(confirm("This will clear ALL the Speed Dials below ? Do you want to continue ?"))
                              {
                                  clearStorage();
                                  populate(false);
                              }

      });
    
        $(".green-butt").click(function(){
            chrome.tabs.query ({'active': true}, function(tabs) {
                var url = tabs[0].url.toLowerCase();

              
               indexes = $.map(arrGlobal, function(obj, index) {
                      if(obj.url == url) {
                          return index;
                      }
                  });

               
               
                if(indexes[0] != undefined)
                {


                  arrGlobal = arraymove(arrGlobal,indexes[0],arrGlobal.length-1);              
                  console.log(arrGlobal);
                  saveToStorage({"1":arrGlobal});
                  populate(true);
                  
                }

                else
                {
               

                      var title = tabs[0].title.substr(0,5);
                    
                      var imgd = getThumbnail(tabs[0].favIconUrl,url);
                      var ht;
                      
                     
                            arrGlobal.push({title:tabs[0].title,url:tabs[0].url,img:imgd}) 
                            saveToStorage({"1":arrGlobal});
                            populate(true);
                    
                }
                


            });

        });



    
});