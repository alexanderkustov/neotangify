function editProfile(){
	var win=Alloy.createController('editProfile').getView();
	win.open();
}

function loadData(e){	
	$.user_name.text = Alloy.Globals.user_name;
	$.birthdate.text = Alloy.Globals.birthdate;
	$.short_description.text = Alloy.Globals.short_description;
}

$.profile.addEventListener('open', loadData);
