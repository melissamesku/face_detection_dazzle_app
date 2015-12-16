
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
   //              // Canvas2Image.saveAsPNG(canvas); 
   //              // $("#img-out").append(canvas);
   //              // Clean up 
   //              //document.body.removeChild(canvas);
   //              canvas.toBlob(function(blob) {
   //              	saveAs(blob, "mypic.png");
   //              })
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



// STILL TRYING TO SAVE CANVAS TO BLOB
	// var canvas = document.getElementById("droppableCanvas");

	// canvas.toBlob(function(blob) {
	//   var newImg = document.createElement("img"),
	//       url = URL.createObjectURL(blob);

	//   newImg.onload = function() {
	//     // no longer need to read the blob so it's revoked
	//     URL.revokeObjectURL(url);
	//   }, "image/jpeg", 0.75;

	//   newImg.src = url;
	//   document.body.appendChild(newImg);
	// });