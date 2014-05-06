var selected_friend;

function getFriends(e){
    var url = mainserver + '/friendships.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
    console.log(url);
    
    var client = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload : function(e) {
            Ti.API.info("Get friends : " + this.responseText);
            var parsedText = JSON.parse(this.responseText).friends;

            for(var i=0; i < parsedText.length; i ++)
                {

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
        text   : friend_name,
        height : (OS_ANDROID) ? '50dp' : 'auto',
        id     : friend_id,
        width  : 'auto',
        color  : "#fff",
        left   : 50,
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

     $.friendsTable.addEventListener('click', selectRow);

   
}

function selectRow(e) {
 var rowId = e.rowData.id;
 var myText = e.rowData.text;


alert(rowId + " " + myText);

}


function openChat(friend_id){
    selected_friend = friend_id;
    Ti.App.SelectedFriend = selected_friend;   
    var win=Alloy.createController('chatWindow').getView();
    win.open();
}

$.chatFriends.addEventListener('focus', function() {
    getFriends();
});

// appendChatMessage("Hello");
// getConversationWith(4);
