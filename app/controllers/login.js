function openRegister(e){
	var win=Alloy.createController('register').getView();
	
	win.open();
}

function login(e)
{
	//starting to send out the auth
	var url = "http://localhost:3000/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({
	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	      	$.index.setActiveTab(2);
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
	            
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('error' + e);
	        TI.API.info("error" + e);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'auth_key': $.login.value,
		'password' : $.password.value ,
	    "Login" :"", 
	    "provider":"identity"
	};

	
	client.open("POST", url);
	client.send(params);  
}