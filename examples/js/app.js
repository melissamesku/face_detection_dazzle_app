console.log('app.js is working');

$(function() { // document.ready
    console.log('app.js document.ready loaded');

	// ====================================================================================================================================
	// BASIC NAV FUNCTIONALITY
	// ====================================================================================================================================




	// ====================================================================================================================================
	// VIDEO FACIAL DETECTION FUNCTIONALITY
	// ====================================================================================================================================

    // RUN TRACKING.JS FACIAL DETECTION ON VIDEO STREAM  ===========================================
	window.onload = function() {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });

      var gui = new dat.GUI();
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      gui.add(tracker, 'stepSize', 1, 5).step(0.1);
    };

    // DRAG AND DROP FUNCTIONALITY FOR OVERLAYS - WORKS WITH HTML CANVAS ==============================
	var allowDrop = function(e){
        e.preventDefault();
    }
    var drag = function(e){
        //store the position of the mouse relativly to the image position
        e.dataTransfer.setData("mouse_position_x",e.clientX - e.target.offsetLeft );
        e.dataTransfer.setData("mouse_position_y",e.clientY - e.target.offsetTop  );

        e.dataTransfer.setData("image_id",e.target.id);
    }
    var drop = function(e){
        e.preventDefault();
        var image = document.getElementById( e.dataTransfer.getData("image_id") );

        var mouse_position_x = e.dataTransfer.getData("mouse_position_x");
        var mouse_position_y = e.dataTransfer.getData("mouse_position_y");

        var droppableCanvas = document.getElementById('droppableCanvas');
        var ctx = droppableCanvas.getContext('2d');

        // the image is drawn on the canvas at the position of the mouse when we lifted the mouse button
        ctx.drawImage( image , e.clientX - droppableCanvas.offsetLeft - mouse_position_x , e.clientY - droppableCanvas.offsetTop - mouse_position_y );
    }
    var convertCanvasToImage = function(){
        var droppableCanvas = document.getElementById('droppableCanvas');

        var image_src = droppableCanvas.toDataURL("image/png");
        window.open(image_src);
    }

	// CAPTURE IMAGE FROM VIDEO AND INSERT INTO HTML CANVAS ===========================================
	// thanks to http://odetocode.com/blogs/scott/archive/2013/01/04/capturing-html-5-video-to-an-image.aspx

	(function() {
	    "use strict";
	 
	    var video, $droppableCanvas;
	    // var scale = 0.25; // scale is used below, if needed
	 
	    var initialize = function() {
	        $droppableCanvas = $('#droppableCanvas');
	        video = $("#video").get(0);
	        $("#capture").click(captureImage);                
	    };
	 
	    var captureImage = function() {
	    	$droppableCanvas.empty();
	    	$("#demo-frame").detach(); //this removes the whole webcam feed div (but it doesn't turn off the camera)
	        var canvas = document.getElementById("droppableCanvas"); //testing this solution - just putting image directly into droppable canvas
	        // canvas.width = video.videoWidth * scale;
	        // canvas.height = video.videoHeight * scale;
	        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	 
	        var img = document.createElement("img");
	        img.setAttribute('draggable', 'true');
	        img.setAttribute('ondragstart', 'drag(event)');
	        img.src = canvas.toDataURL();
	        $('#droppableCanvas').append(img);
	    };
	 
	    $(initialize);  
	        
	}());


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

    // http://www.w3schools.com/jsref/dom_obj_fileupload.asp
 //    var formUpload = document.createElement("INPUT");
	// formUpload.setAttribute("type", "file");
	// var formArea = document.getElementById('#form-area');
	// domIMG.append(formArea);


	// ====================================================================================================================================
	// STATIC IMAGE FACIAL DETECTION FUNCTIONALITY
	// ====================================================================================================================================

  	$("#track-again-button").click(function() {
  		var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
      	tracker.setStepSize(1.3);

      	tracking.track('#img', tracker);

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
      	console.log('track again button clicked');
  	});

}); // END







// ===================================
// BONEYARD OF DEAD CODE
// ===================================


// DRAG AND DROP FUNCTIONALITY ================================================================
// THIS WORKS, BUT NOT FOR HTML CANVAS
	// $(function() {
	//     $("#draggable").draggable();
	//     $("#droppable").droppable({
	//       	drop: function( event, ui ) {
	//         	$(this)
	//           	.addClass("ui-state-highlight")
	//           	.find("p")
	//            	 .html("damn, you're handsome!");
	//       	}
	//     });
	// });


// CANVAS2IMAGE BUTTON TO SAVE CANVAS AS PNG
// This doesn't work, the image comes out empty
// Resource interpreted as Document but transferred with MIME type image/octet-stream: "data:image/octet-stream;base64.....
  	// $("#btnSave").click(function() {  
   //      html2canvas($("#droppableCanvas"), {
   //          onrendered: function(canvas) {
   //              theCanvas = canvas;
   //              document.body.appendChild(canvas);

   //              // Convert and download as image 
   //              Canvas2Image.saveAsPNG(canvas); 
   //              $("#img-out").append(canvas);
   //              // Clean up 
   //              //document.body.removeChild(canvas);
   //          }
   //      });
   //  });


    // $("#camera-on-button").click(function(){ // THIS DOESN'T WORK YET BUT I'LL COME BACK TO IT LATER
    // 	var wrapper = $('#wrapper');
    // 	var demoFrame = $('#demo-frame');
    // 	document.body.append(demoFrame);
    // 	console.log('clicked to turn camera back on ');
    // });


//this works but I don't think I'm going to use this functionality
 //  	$("#overlay-button").click(function() {
	//   	console.log( "Overlay button clicked" );
	//     // $('.overlay').empty;
	//     $('#droppable').prepend('<img src="../overlay-1.png" width="100%" style="z-index:3000"/>');
	// });


// RESIZABLE  JS
  // $(function() {
  //   $( "#resizable" ).resizable();
  // });
