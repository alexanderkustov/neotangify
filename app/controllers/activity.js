function acceptFriendship(friend_id){
    var url = mainserver + '/friendship_accept.json?friend_id=' + friend_id +  '&auth_token=' + Alloy.Globals.auth_token ;
    console.log(url);
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            Ti.API.info("Received text: " + this.responseText);
            alert('Success,you are no longer alone!');
            
        },
        onerror : function(e) {
            alert('error' + JSON.stringify(e));
            console.log(e);
        },
        timeout : 60 * 1000
    });
    

    client.open("POST", url);
    client.send(); 
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
	    			if(parsedText[i].subject.friend.presentation_picture != null){
						friend_image = mainserver +  parsedText[i].subject.friend.presentation_picture;
						console.log(friend_image);
					}else{
						friend_image = "person.png";
					}
	    		
	    			console.log(friend_image);
					
	    			//var obj = parsedText[i];
	    			switch(parsedText[i].name){
    					case 'friend_request_accepted':
    					
                            if(parsedText[i].read == false)
                            	if(parsedText[i].direction === 'from'){
    								addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id, parsedText[i].id, "accepted", friend_image);
    								}else{
    								addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name,  "Last", parsedText[i].subject.friend.id, parsedText[i].id, "accepted", friend_image);

    								}
    					break;
                        case 'friend_request_received':
                            if(parsedText[i].read == false)
                            	if(parsedText[i].direction === 'from'){
                                addActivitiesToTable(
                                	parsedText[i].subject.friend.name,
                                	parsedText[i].subject.user.name,
                                	"Last",
                                	parsedText[i].subject.user.id,
                                	parsedText[i].id,
                                	"recieved",
                                	friend_image);
                               }
                               else{
                               	addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name,  "Last", parsedText[i].subject.user.id, parsedText[i].id, "recieved", friend_image);
                               }
                               console.log(parsedText[i].subject.friend.id + " : " + parsedText[i].subject.user.id);
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

function addActivitiesToTable(user_name, friend_name, position, friend_id, activity_id, type, friend_image){

 var row = Ti.UI.createTableViewRow({
        className : "activity_row",
        color:'white',
        rowID: friend_id,
        height: 70,
        backgroundColor: 'transparent',
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
    });

    var imageAvatar = Ti.UI.createButton({
        backgroundImage: friend_image,
        left:5, top:5,
        id: friend_id,
        width:45, height:45,
        borderColor: '#fff',
        borderRadius: 20,
        borderWidth: 1
    });
    
    imageAvatar.addEventListener('click',function(e){
      profilemodal(this.id);
    });
    
function profilemodal(userid){	
	console.log(userid + ' este e o user');
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();
	profilewin.open();
}
    row.add(imageAvatar);
    
    var label = Ti.UI.createLabel({
            text   : "Request " + type +" "+ friend_name,
            height : (OS_ANDROID) ? '50dp' : 'auto',
            width  : 'auto',
            left: 55,
            top: 15,
            color  : "#fff",
            font   : {
            	fontSize : (OS_ANDROID) ? '15dp' : 14,
            }
    });

    var readButton = Ti.UI.createButton({
        title: 'Ignore' ,
        color: '#fff',
        id: activity_id,
        top: 30, right: 0, 
        
    });
    
    var acceptButton = Ti.UI.createButton({
        title: 'Accept' ,
        color: '#fff',
        id: friend_id,
        top: 30, right: 50, 
   
    });
  
    row.add(label);
    if(type === "recieved"){
        row.add(acceptButton);
    }
    row.add(readButton);

    readButton.addEventListener('click',function(e){
        Ti.API.info("You marking this as read: " + this.id);
        markAsRead(this.id);
    });
    
    acceptButton.addEventListener('click',function(e){
        Ti.API.info("You accepting this friend request: " + this.id);
        acceptFriendship(this.id);
    });

     if(position == "First") {
        $.activityTable.insertRowBefore(0, row);
    }else{
        $.activityTable.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
    }

}

function markAsRead(activity_id){
   
    var url = mainserver + '/read_activity.json?activity_id=' + activity_id +  '&auth_token=' + Alloy.Globals.auth_token ;
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            Ti.API.info("Received text: " + this.responseText); 
            getActivityFeed();  
        },
        onerror : function(e) {
            alert('error' + e);
            console.log(e);
        },
        timeout : 60 * 1000
    });
    
            var params = {
        	'activity': { 
            	'read': "true"
            	}
            };

    client.open("POST", url);
    client.send(params); 
    
}

$.activityWindow.addEventListener('focus', activityListener = function() {
    getActivityFeed();
    $.activityWindow.removeEventListener('focus', activityListener);
    activityListener = null;
});
