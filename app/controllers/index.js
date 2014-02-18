
function login(e)
{
	console.log("starting to send out the auth shit");
	
	
	var url = "http://localhost:3000/auth/identity/callback?format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        alert('success ' + JSON.parse(this.responseText).user.auth_token);
	  
	        auth_token = JSON.parse(this.responseText).user.auth_token;
	       
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('error');
    },
    timeout : 60 * 1000
	});
	
	// Parameters: {""=>"alex@inspiring.pt", "password"=>"[FILTERED]", }
	 
	var params = {
		'auth_key': $.login.value,
		'password' : $.password.value ,
	    "Login" :"", 
	    "provider":"identity"
	};

	// Prepare the connection.
	client.setRequestHeader('enctype', 'multipart/form-data');
	
	client.open("POST", url);
	client.send(params);  
}

$.index.open();
