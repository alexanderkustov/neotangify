function facebookLogin(e)
{
	var fb = require('facebook');
	fb.appid = 391052681038594;
	fb.permissions = ['email, public_profile, user_friends ']; // Permissions your app needs
	fb.forceDialogAuth = true;
	fb.addEventListener('login', function(e) {
	    if (e.success) {
	         fb.requestWithGraphPath('me', {}, 'GET', function(e) {
	            if (e.success) {
	                //alert(e.result);
	                var response = JSON.parse(e.result);
	                var email = response.email;
	                var age = response.age;
	                var name = response.name;
	                var gender = response.gender;
	                alert(name+' '+email+' '+gender + ' '+age);
	                autologin(email, email);
	            } else if (e.error) {
	                alert(e.error);
	            } else {
	                alert('Unknown response');
	            }
	        });
	    } else if (e.error) {
	        alert(e.error);
	    } else if (e.cancelled) {
	        alert("Canceled");
	    }
	});
	fb.authorize();
}

function login(e)
{
	//starting to send out the auth
	var url = mainserver + "/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	 
	    	 
	  	 	//fica com auth token para sempre  	 
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token; 
	        Ti.API.info("auth token:" +  Alloy.Globals.auth_token);
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 
	       	Alloy.Globals.user_id = JSON.parse(this.responseText).user.id; 
	       	
	       	//picture issues
	       	/*
	       	if(!JSON.parse(this.responseText).user.presentation_picture.url)
	       	{
	       		console.log("PICTURE : " +  JSON.parse(this.responseText).user.presentation_picture.url);
	       		Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.url;
	       	}
	       */
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
		'auth_key': $.loginInput.value.toLowerCase(),
		'password' : $.password.value , 
	    "provider":"identity",
	    "Login": "",
	    "format" : "json"  
	};
	
	Ti.App.Properties.setString('saved_login', $.loginInput.value.toLowerCase());
	
	Ti.App.Properties.setString('saved_pw', $.password.value);
	
	Ti.API.info('The value of the stuff saved: ' + Ti.App.Properties.getString('saved_login') + " pw: " + Ti.App.Properties.getString('saved_pw'));
	
	client.open("POST", url);
	client.send(params);
}
/**
function autoLogin(user, pw){
		//starting to send out the auth
	var url = mainserver + "/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);

			
	      	//Alloy.Globals.tabgroup.setActiveTab(2);
	  	 	//fica com auth token para sempre  	 
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token; 
	        Ti.API.info("auth token:" +  Alloy.Globals.auth_token);
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 
	       	Alloy.Globals.user_id = JSON.parse(this.responseText).user.id; 
	       	

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
		'auth_key': user,
		'password' : pw , 
	    "provider":"identity",
	    "Login": "",
	    "format" : "json"  
	};
	
	//Ti.App.Properties.setString('saved_login', $.login.value.toLowerCase());
	
	//Ti.App.Properties.setString('saved_pw', $.password.value);
	
	Ti.API.info('The value of the stuff saved: ' + Ti.App.Properties.getString('saved_login') + " pw: " + Ti.App.Properties.getString('saved_pw'));
	
	client.open("POST", url);
	client.send(params);
}
*/
function openRegister(e)
{
	var win=Alloy.createController('register').getView();
	win.open();
}
