// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Ti.Geolocation.purpose = "Recieve User Location";

var auth_token;
var user_name, user_email, user_id, user_pic, short_description, birthdate, user_pw;
var mainserver = 'http://tangifyapp.com';

Ti.include("base64.js");

//WEBSOCKETS
uri = 'ws://tangifyapp.com:81';

// Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();	

// Alloy.Globals.WS.addEventListener('close', function (ev) {
// 	Ti.API.info(ev);
// 	// Alloy.Globals.WS.open(uri);
// });
	
// Alloy.Globals.WS.addEventListener('error', function (ev) {
// 	Ti.API.info(ev);
// 	// Alloy.Globals.WS.open(uri);
// });

// Alloy.Globals.WS.addEventListener('message', function (ev) {
// 	console.log("Message received" + ev);
// 	Ti.App.fireEvent("app:messageReceived", {
//    		e : ev
// 	});
// });

// Alloy.Globals.WS.addEventListener('open', function () {
// 	Ti.API.info('websocket opened');
// 	Alloy.Globals.WS.send(JSON.stringify(["connect",{"user":Alloy.Globals.user_email,"auth_token":Alloy.Globals.auth_token}]));
// 	// sendKeepAlives();
// 	// setInterval("sendKeepAlives();", 30000);
// });
// Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();
var initKeepAlive;

function keepAlive(){
	console.log("in keep alive outside setInterval");
	i = setInterval(function() {
		console.log("Lets send a ping");
		// Atenção null e open.
		Alloy.Globals.WS.send(JSON.stringify(["ping"]));
	}, 30000);
	return i;
};

Alloy.Globals.startWebsocket = function() {
	console.log("Im on start websocket");
	
	console.log("interval cleared?");

	// Create
	if (Alloy.Globals.WS == null) {
		Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();
	}else{
		Alloy.Globals.WS = null;
		Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();
	}
	
	// Alloy.Globals.WS = require('net.iamyellow.tiws').createWS();	

	Alloy.Globals.WS.addEventListener('close', function (ev) {
		Ti.API.info(ev);
		// Alloy.Globals.WS.open(uri);
	});
		
	Alloy.Globals.WS.addEventListener('error', function (ev) {
		Ti.API.info(ev);
		// Alloy.Globals.WS.open(uri);
	});

	Alloy.Globals.WS.addEventListener('message', function (ev) {
		console.log("Message received" + ev);
		Ti.App.fireEvent("app:messageReceived", {
	   		e : ev
		});
	});

	Alloy.Globals.WS.addEventListener('open', function () {
		Ti.API.info('websocket opened');
		Alloy.Globals.WS.send(JSON.stringify(["connect",{"user":Alloy.Globals.user_email,"auth_token":Alloy.Globals.auth_token}]));
		// sendKeepAlives();
		// setInterval("sendKeepAlives();", 30000);
	});


	// Open
	Alloy.Globals.WS.open(uri);	


	// Start keep alives
	console.log("opened");
	
	initKeepAlive = keepAlive();
};

Alloy.Globals.stopWebsocket = function() {
	clearInterval(initKeepAlive);
	initKeepAlive = null;
	Alloy.Globals.WS.close();
};

//Meter esta num ponto inicial

// function sendKeepAlives(){
// 	//if (WS && WS.readyState == WebSocket.OPEN){
// 		// Send a ping to avoid TCP timeout.
// 	console.log("Lets send a ping");
//        Alloy.Globals.WS.send(JSON.stringify(["ping"])); 
// 	//}
// }
