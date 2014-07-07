//autoLogin

if(Ti.App.Properties.getString('saved_login') && Ti.App.Properties.getString('saved_pw')){
	console.log("poderia ir para autologin");
		var loginWindow = Alloy.createController('loginWindow').getView();
		loginWindow.open();
	//autoLogin();
	}else{
		var loginWindow = Alloy.createController('loginWindow').getView();
		loginWindow.open();
}
//Alloy.Globals.tabgroup = $.index;
function autoLogin(e){
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
		'auth_key': Ti.App.Properties.getString('saved_login'),
		'password' : Ti.App.Properties.getString('saved_pw') , 
	    "provider":"identity",
	    "Login": "",
	    "format" : "json"  
	};
	

	Ti.API.info('The value of the stuff saved: ' + Ti.App.Properties.getString('saved_login') + " pw: " + Ti.App.Properties.getString('saved_pw'));
	
	client.open("POST", url);
	client.send(params);
}
