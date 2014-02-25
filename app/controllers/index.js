
function getActivityFeed(e){
		//starting to send out the auth
	var url = 'http://localhost:3000/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get ACtivity feed text: " + this.responseText);
	    	
	    	$.activityfeed.text = JSON.parse(this.responseText);
	       
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	       alert('error' + e);
	       Ti.API.info("Get ACtivity feed text: " + this.responseText);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		//'auth_key': Alloy.Globals.auth_token,
		'format': "json"
	};

	client.open("GET", url);
	client.send(params);  
}


function changePosition(lat, longi){
	var url = 'http://localhost:3000/change_position.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	
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

function geolocate(e)
{
	var cur_longitude, cur_latitude, cur_loc_timestamp;
 
 
 
    Titanium.Geolocation.getCurrentPosition(function(e)
    {
        Ti.API.warn(e);
 
        cur_longitude = e.coords.longitude;                     
        cur_latitude = e.coords.latitude;
 
        Titanium.API.info('geo - current location: long ' + cur_longitude.toFixed(3) + ' lat ' + cur_latitude.toFixed(3));
 
 		changePosition(cur_longitude, cur_latitude);
    });
}

function profilemodal(e){
	var profilewin=Alloy.createController('profilemodal').getView();
	var avatar = $.radar.image;
	var name = $.radar.text;
	
	 Titanium.API.info('image: ' + avatar + ' name ' + name);
	 
	 $.index.close();
	profilewin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});

	 
	 
	
}

function updateRadar(lat, longi){
	var url = 'http://localhost:3000/people_nearby.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get ACtivity feed text: " + this.responseText);
	   	
	   	for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {

	 	
	    	$.radar.text = JSON.parse(this.responseText).people[i].name;
	 
	    	var face = JSON.parse(this.responseText).people[i].presentation_picture.url;
	    	
	    	if(face != null){
	    		$.face.image =  JSON.parse(this.responseText).people[i].presentation_picture.url;
	    	} else {
	    		$.face.image =  "http://lorempixel.com/100/100";
	    	}
	    	
	    	
	    	Ti.API.info("Get ACtivity feed text: " + JSON.parse(this.responseText).people[i].presentation_picture.url);
	    	
	      }
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	       alert('error' + e);
	       Ti.API.info("Get radar text: " + this.responseText);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'latitude': lat,
		'longitude' : longi
	};
	

	client.open("GET", url);
	client.send(params);  
}
Alloy.Globals.tabgroup = $.index;

$.index.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});


