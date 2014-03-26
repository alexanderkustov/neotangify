var current_user_id;

function sendMsg(e){
	
}

function addFriend(e){
	console.log("friends are magical");
	//starting to send out the auth
	var url = mainserver + "/friendships?format=json";
	
	var client = Ti.Network.createHTTPClient({	    
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	console.log("enviado para o :" + current_user_id);
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
	var win=Alloy.createController('index').getView();
	win = Alloy.Globals.tabgroup.setActiveTab(2);
	win.open();
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
	    	 $.profile_name.title = JSON.parse(this.responseText).user.name;
			
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
