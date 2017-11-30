"use strict";

$(document).ready(function($){

	$("#generate").on("click", function(e){
		
		let numWords = $("#num").val();
		

		
		$("#output").text(numWords);
		
		// http://blog.revathskumar.com/2016/06/why-i-prefer-ajax-promise.html
		$.ajax({
			url: 'http://ellypost.com/courses/453/ajax-lab/actions.php',
			dataType: 'jsonp',
			method: "POST",
			
			jsonpCallback: 'callbackFnc',
			async: false,
			crossDomain: true,
			
			data: { 
				'word-count': 3,
				'action': 'generate-string'
				}
			})
			.done(function(data) {
				
				let randomWordsReturn = null;
				
				try {
					randomWordsReturn = JSON.parse(data)
				} catch(ex) {
					alert('error');
					console.log('parse exception', ex)
				}
				
				console.log('ajax success', data);
				
				$("#output").text(randomWordsReturn.value);
			})
			.fail(function(xhr) {
				console.log('ajax error', xhr);
			});
	});


});