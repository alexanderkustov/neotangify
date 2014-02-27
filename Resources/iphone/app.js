var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.Geolocation.purpose = "Recieve User Location";

var auth_token;

var mainserver = "http://tangifyapp.com";

Alloy.createController("index");