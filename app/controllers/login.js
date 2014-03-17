function login(e)
{
	//starting to send out the auth
	var url = mainserver + "/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);

			
	      	//Alloy.Globals.tabgroup.setActiveTab(2);
	  	 	//fica com auth token para sempre  	 
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token; 
	        console.log(auth_token);
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 

	        var win=Alloy.createController('index').getView();
	        win.open();
			
			
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('Error, try again!');
	      	Ti.API.info("url: " +  url + " error: " + JSON.stringify(e) );
    },
   		timeout : 60 * 1000
	});
	
	var params = {
		'auth_key': $.login.value.toLowerCase(),
		'password' : $.password.value , 
	    "provider":"identity",
	    "Login": "",
	    "format" : "json"  
	};
	
	client.open("POST", url);
	client.send(params);
}

function openRegister(e)
{
	var win=Alloy.createController('register').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
}

