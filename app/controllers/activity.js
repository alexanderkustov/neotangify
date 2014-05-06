function getActivityFeed(e){
	var url = mainserver + '/activities.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	Ti.API.info("Get feed text: " + this.responseText);
	    	
	    	var parsedText = JSON.parse(this.responseText).activities;
	    	
	    	for(var i=0; i < parsedText.length; i ++)
	    		{
	    			

	    			//var obj = parsedText[i];
	    			switch(parsedText[i].subject_type){
    					case 'Friendship':

    							addActivitiesToTable(parsedText[i].name ,parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last");
   						
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


function addActivitiesToTable(activity_name, user_name, friend_name, position){

 var row = Ti.UI.createTableViewRow({
        className          : "activity_row",
        color:'white',
        backgroundColor: 'transparent'
       

    });

 var label = Ti.UI.createLabel({
        text   : activity_name + " : " + user_name + " : " + friend_name,
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

     if (position == "First") {
        $.activityTable.insertRowBefore(0, row);
    }else{
        $.activityTable.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
        
    }
   
}

$.activityTable.addEventListener('focus', function() {
    var rd = []; 
    $.activityTable.data = rd;
    getActivityFeed();
});


$.activityTable.addEventListener('click', function(e) {
   var dialog = Ti.UI.createAlertDialog({
    message: 'Accept Friend Request',
    ok: 'Yes',
    title: 'Friend Request'
  }).show();


   var dialog = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Confirm', 'Cancel'],
    message: 'Accept Friendship?',
    title: 'Friend Request'
  });
  dialog.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      Ti.API.info('The cancel button was clicked');
    }
    Ti.API.info('e.cancel: ' + e.cancel);
    Ti.API.info('e.source.cancel: ' + e.source.cancel);
    Ti.API.info('e.index: ' + e.index);
  });
  dialog.show();

});