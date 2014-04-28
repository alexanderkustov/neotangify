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
    appendChatMessage($.textChat.value);
    sendMessage($.textChat.value);
    $.textChat.value = "";
    //$.textChat.focus();
});

function messageRoute(e) {
    message = JSON.parse(e.data);
    var event = message[0];
    var data = message[1];
    // console.log("Event " + event);  
    console.log("Data" + JSON.stringify(data));
    switch(event){
    case 'message':
        console.log("Message Received");
        // console.log(data);
        // chatView.add("<div class=\"chat_message\">"+"From: "+ data.sender.name+ " To: "+ data.receiver.name + " -> "+
        //     sanitize(Base64.decode(data.text))+"</div>", "Last");
        appendChatMessage("message", "Last")
        break;
    case 'conversation_with':
        console.log("Conversation With... Received");
        for (var i = 0; i < data.length; i++) {
            // chatView.add("<div class=\"chat_message\">"+
            //     "From: "+ data[i]['sender']['name']+ " To: "+ data[i]['receiver']['name'] + " -> "+
            //     sanitize(data[i]['text'])+"</div>", "First");
            appendChatMessage("message", "First")
        };
        break;
    case 'auth_response':
        if (message[1]['data'] == 'authentication_success') {
            getConversationWith(receiverId);
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
    ws.send(JSON.stringify(["get_conversation_with",{
        "user": Ti.App.Properties.setString('saved_login'),
        "auth_token": Alloy.Globals.auth_token, 
        "friend_id": friend_id, 
        "page":current_page
    }]));
}

function getMoreConversationWith(friend_id){
    current_page++;
    getConversationWith(friend_id);
}

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
    Alloy.Globals.WS.send(JSON.stringify(["message",{
            "user": Ti.App.Properties.setString('saved_login'), 
            "auth_token": Alloy.Globals.auth_token, 
            "receiver_id": "4",
            "message": Base64.encode(message)
        }]));
        
	// $.chatArea.add(chatMsg);
	// $.textChat.value="";
}

function appendChatMessage(message, position){
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


appendChatMessage("Hello");