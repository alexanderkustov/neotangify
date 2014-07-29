function login(e)
{
	//starting to send out the auth
	var url = mainserver + "/auth/identity/callback?format=json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	 
	  	 	//fica com auth token para sempre  	 
	        
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
	       	Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.user_email = JSON.parse(this.responseText).user.email;
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 
	       	Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.thumb.url;
	       	Alloy.Globals.cover_picture = JSON.parse(this.responseText).user.cover_picture.small.url;
	       	
	       	// $.win1 = null;
	      
	    	var win=Alloy.createController('index').getView();
	    	win.open();
	      	// loginWindow.close();
	      	// loginWindow=null; n encontra assim.

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
	
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
	
function openRegister(e)
{
	$.win1 = null;
	var win=Alloy.createController('register').getView();
	win.open();
}

function facebookLogin(e){
	var response, email, birthday, name, gender, accesToken;
	var fb = require('facebook');
	
	fb.appid = 391052681038594;
	fb.permissions = ['email, public_profile, user_friends ']; 
	// Permissions your app needs
	// This property needs to be false to use the built-in iOS 6 login

if ( Ti.Platform.osname === 'android') {
       fb.forceDialogAuth = true;

    }
    else {
       fb.forceDialogAuth = false;

    }

fb.addEventListener('login', function(e) {
    if (e.success) {
        fb.requestWithGraphPath('me', {}, 'GET', function(e) {
	            if (e.success) {
	                //alert(e.result);
	                response = JSON.parse(e.result);
	                email = response.email;
	                birthday = response.birthday;
	                name = response.name;
	                gender = response.gender;
	                
	                accesToken = fb.getAccessToken();
	                console.log(name+' '+email+' '+gender + ' '+ getAge(birthday) + ' ' +  accesToken);
	               	facebookToApp(accesToken);
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

if (!fb.loggedIn) {
    fb.authorize();
    	               	facebookToApp(accesToken);

}

}




function facebookToApp(accesToken){
	
	var urlFace = "http://tangifyapp.com/authenticate?graph=true&access_token="+ accesToken +"&format=json";
	

	console.log(urlFace);
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	
	    	 Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
	       	Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.user_email = JSON.parse(this.responseText).user.email;
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 
	       	Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.thumb.url;
	       	Alloy.Globals.cover_picture = JSON.parse(this.responseText).user.cover_picture.small.url;
	    	
	    	var win=Alloy.createController('index').getView();
	    	win.open();
	    },
	    onerror : function(e) {
	        alert('Error, try again!');
	      	Ti.API.info(" error: " + JSON.stringify(e) );
    },
   		timeout : 60 * 1000
	});

 client.open("POST", urlFace);
 client.send();
	
}

