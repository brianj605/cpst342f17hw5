"use strict";

$(document).ready(function($){

	$("#generate").on("click", function(e){
		
		let numWords = $("#num").val();
		
		let numWordsInt = 0;
		
		let hasParseError = false;
		let parseErrorMessage = null;
		
		// Clear output
		$("#output").html('');
		$("#outputError").html('');
		
		try {
			numWordsInt = Number.parseInt(numWords);
		} catch(ex) {
			hasParseError = true;
			parseErrorMessage = 'Exception while parsing number entered';
		}
		
		if (isNaN(numWordsInt)) {
			if (parseErrorMessage == null) {
				parseErrorMessage = 'It looks like you didn\'t enter a valid int. Please enter an int and try again.';
			}
		
			$("#outputError").text('Error: ' + parseErrorMessage);	

			
		} else {

			$("#output").text('Loading words...');

			// http://blog.revathskumar.com/2016/06/why-i-prefer-ajax-promise.html
			$.ajax({
				url: 'http://ellypost.com/courses/453/ajax-lab/actions.php',
				method: "POST",

				data: { 
					'word-count': numWordsInt,
					'action': 'generate-string'
					}
				})
				.done(function(data) {

					let randomWordsReturn = null;

					try {
						randomWordsReturn = JSON.parse(data)
					} catch(ex) {
						alert('error parsing JSON');
						console.log('parse exception', ex)
					}

					console.log('ajax success', data);


					if (randomWordsReturn.value != null && randomWordsReturn.status == 1) {

						// Change line ending from UNIX to Windows or else the pre whites-space
						// doesn't seem to work correctly
						randomWordsReturn = randomWordsReturn.value.replace(/\r/g, '\r\n');
						
						$("#output").text(randomWordsReturn);

					} else {
						
						$("#outputError").text('Error getting random words (status != 1): ' + randomWordsReturn.value);

					}

					
				})
				.fail(function(xhr) {
					console.log('ajax error', xhr);
				}
			);
		}
	});
	
	
	$("form").submit(function(e){
	
		$("#generate").click();
	
		e.preventDefault();
		return false;
	});



});