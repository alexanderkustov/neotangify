var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.Geolocation.purpose = "Recieve User Location";

var auth_token;

var user_name;

var user_id;

var short_description;

var birthdate;

var mainserver = "http://tangifyapp.com";

Alloy.createController("index");