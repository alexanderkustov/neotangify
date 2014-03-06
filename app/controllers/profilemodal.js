

function addFriend(e){
	console.log("friends are magical");
}

function getFriend(userid){

	var url = mainserver + '/users/' + userid + '.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("pessoa selecionada: " + this.responseText);
	    	//$.profilewin.profile_name.text = 'lol';
	    	console.log('pesosa nome: ' + JSON.parse(this.responseText).user.name);
	    	
	    	 $.profile_name.text = JSON.parse(this.responseText).user.name;
			
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
	
var userid = arguments[0] || {};

console.log(userid.args1 + ' arguments:  ' + arguments[0]);
getFriend(userid.args1);

