Ti.include("base64.js");

function getActivityFeed(e){
		//starting to send out the auth
	var url = mainserver + '/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get feed text: " + this.responseText);
	    	
	    		$.status.text = JSON.parse(this.responseText).activities;
	    	
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



//ESTA FUNCAO NAO TEM UM RETURN PARA NADA POR ISSO E PRECISO AGARRAR NA FOTO E SUBMETER PARA A BD NO FORM EM QUESTAO
function takePicture(e){
	//Create a dialog with options
var dialog = Titanium.UI.createOptionDialog({
    //title of dialog
    title: 'Choose an image source...',
    //options
    options: ['Camera','Photo Gallery', 'Cancel'],
    //index of cancel button
    cancel:2
});
 
//add event listener
dialog.addEventListener('click', function(e) {
    //if first option was selected
    if(e.index == 0)
    {
        //then we are getting image from camera
        Titanium.Media.showCamera({
            //we got something
            success:function(event)
            {
                //getting media
                var image = event.media; 
                 
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image
                    Ti.App.Properties.setString("image", image.nativePath);
                }
            },
            cancel:function()
            {
                //do somehting if user cancels operation
            },
            error:function(error)
            {
                //error happend, create alert
                var a = Titanium.UI.createAlertDialog({title:'Camera'});
                //set message
                if (error.code == Titanium.Media.NO_CAMERA)
                {
                    a.setMessage('Device does not have camera');
                }
                else
                {
                    a.setMessage('Unexpected error: ' + error.code);
                }
 
                // show alert
                a.show();
            },
            allowImageEditing:true,
            saveToPhotoGallery:true
        });
    }
    else if(e.index == 1)
    {
        //obtain an image from the gallery
        Titanium.Media.openPhotoGallery({
            success:function(event)
            {
                //getting media
                var image = event.media; 
                // set image view
                 
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image
                    Ti.App.Properties.setString("image", image.nativePath); 
                }   
            },
            cancel:function()
            {
                //user cancelled the action fron within
                //the photo gallery
            }
        });
    }
    else
    {
        //cancel was tapped
        //user opted not to choose a photo
    }
});
 
//show dialog
dialog.show();
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
	   var person_id;
	   	
	   	for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {
	   		
	   		persons_id = JSON.parse(this.responseText).people[i].id;
	   		
	   		var personView = Ti.UI.createView({top: i*40});
			var label=Ti.UI.createLabel({text: JSON.parse(this.responseText).people[i].name, id: 'name', color: 'white', top: 10 });
			
			//if(face != null){
	    	//	var face = Ti.UI.createImageView({image: JSON.parse(this.responseText).people[i].presentation_picture.url });
	    	//} else {
	    		var face = Ti.UI.createImageView({image: '/person.png', top: 30+i, borderRadius: 50, borderWidth : "3", borderColor : 'white', width: 100, height: 100});
	    	//}
	    	
	    	personView.addEventListener('click', function(e){
	    			profilemodal(persons_id);
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

	$.index.close();
	profilewin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
}


//WEBSOCKETS
	uri = 'ws://tangifyapp.com:81';
	Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();
		
	Alloy.Globals.WS.addEventListener('open', function () {
		Ti.API.info('websocket opened');
		Alloy.Globals.WS.send(JSON.stringify(["connect",{"user":"a@a.com","auth_token":"_YW1MBm_cDBmNn985NnCdw"}]));
		sendKeepAlives();	
	});
		
	Alloy.Globals.WS.addEventListener('close', function (ev) {
		Ti.API.info(ev);
	});
		
	Alloy.Globals.WS.addEventListener('error', function (ev) {
		Ti.API.info(ev);
	});

	Alloy.Globals.WS.addEventListener('message', function (ev) {
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
	
	
	
	Alloy.Globals.WS.open(uri);
	//Meter esta num ponto inicial

	function sendKeepAlives(){
		//if (WS && WS.readyState == WebSocket.OPEN){
			// Send a ping to avoid TCP timeout.
        	Alloy.Globals.WS.send(JSON.stringify(["ping"])); 
		//}
    	setTimeout("sendKeepAlives();", 30000);
	}
	
	
function loadData(e){	
	$.user_name.text = Alloy.Globals.user_name;
	$.birthdate.text = Alloy.Globals.birthdate;
	$.short_description.text = Alloy.Globals.short_description;
}


Alloy.Globals.tabgroup = $.index;
var win=Alloy.createController('login').getView();
win.addEventListener('open', loadData);

win.open({transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});






