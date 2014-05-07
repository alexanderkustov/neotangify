function logout(e){
	var win=Alloy.createController('login').getView();
	win.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
	auth_token = null;
}