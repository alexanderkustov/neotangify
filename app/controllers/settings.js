function logout(e){
	console.log("logout");

	auth_token = null;
	$.settings = null;
	tabgroup = null;
	$.main_nav = null;
	var win=Alloy.createController('login').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});

	
}