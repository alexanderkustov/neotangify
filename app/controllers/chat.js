function sendMsg(e){
		
		var message = $.textChat.value;
		
		var chatMsg = Ti.UI.createLabel({
		  color: '#ffffff',
		  font: { fontSize:14 },
		  text: Alloy.Globals.user_name + ":" + message,
		  top: 25,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
				
		if (message!=''){
	    	Alloy.Globals.WS.send(JSON.stringify(["message",{"from":"eu","to":"Outro","message":Base64.encode(message)}]));        
		}
		//por o display chat msg com o nome atras, nao funciona
		//display_chatMsg = Alloy.Globals.user_name + ' ' + chatMsg;
		$.chatArea.add(chatMsg);
		$.textChat.value="";
}