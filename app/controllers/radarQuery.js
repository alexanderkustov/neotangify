var cur_longitude, cur_latitude;

function geolocate(e)
{
	var cur_loc_timestamp;
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		cur_longitude = e.coords.longitude;                     
		cur_latitude = e.coords.latitude;
		console.log('current location long ' + cur_longitude + ' lat ' + cur_latitude);
		changePosition(cur_longitude, cur_latitude);
	});
}


function changePosition(lat, longi){
	var url = mainserver + '/change_position.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	updateRadar(lat,longi);
	    },
	    onerror : function(e) {
	    	alert('error' + e);
	    },
	    timeout : 60 * 1000
	});
	
	var params = { 'latitude': lat, 'longitude' : longi };
	
	client.open("POST", url);
	client.send(params);
	
}

function updateRadar(lat, longi){
	var url = mainserver + '/people_nearby.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			
			Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);

			for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {

				var persons_id = JSON.parse(this.responseText).people[i].id;
				var lat = JSON.parse(this.responseText).people[i].position.latitude;
				var longi = JSON.parse(this.responseText).people[i].position.longitude;
				Ti.API.info("pessoa: " + persons_id + " " + lat + " " + longi );

				addPersonToRadar(persons_id, lat, longi);
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

function addPersonToRadar(personId, lat, longi){
	console.log("metros de diferenca " + measure(lat, longi, cur_longitude, cur_latitude));
	
	var personView = Ti.UI.createView({		
		id: personId,
		left: percentualCalculate(lat, longi)
		
	});
	
	var face = Ti.UI.createImageView({
		image: '/person.png',
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

function percentualCalculate(lat, longi){
	return (measure(lat, longi, cur_longitude, cur_latitude) * 240)/25;
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    
    return d * 1000; // meters
}


function profilemodal(userid){	
	
	console.log(userid + ' este e o user');
	
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();

	profilewin.open();
}


$.radar_window.addEventListener('focus', function() {
	geolocate();
});