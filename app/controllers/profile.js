function editProfile(){
	var win=Alloy.createController('editProfile').getView();
	win.open();
}

function loadData(e){	
	$.user_name.text = Alloy.Globals.user_name;
	$.birthdate.text = Alloy.Globals.birthdate;
	$.short_description.text = Alloy.Globals.short_description;
	//$.user_pic.image = Alloy.Globals.user_pic;
}

$.profile.addEventListener('open', loadData);
Ti.include("base64.js");
Ti.include("websockets.js");