function register(e){
	
	var url = "http://localhost:3000/auth/identity/register?format=json";
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        alert('success');  
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('error' + e);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'name': $.name.value,
		'email': $.email.value,
		'password' : $.password.value ,
		'password_confirmation' : $.password_confirmation.value
	};

	// Prepare the connection
	client.setRequestHeader('enctype', 'multipart/form-data');
	
	client.open("POST", url);
	client.send(params);
	        		
}

function goBack(e){
	
	var win=Alloy.createController('index').getView();
	win.open();
	
}
