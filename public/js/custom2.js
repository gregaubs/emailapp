$(document).ready(function(){
	var element = $('#send');

	$('.send-button').on("click", function(){
		console.log('sendbutton');
	});

	// $('div').on("click", function(){
	// 	console.log('div 2');
	// });

	$('button').on("click", function(){
		console.log('button 2');
	});

	element.on("click", function(){
		console.log("variable 2");
			
	})




//end
});

