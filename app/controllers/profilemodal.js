var current_user_id;

function sendMsg(e){
	Ti.App.SelectedFriend = current_user_id;   
    	var win=Alloy.createController('chatWindow').getView();
    	win.open();
}

function addFriend(e){
	console.log("friends are magical");
	//starting to send out the auth
	var url = mainserver + "/friendships.json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	console.log("enviado para o :" + current_user_id);
	    	alert('Friend Request Sent!');
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        alert('Error, try again!');
	      	Ti.API.info("url: " +  url + " error: " + JSON.stringify(e) );
    },
   		timeout : 60 * 1000
	});
	
	var params = {
		'friend_id' : current_user_id , 
	    "format" : "json"  
	};
	
	client.open("POST", url);
	client.send(params);
}

function goback(e) {
	$.win_profilemodal.close();
    $.win_profilemodal = null;
}

function getFriend(userid){
	var url = mainserver + '/users/' + userid + '.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("pessoa selecionada: " + this.responseText);
	    	//$.profilewin.profile_name.text = 'lol';
	    	console.log('pesosa nome: ' + JSON.parse(this.responseText).user.name);
	    	current_user_id = JSON.parse(this.responseText).user.id;
	    	$.profile_name.user_name = JSON.parse(this.responseText).user.name;
	    	$.profile_name.short_description = JSON.parse(this.responseText).user.short_description;
	    	$.profile_name.cover_picture = mainserver + JSON.parse(this.responseText).user.cover_picture.url;
			$.profile_name.person_picture = mainserver + JSON.parse(this.responseText).user.presentation_picture.url;

			
	    },
	    onerror : function(e) {
	       alert('error' + e);
	       Ti.API.info("Erro: " + this.responseText);
    },
   		timeout : 60 * 1000
	});

	client.open('GET', url);
	client.send();
}
	
var args = arguments[0] || {};

console.log('About to get user with id ' + args.userId);
getFriend(args.userId);

/*
$.bb1.addEventListener('click', function(e){
    console.log(e.index);
    if(e.index=1){
    	addFriend();
    } 
   else{
    	sendMsg();
    }
});
*/