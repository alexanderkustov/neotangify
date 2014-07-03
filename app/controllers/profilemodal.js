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
	$.win_profilemodal.remove($.cover_picture);
	$.win_profilemodal.remove($.person_picture);
	if ($.win_profilemodal.children) {
        for (var c = $.win_profilemodal.children.length - 1; c >= 0; c--) {
            $.win_profilemodal.remove($.win_profilemodal.children[c]);
            $.win_profilemodal.children[c] = null;
        }
    }
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
	    	console.log('pesosa nome: ' + JSON.parse(this.responseText));
	    	current_user_id = JSON.parse(this.responseText).user.id;
	    	$.user_name.text = JSON.parse(this.responseText).user.name;
	    	$.short_description.text = JSON.parse(this.responseText).user.short_description;
	    	
	    	if(JSON.parse(this.responseText).user.presentation_picture.thumb.url != null)
			$.person_picture.image = mainserver + JSON.parse(this.responseText).user.presentation_picture.thumb.url;
	
			if(JSON.parse(this.responseText).user.cover_picture.small.url != null)
	    	$.cover_picture.image = mainserver + JSON.parse(this.responseText).user.cover_picture.small.url;
			console.log($.profile_name.person_picture);
			
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