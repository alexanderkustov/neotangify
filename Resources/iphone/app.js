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

var initKeepAlive;

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
    initKeepAlive = keepAlive();
};

Alloy.Globals.stopWebsocket = function() {
    clearInterval(initKeepAlive);
    initKeepAlive = null;
    Alloy.Globals.WS.close();
};

var service;

Ti.App.addEventListener("resume", function() {
    Ti.API.info("app is resuming from the background");
});

Ti.App.addEventListener("resumed", function() {
    Ti.API.info("app has resumed from the background");
    if (null != service) {
        service.stop();
        service.unregister();
    }
});

Ti.App.addEventListener("pause", function() {
    Ti.API.info("app was paused from the foreground");
    service = Titanium.App.iOS.registerBackgroundService({
        url: "background.js"
    });
    Ti.API.info("registered background service = " + service);
});

Alloy.createController("index");