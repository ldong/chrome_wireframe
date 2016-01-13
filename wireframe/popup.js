var bg = chrome.extension.getBackgroundPage();

// utility
function addClass(el, className){
  if (el.classList){
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

function removeClass(el, className){
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}


function showWireframeHandler(e) {
  chrome.extension.sendMessage({directive: 'show-wireframe'}, function(response) {
    this.close(); // close the popup when the background finishes processing request
  });
  hideButton();
}

function hideWireframeHandler(e) {
  chrome.extension.sendMessage({directive: 'hide-wireframe'}, function(response) {
    this.close(); // close the popup when the background finishes processing request
  });
  showButton();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('show').addEventListener('click', showWireframeHandler);
  document.getElementById('hide').addEventListener('click', hideWireframeHandler);
})

var showButton = function(){
  addClass(document.getElementById('hide'), 'hidden');
  removeClass(document.getElementById('show'), 'hidden');
}

var hideButton = function(){
  addClass(document.getElementById('show'), 'hidden');
  removeClass(document.getElementById('hide'), 'hidden');
}

if (bg._isShow) {
	console.log('SHOW');
	showButton();
} else {
	console.log('HIDE');
	hideButton();
}
