$(function() {



  var arrGlobal=[];

function getStandardFavicon(favurl,url){
  try{
      var l= new URL(url);
  }
    catch(e){
            return favurl;
  }

 
    var host = l.hostname.replace('http://','').replace('https://','').replace('www.','');
     var split = host.split('.');
     if(split.length > 2){  // has subdomains
          var tmpImg = new Image();
          tmpImg.src = '/img/fav/' + split[split.length-2] + '.png';

          $(tmpImg).error(function(){

                        return favur;
                    });
          
     }
     else{  // has no subdomains
      alert(host.substr(0,host.indexOf('.')));
     }
  
 
}
  // Save logic
function saveToStorage(obj) {
       
        chrome.storage.local.set(obj, function() {
          // Notify that we saved.
          //alert('Settings saved');
          console.log(obj);
        });
}




function populate(){
                    $("#container").empty();
                     chrome.storage.local.get("1", function(items) {
                                                                   
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
                                                                            var imght;
                                                                            

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
                                                                                        if(key == 'imght'){
                                                                                          imght = element;
                                                                                        }
                                                                                        
      
                                                                                  });
                                                                                            if(imght == 16){

                                                                                                  $("#container").append('<div class="box" title="' + title + '" data-url="' + url + '" data-img="' + img + '">\
                                                                                          <div class="content"><img src="' +img+ '"></div>\
                                                                                          <div class="base gutter-space">' + title + '</div>\
                                                                                          <div class="overlay"><p class="x">[ X ]</p>\
                                                                                          <button class="blue-butt">Go</button>\
                                                                                          </div>\
                                                                                          </div>');

                                                                                            }
                                                                                              else{

                                                                                             $("#container").append('<div class="box" title="' + title + '" data-url="' + url + '" data-img="' + img + '">\
                                                                                          <div class="content"><img src="' +img+ '"></div>\
                                                                                          <div class="base">' + title + '</div>\
                                                                                          <div class="overlay"><p class="x">[ X ]</p>\
                                                                                          <button class="blue-butt">Go</button>\
                                                                                          </div>\
                                                                                          </div>');

                                                                                           }
                                                                                    
                                                                                     $("#container").sortable().bind('sortupdate', function() { // TO inject sortablity to dynamically addded eleements
                                                                                          //Triggered when the user stopped sorting and the DOM position has changed.
                                                                                          arrGlobal=[];
                                                                                          $('.box').each(function() { 

                                                                                              var obj={};
                                                                                              obj.title=$(this).attr('title');
                                                                                              obj.url=$(this).attr('data-url');   
                                                                                              obj.img=$(this).attr('data-img');          

                                                                                             arrGlobal.push(obj) ;
                                                                                             saveToStorage({"1":arrGlobal});




                                                                                          });
                                                                                          
                                                                                      });; 

                                                                                     arrGlobal = arr;
                                                                               
                                                                              });
                                                                          }
                                                                        }

                                                                      }
                                                                                
                                                                    }

                     });


}

  // Watermarking magic

              populate();             
              var watermark = 'Add the URL that you want to Speed Dial';
             $('.addContent input').blur(function(){
              if ($(this).val().length == 0)
                $(this).val(watermark).addClass('watermark');
             }).focus(function(){
              if ($(this).val() == watermark)
                $(this).val('').removeClass('watermark');
             }).val(watermark).addClass('watermark');



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

     $(".green-butt").click(function(){  // Add URL
              var arrVal=[];
              arrGlobal.push({title:'Gmail',url:$('#boxurl').val(),img:'sdsds'}) 
              saveToStorage({"1":arrGlobal});

              $(this).parent().children().hide();
              $(".addContent img").toggle("left");
              $(".green-butt,.red-butt,.addContent input").hide();
              populate(); 

    
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
    
        $("#addCurPage").click(function(){
            chrome.tabs.query ({'active': true}, function(tabs) {
                var url = tabs[0].url;
                var title = tabs[0].title.substr(0,5);
                var img = getStandardFavicon(tabs[0].favIconUrl,url);
                var ht;
                
                if(img != "undefined"){
                  
                  var tmpImg = new Image();
                    tmpImg.src = img;

                    $(tmpImg).error(function(){
                      arrGlobal.push({title:tabs[0].title,url:tabs[0].url,img:'/img/unknown.png',imght:'32'}) 
                      saveToStorage({"1":arrGlobal});
                      populate();
                    });

                    $(tmpImg).one('load',function(){ 
                         
                      ht = tmpImg.height;
                     
                      arrGlobal.push({title:tabs[0].title,url:tabs[0].url,img:img,imght:ht}) 
                      saveToStorage({"1":arrGlobal});
                      populate();
                     
                    });
                }
                else{
                      
                      arrGlobal.push({title:tabs[0].title,url:tabs[0].url,img:'/img/unknown.png',imght:'32'}) 
                      saveToStorage({"1":arrGlobal});
                      populate();
                }


            });

        });



    
});