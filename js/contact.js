"use strict";

let map;

$(document).ready(function($){

	$("#directions").on("click", function(e){
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showGeoError);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	});
	
	
	function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude); 

		let origin = position.coords.latitude + ',' + position.coords.longitude; // https://www.w3schools.com/html/html5_geolocation.asp
		let destination = '220 S Michigan Ave, Chicago, IL, 6064';
		
		calculateAndDisplayRoute(origin, destination);
	}


	function showGeoError(error) {	

		let errorText = 'Unknown';

		// https://www.w3schools.com/html/html5_geolocation.asp
		switch(error.code) {
			case error.PERMISSION_DENIED:
				errorText = "User denied the request for Geolocation."
				break;
			case error.POSITION_UNAVAILABLE:
				errorText = "Location information is unavailable."
				break;
			case error.TIMEOUT:
				errorText = "The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
				errorText = "An unknown error occurred."
			break;
		}
		
		alert('Error getting your position: ' + errorText);
	}

});

// https://developers.google.com/maps/documentation
function initMap() {

	var office = {
		"lat" : 41.879015,
		"lng" : -87.624982
	};
	
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: office
	});
	
	var marker = new google.maps.Marker({
		position: office,
		map: map
	});
}

// https://developers.google.com/maps/documentation/javascript/examples/directions-simple
function calculateAndDisplayRoute(origin, destination) {

	let directionsService = new google.maps.DirectionsService;
	let directionsDisplay = new google.maps.DirectionsRenderer;

	directionsDisplay.setMap(map);

	directionsService.route({
		origin: origin,
		destination: destination,
		travelMode: 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}



//https://maps.googleapis.com/maps/api/geocode/json?address=220+s+michigan+ave,+chicago,+il+6064&key=AIzaSyD1JciXmdnnr3eA05k1sHbaJXWA90foZNw
