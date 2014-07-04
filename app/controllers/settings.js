function logout(e){
	console.log("logout");

	auth_token = null;
	$.settings = null;
	tabgroup = null;
	$.main_nav = null;
	var win=Alloy.createController('login').getView();
	win.open();
	
}

function uploadPic(e){

Titanium.Media.openPhotoGallery({
		success:function(event) {
			
			var xhr = Titanium.Network.createHTTPClient();
			xhr.onload = function(e) {
				
				//console.log(JSON.stringify(e) + e);
				Ti.UI.createAlertDialog({
				      title:'Success',
				      message:'Photo uploaded '
			    }).show();
			    
			  	
		};
		xhr.open('POST', mainserver + "/users/"+Alloy.Globals.user_id + "/picture_upload.json?" + 'auth_token=' + Alloy.Globals.auth_token );
		
		xhr.send({"picture": event.media});
		
		  
		xhr.setRequestHeader('enctype', 'multipart/form-data');
		xhr.setRequestHeader('Content-Type', 'image/png');
	}
});


}

function uploadCoverPic(e){

Titanium.Media.openPhotoGallery({
		success:function(event) {
			
			var xhr = Titanium.Network.createHTTPClient();
			xhr.onload = function(e) {
				Ti.UI.createAlertDialog({
				      title:'Success',
				      message:'Success, Photo uploaded '
			    }).show();
		};
		xhr.open('POST', mainserver + "/users/"+Alloy.Globals.user_id + "/cover_upload.json?" + 'auth_token=' + Alloy.Globals.auth_token );
		
		xhr.send({"cover": event.media});
		  
		xhr.setRequestHeader('enctype', 'multipart/form-data');
		xhr.setRequestHeader('Content-Type', 'image/png');
	}
});


}


function editProfile(e) {
	var url = mainserver + "/users/"+Alloy.Globals.user_id;
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	       
	        
	        Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
	       	Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
	       	Alloy.Globals.user_name = JSON.parse(this.responseText).user.name; 
	       	Alloy.Globals.user_email = JSON.parse(this.responseText).user.email;
	       	Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate; 
	       	Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description; 
	       	Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.thumb.url;
	       	Alloy.Globals.cover_picture = JSON.parse(this.responseText).user.cover_picture.small.url;
	        
	    },
	    onerror : function(e) {
	        alert('Error updating profile: ' + e.code);
	        console.log(e);
    },
    	timeout : 60 * 1000
	});


        var params = {
        "user":{"name":$.name.value,
            "email":$.email.value.toLowerCase(),
            "short_description":$.short_description.value,
            "password":$.password.value ,
            "password_confirmation":$.password_confirmation.value,
            //"presentation_picture":Ti.App.Properties.getProperty(image)
           },
            "auth_token":Alloy.Globals.auth_token
        };

	client.open("PUT", url);
	client.setRequestHeader("content-type", "application/json; charset=utf-8");
	client.send(JSON.stringify(params));
   // auth_token = null;
}		

//por agora a imagem fica nas Properties, ou seja e preciso fazer um getProperty(image) para ir busca la
function takePicture(e){
	//Create a dialog with options
    var dialog = Titanium.UI.createOptionDialog({
        //title of dialog
        title: 'Choose an image source...',
        //options
        options: ['Camera','Photo Gallery', 'Cancel'],
        //index of cancel button
        cancel:2
    });
 
//add event listener
dialog.addEventListener('click', function(e) {
    //if first option was selected
    if(e.index == 0)
    {
        //then we are getting image from camera
        Titanium.Media.showCamera({
            //we got something
            success:function(event)
            {
                //getting media
                var image = event.media; 
                 
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image
                    Ti.App.Properties.setString("image", image.nativePath);
                }
            },
            cancel:function()
            {
                //do somehting if user cancels operation
            },
            error:function(error)
            {
                //error happend, create alert
                var a = Titanium.UI.createAlertDialog({title:'Camera'});
                //set message
                if (error.code == Titanium.Media.NO_CAMERA)
                {
                    a.setMessage('Device does not have camera');
                }
                else
                {
                    a.setMessage('Unexpected error: ' + error.code);
                }
 
                // show alert
                a.show();
            },
            allowImageEditing:true,
            saveToPhotoGallery:true
        });
    }
    else if(e.index == 1)
    {
        //obtain an image from the gallery
        Titanium.Media.openPhotoGallery({
            success:function(event)
            {
                //getting media
                var image = event.media; 
                // set image view
                 
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image	
                    Ti.App.Properties.setString("image", image.nativePath); 
                }   
            },
            cancel:function()
            {
                //user cancelled the action fron within
                //the photo gallery
            }
        });
    }
    else
    {
        //cancel was tapped
        //user opted not to choose a photo
    }
});
 
//show dialog
dialog.show();
}