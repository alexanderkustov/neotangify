var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.Geolocation.purpose = "Recieve User Location";

var auth_token;

var user_name, user_email, user_id, user_pic, short_description, birthdate, user_pw;

var mainserver = "http://tangifyapp.com";

Alloy.createController("index");