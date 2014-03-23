function goback(e) {
	var win=Alloy.createController('index').getView();
	win.open();
}

function editProfile(e) {
	var url = mainserver + "/users/"+user_id+"/edit?format=json" + 'auth_token=' + Alloy.Globals.auth_token ;
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        alert('Profile updated!');
	        
	    },
	    onerror : function(e) {
	        alert('error' + e);
	        console.log(e);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		'name': $.name.value,
		'email': $.email.value.toLowerCase(),
		'short_description': $.short_description.value,
		'password' : $.password.value ,
		'password_confirmation' : $.password_confirmation.value
	};
	auth_token = null;
	client.open("POST", url);
	
	client.send(params);
}		