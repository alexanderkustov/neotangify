function geolocate(e)
{
	var cur_longitude, cur_latitude, cur_loc_timestamp;
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		cur_longitude = e.coords.longitude;                     
		cur_latitude = e.coords.latitude;
		console.log('current location long ' + cur_longitude.toFixed(3) + ' lat ' + cur_latitude.toFixed(3));
		changePosition(cur_longitude, cur_latitude);
	});
}


function changePosition(lat, longi){
	var url = mainserver + '/change_position.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	updateRadar(lat,longi);
	    	
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	    	alert('error' + e);
	    },
	    timeout : 60 * 1000
	});
	
	var params = {
		'latitude': lat,
		'longitude' : longi
	};
	
	client.open("POST", url);
	client.send(params);
	
}

function updateRadar(lat, longi){
	var url = mainserver + '/people_nearby.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	//console.log(url);
	
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			
			Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);

			
			for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {
				var persons_id = JSON.parse(this.responseText).people[i].id;
				addPersonToRadar(persons_id);
			}
		},
		onerror : function(e) {
			alert('error' + e);
			Ti.API.info("Get radar error: " + this.responseText);
		},
		timeout : 60 * 1000
	});
	
	var params = { 'latitude': lat, 'longitude' : longi};
	client.open("GET", url);
	client.send(params);  
}

function addPersonToRadar(personId){

	var personView = Ti.UI.createView({
		top: personId*40,
		id: personId
	});

	var face = Ti.UI.createImageView({
		image: '/person.png',
		top: 30+personId,
		width: 40,
		height: 40,
		borderRadius:20
	});
	
	personView.addEventListener('click', function(e){
		profilemodal(this.id);
		console.log("gaja a passar para modal: " + personId);
	});
	
	personView.add(face);
	
	$.radar.add(personView);
}



function profilemodal(userid){	
	
	console.log(userid + ' este e o user');
	
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();

	profilewin.open();
}


$.radar_window.addEventListener('focus', function() {
	geolocate();
});