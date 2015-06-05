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
            //alert(temphost);
              return strGlobalFavPath + temphost + strGlobalFavExt;
           }
           else if(arrGlobalKnownHosts.indexOf(tempsubhost) > 0)
           {
               //alert(tempsubhost);
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


  //try{
      //var l= new URL(url);
  //}
    //catch(e){
            //return favurl;
  //}
//
    //url = url.toLowerCase();
    //var host = l.hostname.replace('http://','').replace('https://','').replace('www.','');
     //var split = host.split('.');
//
//     
//
     //if(split.length !=0)
     //{
             //if(split.length > 2){  // has subdomains
                  //var tmpImg = new Image();
                  //tmpImg.src = '/img/fav/' + split[split.length-2] + '.png';
//
                  //$(tmpImg).error(function(){
//
                                //return favurl;
                            //});
//                  
             //}
             //else{  // has no subdomains
//                
               //var tmpImg = new Image();
//               
                //var imgurl = '/img/fav/' + split[split.length-2] + '.png';
                  //tmpImg.src = imgurl
//                   
                  //$(tmpImg).error(function(){
//                                
                                //return favur;
                            //});
                   ////alert("final");
              ////alert(host.substr(0,host.indexOf('.')));
              //return imgurl;
             //}
      //}
//
      //return favurl;
 
}




function populate(doeffect){
                    $("#container").empty();
                     chrome.storage.sync.get("1", function(items) {
                                                                  
                                                                    if(typeof(items) != "undefined"){

                                                                      if(Object.keys(items).length > 0) {
//console.log(items);
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

                                                                                         
                                                                                    
                                                                                     //$("#container").sortable().bind('sortupdate', function() { // TO inject sortablity to dynamically addded eleements
                                                                                          //Triggered when the user stopped sorting and the DOM position has changed.
                                                                                          //arrGlobal=[];
                                                                                          //$('.box').each(function() { 
//
                                                                                              //var obj={};
                                                                                              //obj.title=$(this).attr('title');
                                                                                              //obj.url=$(this).attr('data-url');   
                                                                                              //obj.img=$(this).attr('data-img');          
//
                                                                                             //arrGlobal.push(obj) ;
                                                                                             //saveToStorage({"1":arrGlobal});
//
//
//
//
                                                                                          //});
                                                                                          
                                                                                     // });; 

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

  // Watermarking magic

              populate(false);             
              //var watermark = 'Add the URL that you want to Speed Dial';
             //$('.addContent input').blur(function(){
              //if ($(this).val().length == 0)
                //$(this).val(watermark).addClass('watermark');
             //}).focus(function(){
              //if ($(this).val() == watermark)
                //$(this).val('').removeClass('watermark');
             //}).val(watermark).addClass('watermark');



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

     //$(".green-butt").click(function(){  // Add URL
              //var arrVal=[];
              //arrGlobal.push({title:'Gmail',url:$('#boxurl').val(),img:'sdsds'}) 
              //saveToStorage({"1":arrGlobal});
//
              //$(this).parent().children().hide();
              //$(".addContent img").toggle("left");
              //$(".green-butt,.red-butt,.addContent input").hide();
              //populate(); 
//
//    
     //});

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

               // var chk = $.grep(arrGlobal, function(e){ return e.url == url.toLowerCase(); });
               indexes = $.map(arrGlobal, function(obj, index) {
                      if(obj.url == url) {
                          return index;
                      }
                  });

               
               
                if(indexes[0] != undefined)
                {


                  //var tmpObj = arrGlobal[indexes[0]-1];
                  
                 

                  //arrGlobal.splice(0, 0, tmpObj);  // only inserts to first index   

                  arrGlobal = arraymove(arrGlobal,indexes[0],arrGlobal.length-1);              
                  console.log(arrGlobal);
                  saveToStorage({"1":arrGlobal});
                  populate(true);
                  
                }

                else
                {
               

                      var title = tabs[0].title.substr(0,5);
                      //alert(tabs[0].favIconUrl);
                      var imgd = getThumbnail(tabs[0].favIconUrl,url);
                      var ht;
                      
                     
                            arrGlobal.push({title:tabs[0].title,url:tabs[0].url,img:imgd}) 
                            saveToStorage({"1":arrGlobal});
                            populate(true);
                    
                }
                


            });

        });



    
});