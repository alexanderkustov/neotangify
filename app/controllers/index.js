Ti.include("base64.js");

function getActivityFeed(e){
		//starting to send out the auth
	var url = mainserver + '/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
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
	var url = mainserver + '/people_nearby?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("update radar text: " + this.responseText);
	    	Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
	   	
	   	//for das pessoas fixes
	   	
	   var person_id;
	   	
	   	for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {
	   		
	   		persons_id = JSON.parse(this.responseText).people[i].id;
	   		
			console.log("criar label" + i);
			var label=Ti.UI.createLabel({text: JSON.parse(this.responseText).people[i].name, id: 'name' });
			console.log("label criada" + i);
			$.radar.add(label);
			
			console.log("criar img" + i);
	    	if(face != null){
	    		var face = Ti.UI.createImageView({image: JSON.parse(this.responseText).people[i].presentation_picture.url });
	    	} else {
	    		var face = Ti.UI.createImageView({image: 'http://lorempixel.com/100/100/people', id: 'face'});
	    	}
	    	
	    	face.addEventListener('click', function(e){
	    			profilemodal(persons_id);
	    			console.log("gaja a passar aqui: " + persons_id);
	    		});
	    	$.radar.add(face);
	    	
	    	console.log("get radar text: " + JSON.parse(this.responseText).people[i].presentation_picture.url);
	    	
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
		'longitude' : longi,
		'format': "json"
	};
	
	client.open("GET", url);
	client.send(params);  
}

function profilemodal(userid){
	
	var userNumber = userid;
	console.log(userNumber + ' este e o user');
	
	var profilewin=Alloy.createController('profilemodal', {args1: userNumber}).getView();

	$.index.close();
	profilewin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
}


//WEBSOCKETS
	uri = 'ws://tangifyapp.com:81';
	var WS = require('net.iamyellow.tiws').createWS();
		
	WS.addEventListener('open', function () {
		Ti.API.info('websocket opened');
		WS.send(JSON.stringify(["connect",{"user":"a@a.com","auth_token":"_YW1MBm_cDBmNn985NnCdw"}]));
		sendKeepAlives();	
	});
		
	WS.addEventListener('close', function (ev) {
		Ti.API.info(ev);
	});
		
	WS.addEventListener('error', function (ev) {
		Ti.API.info(ev);
	});

	WS.addEventListener('message', function (ev) {
		//E este bocado é na função onMessage, quando recebe mensagem
		message = JSON.parse(ev.data);
		var event = message[0];
		var data = message[1];
		
		if (event=='message'){
			// Received a message for the chat room.
			console.log('From ' + data.from);
			console.log('To ' + data.to);
			console.log('Message ' + Base64.decode(data.message));
				
		}else if (event == 'pong'){
			// Received a pong
			console.log("pong");
	        return;
		}else if (event=='new_user'){
			// Received a notification that a new user has arrived.
			console.log("New user: " + data.data);
		}else if (event=='user_left'){
			// Received a notification that a user has left.
			console.log("User left: " + data.data);
		}else if (event == 'room_state'){
			// Received the current state of the chat room.
			// Currently all this has is a list of the participants.
			var names = data.data.split(',');
			console.log(names[0]);
		}
	});
	
	function sendMsg(e){
		
		var message = $.textChat.value;
	
		if (message!=''){
	    	WS.send(JSON.stringify(["message",{"from":"eu","to":"Outro","message":Base64.encode(message)}]));        
		}

	}
	
	
	WS.open(uri);
	//Meter esta num ponto inicial

	function sendKeepAlives(){
		//if (WS && WS.readyState == WebSocket.OPEN){
			// Send a ping to avoid TCP timeout.
        	WS.send(JSON.stringify(["ping"])); 
		//}
    	setTimeout("sendKeepAlives();", 30000);
	}



Alloy.Globals.tabgroup = $.index;

$.index.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});

//ver se o estado do auth_token
if(auth_token != null)
{
	console.log(auth_token);
} else {
	console.log("auth_token e null");
}
