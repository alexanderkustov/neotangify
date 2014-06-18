function register(e){
	
	var url = mainserver + "/auth/identity/register?format=json";
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        alert('success');
	        
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('error' + e);
	        console.log(e);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'name': $.name.value,
		'email': $.email.value.toLowerCase(),
		'password' : $.password.value ,
		'password_confirmation' : $.password_confirmation.value
	};
	auth_token = null;
	client.open("POST", url);
	
	client.send(params);
	        		
}

function goback(e){
	var win=Alloy.createController('login').getView();
	win.open();
}