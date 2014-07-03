function keepAlive() {
    console.log("in keep alive outside setInterval");
    i = setInterval(function() {
        console.log("Lets send a ping");
        Alloy.Globals.WS.send(JSON.stringify([ "ping" ]));
    }, 3e4);
    return i;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.Geolocation.purpose = "Recieve User Location";

var auth_token;

var user_name, user_email, user_id, user_pic, short_description, birthdate, user_pw;

var mainserver = "http://tangifyapp.com";

Ti.include("base64.js");

uri = "ws://tangifyapp.com:81";

var initKeepAlive = keepAlive();

Alloy.Globals.startWebsocket = function() {
    console.log("Im on start websocket");
    console.log("interval cleared?");
    if (null == Alloy.Globals.WS) Alloy.Globals.WS = require("net.iamyellow.tiws").createWS(); else {
        Alloy.Globals.WS = null;
        Alloy.Globals.WS = require("net.iamyellow.tiws").createWS();
    }
    Alloy.Globals.WS.addEventListener("close", function(ev) {
        Ti.API.info(ev);
    });
    Alloy.Globals.WS.addEventListener("error", function(ev) {
        Ti.API.info(ev);
    });
    Alloy.Globals.WS.addEventListener("message", function(ev) {
        console.log("Message received" + ev);
        Ti.App.fireEvent("app:messageReceived", {
            e: ev
        });
    });
    Alloy.Globals.WS.addEventListener("open", function() {
        Ti.API.info("websocket opened");
        Alloy.Globals.WS.send(JSON.stringify([ "connect", {
            user: Alloy.Globals.user_email,
            auth_token: Alloy.Globals.auth_token
        } ]));
    });
    Alloy.Globals.WS.open(uri);
    console.log("opened");
    clearInterval(initKeepAlive);
    initKeepAlive = null;
    initKeepAlive = keepAlive();
};

Alloy.Globals.stopWebsocket = function() {
    Alloy.Globals.WS.close();
};

Alloy.createController("index");