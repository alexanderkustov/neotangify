var current_page = 1;

Ti.App.addEventListener("app:messageReceived", function(e) {
    // e.data...
    messageRoute(e);
    // var row = Ti.UI.createTableViewRow({
    //     title: e.title, 
    //     otherAttribute: e.otherAttribute
    // });
    // // Now append it to the table
    // $.basketTable.append(row);
});

// Listen for Return Key Press
$.textChat.addEventListener( 'return', function(e) {
    appendChatMessage($.textChat.value, "Last");
    sendMessage($.textChat.value);
    $.textChat.value = "";
    //$.textChat.focus();
});

function messageRoute(e) {
    console.log(e);
    message = JSON.parse(e.e.data);
    var event = message[0];
    console.log(event);
    var data = message[1];
    // console.log("Event " + event);  
    console.log("Data" + JSON.stringify(data));
    switch(event){
    case 'message':
        console.log("Message Received");
        // console.log(data);
        // ("<div class=\"chat_message\">"+"From: "+ data.sender.name+ " To: "+ data.receiver.name + " -> "+
        //     sanitize(Base64.decode(data.text))+"</div>", "Last");
        text = data.sender.name + ": " + Base64.decode(data.text);
        appendChatMessage(text, "Last");
        break;
    case 'conversation_with':
        console.log("Conversation With... Received");
        for (var i = 0; i < data.length; i++) {
            // chatView.add("<div class=\"chat_message\">"+
            //     "From: "+ data[i]['sender']['name']+ " To: "+ data[i]['receiver']['name'] + " -> "+
            //     sanitize(data[i]['text'])+"</div>", "First");
            text = data.sender.name + ": " + Base64.decode(data.text);
            appendChatMessage(text, "First");
        };
        break;
    case 'auth_response':
        if (message[1]['data'] == 'authentication_success') {
            // getConversationWith(4);
            console.log("Authentication Success Received");
        }else{
            console.log("Authentication Failed Received");    
        }
        break;
    case 'pong':
        console.log("Pong Received");
        break;
    case 'connection_success':
        console.log("Connection Success Received");
        break;
    default:
        console.log("WTF is this?");
    }
}

function getConversationWith(friend_id){
    // console.log(Ti.App.Properties.setString('saved_login'));
    // console.log(Alloy.Globals.auth_token);
    // console.log(friend_id);
    // console.log(current_page);
    Alloy.Globals.WS.send(JSON.stringify(["get_conversation_with",{"user": "a@a.com","auth_token": Alloy.Globals.auth_token, "friend_id": 16, "page":1}]));
}

function getMoreConversationWith(friend_id){
    current_page++;
    getConversationWith(friend_id);
}

function sendMsg(e){
		
		// *
		// var message = $.textChat.value;
		
		// var chatMsg = Ti.UI.createLabel({
		//   color: '#ffffff',
		//   font: { fontSize:14 },
		//   text: Alloy.Globals.user_name + ":" + message,
		//   top: 25,
		//   width: Ti.UI.SIZE, height: Ti.UI.SIZE
		// });
				
		// if (message!=''){
	 //    	Alloy.Globals.WS.send(JSON.stringify(["message",{"from":"eu","to":"Outro","message":Base64.encode(message)}]));        
		// }
		// //por o display chat msg com o nome atras, nao funciona
		// //display_chatMsg = Alloy.Globals.user_name + ' ' + chatMsg;
		// $.chatArea.add(chatMsg);
		// $.textChat.value="";
		
		// *
	appendChatMessage($.textChat.value);
    sendMessage($.textChat.value);
    $.textChat.value="";
    //$.textChat.focus();
}


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
    Alloy.Globals.WS.send(JSON.stringify(["message",{"user": "a@a.com", "auth_token": Alloy.Globals.auth_token, "receiver_id": 16,"message": Base64.encode(message)}]));
        
	// $.chatArea.add(chatMsg);
	// $.textChat.value="";
}

function appendChatMessage(message, position){
    var row = Ti.UI.createTableViewRow({
        className          : "chat_message",
        color:'white',
    	backgroundColor: 'transparent'

    });

    var imageAvatar = Ti.UI.createImageView({
        image: 'profile.png',
        left:5, top:5,
        width:45, height:45,
        borderColor: '#fff',
        borderRadius: 20,
        borderWidth: 1
    });
    row.add(imageAvatar);

    var label = Ti.UI.createLabel({
        text   : message || "no-message",
        height : (OS_ANDROID) ? '50dp' : 'auto',
        width  : 'auto',
        color  : "#fff",
        left   : 50,
        font   : {
            fontSize : (OS_ANDROID) ? '19dp' : 14,
            fontWeight: (OS_ANDROID) ? 'bold' : 'normal'
        }
    });

    row.add(label);
    
    //$.chatArea.insertRowAfter( 0, row );
    if (position == "First") {
        $.chatArea.insertRowBefore(0, row);
    }else{
        $.chatArea.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
        // scroll
    }
    //$.chatArea.scrollToIndex($.chatArea.data[0].length);
    //$.chatArea.scrollToIndex(11);
}

// $.chatArea.addEventListener('open', function(e) { 
//     getConversationWith("4");
// })
function conversation(e) {
    getConversationWith(16);
}
// appendChatMessage("Hello");
// getConversationWith(4);
