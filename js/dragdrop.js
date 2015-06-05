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
  // Target (this) element is the source node.
  //alert(e.target);
  elem = $(e.target);

   //alert($(e.target).attr('class'));

  elem[0].style.opacity = '0.4';

  dragSrcEl = elem[0];

  e.originalEvent.dataTransfer.effectAllowed = 'move';
  e.originalEvent.dataTransfer.setData('text/html', elem[0].innerHTML);
  //alert(1);
}

function handleDragOver(e) {

	 elem = $(e.target);


  if (e.originalEvent.preventDefault) {
    e.originalEvent.preventDefault(); // Necessary. Allows us to drop.
  }

  e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//alert(2);
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.

   elem = $(e.target).closest('.box');
//alert($(elem).attr('class'));
  $(elem[0]).addClass('over');
  //alert(3);
}

function handleDragLeave(e) {

	elem = $(e.target).closest('.box');

  //elem[0].classList.remove('over');  // this / e.target is previous target element.
   $(elem[0]).removeClass('over');
  //alert(4);
}

function handleDrop(e) {
  // this/e.target is current target element.

   elem = $(e.target).closest('.box');


  if (e.originalEvent.stopPropagation) {
    e.originalEvent.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != elem[0]) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = elem[0].innerHTML;
    elem[0].innerHTML = e.originalEvent.dataTransfer.getData('text/html');
  }

  //alert(5);

  return false;
}


function handleDragEnd(e) {
  // this/e.target is the source node.

  //[].forEach.call(cols, function (col) {
    //col.classList.remove('over');
  //});

 elem = $(e.target);

	$('#container .box').removeClass('over');
    elem[0].style.opacity = '1';
    runThroughUInBuildGlobals();

  //alert(6);
}

//alert('100');

var cols = document.querySelectorAll('#container .box');

//alert(cols.length);

//[].forEach.call(cols, function(col) {
//	
	////alert(12);
  //col.addEventListener('dragstart', handleDragStart, false);
  //col.addEventListener('dragenter', handleDragEnter, false)
  //col.addEventListener('dragover', handleDragOver, false);
  //col.addEventListener('dragleave', handleDragLeave, false);
  //col.addEventListener('drop', handleDrop, false);
  //col.addEventListener('dragend', handleDragEnd, false);
//
//  
//});

$('#container').on('dragstart','.box',function(e){handleDragStart(e);});
$('#container').on('dragenter','.box',function(e){handleDragEnter(e);});
$('#container').on('dragover','.box',function(e){handleDragOver(e);});
$('#container').on('dragleave','.box',function(e){handleDragLeave(e);});
$('#container').on('drop','.box',function(e){handleDrop(e);});
$('#container').on('dragend','.box',function(e){handleDragEnd(e);});


});