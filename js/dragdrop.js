$(function() {

var dragSrcEl = null;


function runThroughUInBuildGlobals(){
    
    arrGlobal=[];

	$('.box').
	          each(function() { 

                              var obj={};
                              obj.title=$(this).attr('title');
                              obj.url=$(this).attr('data-url');   
                              obj.img=$(this).attr('data-img');          

                              arrGlobal.push(obj) ;
                              saveToStorage({"1":arrGlobal});

                          });
}

function handleDragStart(e) {
 
  elem = $(e.target);

  

  elem[0].style.opacity = '0.4';

  dragSrcEl = elem[0];

  e.originalEvent.dataTransfer.effectAllowed = 'move';
  e.originalEvent.dataTransfer.setData('text/html', elem[0].innerHTML);
 
}

function handleDragOver(e) {

	 elem = $(e.target);


  if (e.originalEvent.preventDefault) {
    e.originalEvent.preventDefault(); 
  }

  e.originalEvent.dataTransfer.dropEffect = 'move'; 

  return false;
}

function handleDragEnter(e) {
  

   elem = $(e.target).closest('.box');

  $(elem[0]).addClass('over');
 
}

function handleDragLeave(e) {

	elem = $(e.target).closest('.box');

 
   $(elem[0]).removeClass('over');
  
}

function handleDrop(e) {
 

   elem = $(e.target).closest('.box');


  if (e.originalEvent.stopPropagation) {
    e.originalEvent.stopPropagation(); 
  }

  
  if (dragSrcEl != elem[0]) {
   
    dragSrcEl.innerHTML = elem[0].innerHTML;
    elem[0].innerHTML = e.originalEvent.dataTransfer.getData('text/html');
  }

  

  return false;
}


function handleDragEnd(e) {
 

 elem = $(e.target);

	$('#container .box').removeClass('over');
    elem[0].style.opacity = '1';
    runThroughUInBuildGlobals(); 

 
}


var cols = document.querySelectorAll('#container .box');

$('#container').on('dragstart','.box',function(e){handleDragStart(e);});
$('#container').on('dragenter','.box',function(e){handleDragEnter(e);});
$('#container').on('dragover','.box',function(e){handleDragOver(e);});
$('#container').on('dragleave','.box',function(e){handleDragLeave(e);});
$('#container').on('drop','.box',function(e){handleDrop(e);});
$('#container').on('dragend','.box',function(e){handleDragEnd(e);});


});