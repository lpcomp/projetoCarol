
function msgAlert(text, cb) {

  if (text === '') { //Se não tiver feedback
    cb();
    return;
  }

  document.querySelector('#contentAlert span').textContent = text;
  document.querySelector('#alertScreen').style.display = 'flex';
  setTimeout(function(){
    document.querySelector('#alertScreen').classList.add('showAlert');
  }, 50);

  document.querySelector('#alertScreen .boxCloseModal').onclick = function () {
    document.querySelector('#alertScreen .boxCloseModal').onclick = function () { }
    document.querySelector('#alertScreen').classList.remove('showAlert');
    setTimeout(function(){
      document.querySelector('#alertScreen').style.display = 'none';
      if (cb) cb();
    }, 300);
    
  };
  
}

function preloadImages(images, cb) {
  var remaining = images.length;
  if (remaining == 0) cb();

  var onLoad = function onLoad() {
    if (--remaining == 0) cb();
  };

  for (var i = 0; i < images.length; i++) {
    var img = new Image();
    img.src = images[i];
    img.onload = onLoad;
    img.onerror = onLoad;
  }
}

function getBrowser() {
  var userAgent = navigator.userAgent;
  console.log('getBrowser', userAgent);

  if ((userAgent.indexOf("Opera") || userAgent.indexOf('OPR')) != -1) {
    return 'Opera';
  } else if (userAgent.indexOf("Chrome") != -1) {
    return 'Chrome';
  } else if (userAgent.indexOf("Safari") != -1) {
    return 'Safari';
  } else if (userAgent.indexOf("Firefox") != -1) {
    return 'Firefox';
  } else if ((userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
    return 'IE';
  } else {
    return 'unknown';
  }
}

function detectMobile() {
  var device = new MobileDetect(window.navigator.userAgent);
  console.log(device.mobile());
}

function queryStringURL(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

//goUp('.boxQuestions')
function goUp(ele) {
  var element = document.querySelector(ele);

  element.style.opacity = 0;
  element.style.transform = 'translate3d(0px, 20px, 0px)';
  setTimeout(function(){
    element.style.opacity = 1;
    element.style.transform = 'translate3d(0px, 0px, 0px)';
  }, 400);
  
}