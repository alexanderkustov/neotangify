function logout(e){
	var win=Alloy.createController('login').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
	$.settings = null;
	auth_token = null;
	
}