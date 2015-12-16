console.log('static-image-detection.js is loaded');

$(function() { // document.ready
  console.log('app.js document.ready loaded');
  $("#track-again-button").click(function() {
    var img = document.getElementById('blah'); //changed this from 'img'
		var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    	tracker.setStepSize(1.3);

    	tracking.track('#blah', tracker);

    	tracker.on('track', function(event) {
      	event.data.forEach(function(rect) {
        	window.plot(rect.x, rect.y, rect.width, rect.height);
      	});
    	});

    	window.plot = function(x, y, w, h) {
      	if((x != 0) && (y != 0)) {
        	var rect = document.createElement('div');
	        document.querySelector('.demo-container').appendChild(rect);
	        rect.classList.add('rect');
	        rect.style.width = w + 'px';
	        rect.style.height = h + 'px';
	        rect.style.left = (img.offsetLeft + x) + 'px';
	        rect.style.top = (img.offsetTop + y) + 'px';
	        console.log('a face has been detected');
      	}
      	else {
        	console.log('no face detected');
        }
    	};
    	console.log('"detect face" button clicked');
	});

	// SIMPLE FILE UPLOAD (THOUGH IT'S TO A DATAURL UNFORTUNATELY) ====================================
function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
      }
  }
  $("#imgInp").change(function(){
      readURL(this);
  });
});