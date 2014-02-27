function openRegister(e){
	var win=Alloy.createController('register').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
}

function login(e)
{
	//starting to send out the auth
	var url = mainserver + "/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({
		    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);

	      	Alloy.Globals.tabgroup.setActiveTab(2);
	    //fica com auth token para sempre  	 
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;    
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	    	
	        alert('error: ' + e);
	      	console.log("url: " +  url + " error: " + e);
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