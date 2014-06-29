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
//unused
function distributeFields(e) {
    var radius = 200;
    var fields = $('.field'), container = $('#container'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            console.log($(this).text(), x, y);
        }
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
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
					
				if(persons_id != Alloy.Globals.user_id){
					
					addPersonToRadar(persons_id, lat, longi);
				}
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
	var latr = (cur_latitude - lat) ;
	var longr = (cur_longitude - longi);
	var measuremetres = (measure(lat, longi, cur_longitude, cur_latitude).toFixed(10)*1000000000);
	console.log("personId " + personId + " metros de diferenca " + (measure(lat, longi, cur_longitude, cur_latitude).toFixed(10)*1000000000) + " latr= " + lat + " longr= " +longi);
	
	var personView = Ti.UI.createView({		
		id: personId,
		left:measuremetres,
		
		
	});
	
	var face = Ti.UI.createImageView({
		image: '/person.png',
		width: 40,
		height: 40,
		borderRadius:20
	});
	
	var label = Ti.UI.createLabel({
		text: measuremetres
		});
	
		personView.addEventListener('click', function(e){
			profilemodal(this.id);
			console.log("gaja a passar para modal: " + personId);
		});
		
		personView.add(face);
		personView.add(label);
			$.radar.add(personView);
}

function percentualCalculate(lat, longi){

	return (measure(lat, longi, cur_longitude, cur_latitude) * 240)/25;
}

function radiusCalc(lat, longi){
	
	console.log("radius " + Math.sqrt(lat*lat+longi*longi));
	return Math.sqrt(lat*lat+longi*longi);
}

function anguleCalc(lat, longi){
	console.log("angulo "+ Math.atan(longi/lat));
	return Math.atan(longi/lat);
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

function filter(e){
	var win=Alloy.createController('radarQuery').getView();
	win.open();
}

function profilemodal(userid){	
	
	console.log(userid + ' este e o user');
	
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();

	profilewin.open();
}


$.radar_window.addEventListener('focus', function() {
	geolocate();
});