$(document).ready(function(){

var url = window.location.href; 

$("form").submit(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    var $this = $(this); // `this` refers to the current form element
    var postUrl = url + "postform";
    console.log('postURL is: ', postUrl)
    	
	$.ajax({
		url: 'http://localhost:8000/postform',
		method: "POST",
		data: {
			firstname:  $('#firstname').val(),
		    lastname:   $('#lastname').val(),
		    tag1: 		$('#tag1').val(),
		    tag2: 		$('#tag2').val(),
		    tag3: 		$('#tag3').val(),
		    email: 		$('#email').val()
		},
		success: function(response){
			console.log('ajax success, response is: ',response);	
		}
	})
});

//end
});