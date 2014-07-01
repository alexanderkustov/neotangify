var selected_friend;

function getFriends(e){
    var url = mainserver + '/friendships.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
    console.log(url);
    
    var client = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload : function(e) {
            Ti.API.info("Get friends : " + this.responseText);
            var parsedText = JSON.parse(this.responseText).friends;

            for(var i=0; i < parsedText.length; i ++){

            	addFriendToTable(parsedText[i].id, parsedText[i].name, "Last");
                
            }
                  
        },
        onerror : function(e) {
           alert('error' + e);
           Ti.API.info("get friends error: " + this.responseText);
    },
    timeout : 60 * 1000
    });

    client.open("GET", url);
    client.send();  
}

function addFriendToTable(friend_id, friend_name, position){

 var row = Ti.UI.createTableViewRow({
        className          : "friend_row",
        color:'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
        id     : friend_id,
       

    });

 var imageAvatar = Ti.UI.createImageView({
        image: 'person.png',
        left:5, top:5,
        width:45, height:45,
        borderColor: '#fff',
        borderRadius: 20,
        borderWidth: 1
    });

row.add(imageAvatar);

var label = Ti.UI.createLabel({
        text   : friend_name,
        height : (OS_ANDROID) ? '50dp' : 'auto',
        id     : friend_id,
        width  : 'auto',
        color  : "#fff",
        left   : 60,
        font   : {
            fontSize : (OS_ANDROID) ? '19dp' : 14,
            fontWeight: (OS_ANDROID) ? 'bold' : 'normal'
        }
    });

  
    row.add(label);

     if (position == "First") {
        $.friendsTable.insertRowBefore(0, row);
    }else{
        $.friendsTable.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
        // scroll
    }
   
}


function openChat(friend_id){
   
    Ti.App.SelectedFriend = friend_id;   
    var win=Alloy.createController('chatWindow').getView();
    win.open();
}

$.chatFriends.addEventListener('focus', function() {
    var rd = []; 
    $.friendsTable.data = rd;
    getFriends();
});

$.friendsTable.addEventListener('click', function(e) {
  Ti.API.info('row clicked: ' + e.rowData.id + " index : "  + e.index + " texto: " + e.rowData.text);
  openChat(e.rowData.id);
});

//$.friendsTable.addEventListener('click', selectRow);

// appendChatMessage("Hello");
// getConversationWith(4);
