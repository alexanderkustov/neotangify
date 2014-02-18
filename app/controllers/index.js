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
	        alert('success ' + JSON.parse(this.responseText).user.auth_token);
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
	    	
	    	$.activityfeed.text = this.responseText;
	       
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

$.index.open();
