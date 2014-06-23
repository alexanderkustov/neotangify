function goback(e) {
	var win=Alloy.createController('index').getView();
	win.open();
}

function editProfile(e) {
	var url = mainserver + "/users/"+Alloy.Globals.user_id;
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	        alert('Profile updated!');
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
            //"password":$.password.value ,
            //"password_confirmation":$.password_confirmation.value,
            "presentation_picture":Ti.App.Properties.getProperty(image)
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