function editProfile(){
	$.main_tab.setActiveTab(3);
}

function loadData(e){	
	$.user_name.text = Alloy.Globals.user_name;
	$.birthdate.text = Alloy.Globals.birthdate;
	$.short_description.text = Alloy.Globals.short_description;
	
	console.log(mainserver + Alloy.Globals.user_pic);
	
	if(Alloy.Globals.user_pic != null){
		$.user_picture.image = mainserver + Alloy.Globals.user_pic;
	}

	if(Alloy.Globals.cover_picture != null){
		$.cover_picture.image = mainserver + Alloy.Globals.cover_picture;
	}
		
}

$.profile.addEventListener('focus', loadData);