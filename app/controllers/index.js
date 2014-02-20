function openRegister(e){
	var win=Alloy.createController('register').getView();
	$.index.close();
	win.open();
}

function login(e)
{
	//starting to send out the auth
	var url = "http://localhost:3000/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	      	$.index.setActiveTab(2);
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
	        
	        
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('error' + e);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'auth_key': $.login.value,
		'password' : $.password.value ,
	    "Login" :"", 
	    "provider":"identity"
	};

	// Prepare the connection
	client.setRequestHeader('enctype', 'multipart/form-data');
	
	client.open("POST", url);
	client.send(params);  
}

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

function updateRadar(lat, longi){
	var url = 'http://localhost:3000/people_nearby.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get ACtivity feed text: " + this.responseText);
	    	
	    	$.radar.text = JSON.parse(this.responseText).people[0].name;
	    	
	    	var face = JSON.parse(this.responseText).people[0].presentation_picture.url;
	    	
	    	if(face != null){
	    		$.face.image =  JSON.parse(this.responseText).people[0].presentation_picture.url;
	    	} else {
	    		$.face.image =  "http://lorempixel.com/100/100";
	    	}
	    	
	    	
	    	Ti.API.info("Get ACtivity feed text: " + JSON.parse(this.responseText).people[0].presentation_picture.url);
	    	
	       
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


$.index.open();
