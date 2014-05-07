function acceptFriendship(friend_id){
    var url = mainserver + '/friendships.json?' + friend_id +  '&auth_token=' + Alloy.Globals.auth_token ;
    
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            Ti.API.info("Received text: " + this.responseText);
            alert('Success, are no longer forever alone!');
            
        },
        onerror : function(e) {
            alert('error' + e);
            console.log(e);
        },
        timeout : 60 * 1000
    });
    
    var params = {'format': "json"};

    client.open("POST", url);
    client.send(params); 
}


function getActivityFeed(e){
	var url = mainserver + '/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);

    var rd = []; 
    $.activityTable.data = rd;
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get feed text: " + this.responseText);
	    	
	    	var parsedText = JSON.parse(this.responseText).activities;
	    	
	    	for(var i=0; i < parsedText.length; i ++)
	    		{
	    			//var obj = parsedText[i];
	    			switch(parsedText[i].name){
    					case 'friend_request_accepted':
                            if(parsedText[i].read == false)
    							addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id);
    					break;
                        
                        case 'friend_request_recieved':
                                addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id);
                        break;

    					default:
    						console.log("default feed stuff");


    					}
	    	 }
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	       alert('error' + e);
	       Ti.API.info("get feed error: " + this.responseText);
    },
    timeout : 60 * 1000
	});
	
	var params = {
		//'auth_key': Alloy.Globals.auth_token,
		'format': "json"
	};

	client.open("GET", url);
	client.send(params);  
}


function addActivitiesToTable(user_name, friend_name, position, friend_id){

 var row = Ti.UI.createTableViewRow({
        className : "activity_row",
        color:'white',
        rowID: friend_id,
        backgroundColor: 'transparent',
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE

    });

    var imageAvatar = Ti.UI.createButton({
        backgroundImage: 'profile.png',
        backgroundSelectedImage:'profile.png',
        left:5, top:5,
        id: friend_id,
        width:45, height:45,
        borderColor: '#fff',
        borderRadius: 20,
        borderWidth: 1
    });

    imageAvatar.addEventListener('click',function(e){
        Ti.API.info("You clicked the guy: " + this.id);
        profilemodal(this.id);
    });

    row.add(imageAvatar);
    
    var label = Ti.UI.createLabel({
            text   : "You've accepted " + friend_name,
            height : (OS_ANDROID) ? '50dp' : 'auto',
            width  : 'auto',
            color  : "#fff",
            font   : {
                fontSize : (OS_ANDROID) ? '19dp' : 14,
                fontWeight: (OS_ANDROID) ? 'bold' : 'normal'
            }
    });

    var readButton = Ti.UI.createButton({
        title: '✖',
        color: '#ff0000',
        top: 10, right: 0, 
        width: 20, height: 50
    });

    var acceptButton = Ti.UI.createButton({
        title: '✓',
        color: '#00ff00',
        top: 10, right: 30, 
        width: 20, height: 50
    });
  
    row.add(label);
    row.add(acceptButton);
    row.add(readButton);

     if(position == "First") {
        $.activityTable.insertRowBefore(0, row);
    }else{
        $.activityTable.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
    }

}


function profilemodal(userid){  
    var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();
    profilewin.open();
}

$.activityWindow.addEventListener('focus', function() {
    getActivityFeed();
});


