function logout(e){
	console.log("logout");
	var win=Alloy.createController('login').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
	$.settings = null;
	tabgroup = null;
	auth_token = null;
	
}