$(document).ready(function(){

	var url = window.location.href; 

	//FORM SUBMISSION
	$("form").submit(function(e) {
	    e.preventDefault(); // Prevents the page from refreshing
	    var $this = $(this); // `this` refers to the current form element

	    	
		$.ajax({
			url: '/postform',
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

	// RENDER VIEW OF ALL CONTACTS
	if (window.location.href.indexOf("view") > -1){
		console.log('rendering view of contacts');
		
		$.get("/getdata", function(data){
			console.log(data);	
			for(var i=0; i<data.length; i++){
				buildRow(data[i], function(completeRow){
					$('.view-table-container').append(
						completeRow
					);			
				});
			}
        });
	}


	function buildRow (obj, callback) {
		var row = '<div class="view-table-row row">';
		var rowFirstname = '<div class="col s2">'+obj.firstname+'</div>';
		var rowLastname = '<div class="col s2">'+obj.lastname+'</div>';
		var rowTag1 = '<div class="col s1">'+obj.tag1+'</div>';
		var rowTag2 = '<div class="col s1">'+obj.tag2+'</div>';
		var rowTag3 = '<div class="col s1">'+obj.tag3+'</div>';
		var rowEmail = '<div class="col s3">'+obj.email+'</div>';
		var closingDiv = '</div>';
		var completeRow = row + rowFirstname + rowLastname + rowTag1 + rowTag2 + rowTag3 + rowEmail + closingDiv;
		callback(completeRow);
	}

				


//end
});