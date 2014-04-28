Ti.include("base64.js");


function getActivityFeed(e){
		//starting to send out the auth
	var url = mainserver + '/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get feed text: " + this.responseText);
	    	
	    	var parsedText = JSON.parse(this.responseText).activities;
	    	
	    	for(var i=0; i < parsedText.length; i ++)
	    		{
	    			//var obj = parsedText[i];
	    			 if(parsedText[i].subject_type == "Friendship")
	    				$.status.text = parsedText[i].subject.user.name + " " + parsedText[i].direction +  " "  + parsedText[i].subject.friend.name ;

	    	 }
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	       alert('error' + e);
	       Ti.API.info("get feed error: " + this.responseText);
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

function editProfile(){
	var win=Alloy.createController('profile').getView();
	win.open();
}

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
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("update radar text: " + this.responseText);
	    	Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
	   	//for das pessoas fixes
	   	
	   	for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {
	   		
	   		var persons_id = JSON.parse(this.responseText).people[i].id;
	   		
	   		var personView = Ti.UI.createView({top: i*40, id: JSON.parse(this.responseText).people[i].id});
	   
	   		var label=Ti.UI.createLabel({text: JSON.parse(this.responseText).people[i].name, id: 'name', color: 'white', top: 10 });
			
			//if(face != null){
	    	//	var face = Ti.UI.createImageView({image: JSON.parse(this.responseText).people[i].presentation_picture.url });
	    	//} else {
	    		// var face = Ti.UI.createImageView({image: '/person.png', top: 30+i, borderRadius: 50, borderWidth : "3", borderColor : 'white', width: 100, height: 100});
	    		var face = Ti.UI.createImageView({image: '/person.png', top: 30+i, width: 40, height: 40, borderRadius:20});
	    	//}
	    	
	    	personView.addEventListener('click', function(e){
	    			profilemodal(this.id);
	    			console.log("gaja a passar para modal: " + persons_id);
	    	});
	    			
	    	personView.add(face);
	    	personView.add(label);
	    	$.radar.add(personView);
	    	
	      }
	    },
	    // function called when an error occurs, including a timeout
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

function profilemodal(userid){
	
	var userNumber = userid;
	console.log(userNumber + ' este e o user');
	
	var profilewin=Alloy.createController('profilemodal', {userId: userNumber}).getView();

	
	profilewin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	
	$.index.close();
}


	//WEBSOCKETS
	uri = 'ws://tangifyapp.com:81';
	Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();
		
	Alloy.Globals.WS.addEventListener('open', function () {
		Ti.API.info('websocket opened');
		Alloy.Globals.WS.send(JSON.stringify(["connect",{"user":"a@a.com","auth_token":Alloy.Globals.auth_token}]));
		sendKeepAlives();
	});
		
	Alloy.Globals.WS.addEventListener('close', function (ev) {
		Ti.API.info(ev);
	});
		
	Alloy.Globals.WS.addEventListener('error', function (ev) {
		Ti.API.info(ev);
	});

	Alloy.Globals.WS.addEventListener('message', function (ev) {
		Ti.App.fireEvent("app:messageReceived", {
       		e : ev
    	});
	});
	
function loadData(e){	
	$.user_name.text = Alloy.Globals.user_name;
	$.birthdate.text = Alloy.Globals.birthdate;
	$.short_description.text = Alloy.Globals.short_description;
}

	Alloy.Globals.WS.open(uri);
	//Meter esta num ponto inicial

	function sendKeepAlives(){
		//if (WS && WS.readyState == WebSocket.OPEN){
			// Send a ping to avoid TCP timeout.
        	Alloy.Globals.WS.send(JSON.stringify(["ping"])); 
		//}
    	setTimeout("sendKeepAlives();", 30000);
	}
	
	

Alloy.Globals.tabgroup = $.index;
var win=Alloy.createController('login').getView();
win.addEventListener('open', loadData);

win.open({transition : Ti.UI.iPhone.AnimationStyle.NONE});






