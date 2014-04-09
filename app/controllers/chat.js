function sendMsg(e){
		
		/**
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
		
		**/
	appendChatMessage($.textChat.value);
    sendMessage($.textChat.value);
    $.textChat.value="";
    $.textChat.focus();
}



// Listen for Return Key Press
$.textChat.addEventListener( 'return', function(e) {
    appendChatMessage($.textChat.value);
    sendMessage($.textChat.value);
    $.textChat.value = "";
    $.textChat.focus();
});

function sendMessage(message){
	if (!message) return;

	// var message = $.textChat.value;
	// var chatMsg = Ti.UI.createLabel({
	//   color: '#ffffff',
	//   font: { fontSize:14 },
	//   text: Alloy.Globals.user_name + ":" + message,
	//   top: 25,
	//   width: Ti.UI.SIZE, height: Ti.UI.SIZE
	// });
	Ti.API.info("Message sent: " + Base64.encode(message)); 
    Alloy.Globals.WS.send(JSON.stringify(["message",{"from":"2","to":"253","auth_token":"g2NnWq4GipQknAzHnWNh9Q","message":Base64.encode(message)}]));        
	
	// $.chatArea.add(chatMsg);
	// $.textChat.value="";
}

function appendChatMessage(message){
    var row = Ti.UI.createTableViewRow({
        className          : "chat_message",
        backgroundGradient : {
            type          : 'linear',
            colors        : [ "#fff", '#eeeeed' ],
            startPoint    : { x : 0, y : 0 },
            endPoint      : { x : 0, y : 70 },
            backFillStart : false
        }
    });

    var imageAvatar = Ti.UI.createImageView({
        image: 'profile.png',
        left:10, top:5,
        width:50, height:50,
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 3
    });
    row.add(imageAvatar);

    var label = Ti.UI.createLabel({
        text   : message || "no-message",
        height : (OS_ANDROID) ? '50dp' : 'auto',
        width  : 'auto',
        color  : "#111",
        left   : 50,
        font   : {
            fontSize : (OS_ANDROID) ? '19dp' : 14,
            fontWeight: (OS_ANDROID) ? 'bold' : 'normal'
        }
    });

    row.add(label);
    //Melhorar esta
    //$.chatArea.insertRowAfter( 0, row );
    $.chatArea.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
}

appendChatMessage("Hello");