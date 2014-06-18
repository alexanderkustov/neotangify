Alloy.Globals.tabgroup = $.index;

var win = Alloy.createController('login').getView();
win.open();

Ti.include("base64.js");
Ti.include("websockets.js");