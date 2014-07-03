var current_page = 1;
var friend_pic = Ti.App.FriendPicture;
var friend_id = Ti.App.SelectedFriend;

Ti.App.addEventListener("app:messageReceived", function(e) {
   
    messageRoute(e);
    
});


$.textChat.addEventListener( 'return', function(e) {
	if ($.textChat.value == '') {
		console.log("Está vazio");
	} else{
		appendChatMessage( Alloy.Globals.user_name + ": " +  $.textChat.value, "Last", true);
    	sendMessage($.textChat.value, friend_id );
    	$.textChat.value = "";	
	}; 
   
});

function goback(e) {
   
    if ($.chatArea.children) {
        for (var c = $.chatArea.children.length - 1; c >= 0; c--) {
            $.chatArea.remove($.chatArea.children[c]);
            $.chatArea.children[c] = null;
        }
    }
    $.chatArea.data = null;
    
    $.win_chat.close();
    $.win_chat = null;
}


$.win_chat.addEventListener('close', function() {
    console.log("Yeah im closing, clean some shit");
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
        appendChatMessage(text, "Last",false);
        break;
    case 'conversation_with':
        console.log("Conversation With... Received");
        appendChatConversation(data);
        // for (var i = 0; i < data.length; i++) {
            // // chatView.add("<div class=\"chat_message\">"+
            // //     "From: "+ data[i]['sender']['name']+ " To: "+ data[i]['receiver']['name'] + " -> "+
            // //     sanitize(data[i]['text'])+"</div>", "First");
            // text = data[i].sender.name + ": " + (data[i].text);
            // appendChatMessage(text, "First");
            // //Mudar aqui 
        // };
        break;
    case 'auth_response':
        if (message[1]['data'] == 'authentication_success') {
            // getConversationWith(4);
            console.log("Authentication Success Received");
            getConversationWith(friend_id);
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
    console.log('Lets send request for conversation with ... ');
    Alloy.Globals.WS.send(
    	JSON.stringify(["get_conversation_with",{
    		"user": Alloy.Globals.user_email,
    	"auth_token": Alloy.Globals.auth_token,
    	 "friend_id": friend_id,
    	 "page":1}]));
}

function getMoreConversationWith(friend_id){
    current_page++;
    getConversationWith(friend_id);
}

function sendMsg(){
        
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
     //     Alloy.Globals.WS.send(JSON.stringify(["message",{"from":"eu","to":"Outro","message":Base64.encode(message)}]));        
        // }
        // //por o display chat msg com o nome atras, nao funciona
        // //display_chatMsg = Alloy.Globals.user_name + ' ' + chatMsg;
        // $.chatArea.add(chatMsg);
        // $.textChat.value="";
        
        // *

	if ($.textChat.value == '') {
		console.log("está vazio");
	} else{
		appendChatMessage($.textChat.value, true);
    	sendMessage($.textChat.value, friend_id);
    	$.textChat.value="";	
	};
    
    //$.textChat.focus();
}


function sendMessage(message, friend_id){
    if (!message) return;

    // var message = $.textChat.value;
    // var chatMsg = Ti.UI.createLabel({
    //   color: '#ffffff',
    //   font: { fontSize:14 },
    //   text: Alloy.Globals.user_name + ":" + message,
    //   top: 25,
    //   width: Ti.UI.SIZE, height: Ti.UI.SIZE
    // });

    Ti.API.info("Message sent: " + Base64.encode(message) + " friend_id: " + friend_id + " auth_token" + Alloy.Globals.auth_token); 
    Alloy.Globals.WS.send(JSON.stringify(["message",{
    	"user": Alloy.Globals.user_email, 
    	"auth_token": Alloy.Globals.auth_token, 
    	"receiver_id": friend_id,
    	"message": Base64.encode(message)}]));
        
    // $.chatArea.add(chatMsg);
    // $.textChat.value="";
}

function appendChatMessage(message, position, is_sender){
    var row = Ti.UI.createTableViewRow({
        className          : "chat_message",
        color:'white',
        selecttionStyle: 'none',
         separatorColor: 'transparent',
   		 backgroundColor:' rgba(0,0,0,0.2)'
    });
    
    var imageAvatar = Ti.UI.createButton({
        backgroundImage: 'person.png',
        backgroundSelectedImage:'person.png',
        left:5, top:5,
        id: friend_id,
        width:45, height:45,
        borderColor: '#fff',
        borderRadius: 20,
        borderWidth: 1
    });

    if(Alloy.Globals.user_pic != null)
            imageAvatar.image = mainserver + Alloy.Globals.user_pic;
    if(friend_pic != null && !is_sender)	
     	imageAvatar.image = friend_pic;
        
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
    //    $.chatArea.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
		//Catch 22. chatArea.data -> matriz de sections. Depois de introduzirmos a primeira row, ficamos com data[0].rows[]     
       if ($.chatArea.data.length == 0) {
       		$.chatArea.appendRow(row);
       } else{
       		$.chatArea.insertRowBefore(0, row);
			//Será chato quando se pede mais conversa ele vir para baixo? Ainda se pode corrigir.        		
       		$.chatArea.scrollToIndex($.chatArea.data[0].rows.length-1);
       };
       

    }else{
       	// $.chatArea.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
       	$.chatArea.appendRow(row);
       	$.chatArea.scrollToIndex($.chatArea.data[0].rows.length-1);
        // scroll
    }
    row = null;
    imageAvatar = null;
    label = null;
    //$.chatArea.scrollToIndex($.chatArea.data[0].length);
    //$.chatArea.scrollToIndex(11);
}

function appendChatConversation(data, is_sender){
	var rows = [];
	for (var i = data.length-1; i >= 0; i--) {
        text = data[i].sender.name + ": " + (data[i].text);
    	
    	var row = Ti.UI.createTableViewRow({
	        className: "chat_message",
	        color:'white',
	        backgroundColor: 'transparent',
	        selecttionStyle: 'none'
	    }); 
	    
	   
	    
	    var imageAvatar = Ti.UI.createButton({
	        backgroundImage: 'person.png',
	        id: "cover_picture",
	        backgroundSelectedImage:'person.png',
	        left:5, top:5,
	        id: friend_id,
	        width:45, height:45,
	        borderColor: '#fff',
	        borderRadius: 20,
	        borderWidth: 1
	    });
	    
	    if(Alloy.Globals.user_pic != null)
            imageAvatar.image = mainserver + Alloy.Globals.user_pic;
    if(friend_pic != null && !is_sender)	
     	imageAvatar.image = friend_pic;
		
		if(Alloy.Globals.user_pic != null)
			if(data[i].sender.id == Alloy.Globals.user_id)
           		 imageAvatar.image = mainserver + Alloy.Globals.user_pic;
           	 else{
           	 	
           	 }
        
		
	    row.add(imageAvatar);
		

			
	    var label = Ti.UI.createLabel({
	        text   : text || "no-message",
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
    	rows.push(row);
    	row=null;
    	imageAvatar = null;
    	label = null;
    };
    $.chatArea.data=rows;
    $.chatArea.scrollToIndex($.chatArea.data[0].rows.length-1);
    rows=null;
}

//setInterval(function(){geolocate();},35000);
$.win_chat.addEventListener('focus', chatFocusListener = function() {
    Alloy.Globals.WS.startWebsocket();
    //Antes
	getConversationWith(friend_id);

    // $.win_chat.removeEventListener('focus', chatFocusListener);
    // chatFocusListener = null;
});