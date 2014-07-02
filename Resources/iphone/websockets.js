function sendKeepAlives() {
    Alloy.Globals.WS.send(JSON.stringify([ "ping" ]));
    setTimeout("sendKeepAlives();", 3e4);
}

uri = "ws://tangifyapp.com:81";

Alloy.Globals.WS = require("net.iamyellow.tiws").createWS();

Alloy.Globals.WS.addEventListener("open", function() {
    Ti.API.info("websocket opened");
    Alloy.Globals.WS.send(JSON.stringify([ "connect", {
        user: "a@a.com",
        auth_token: Alloy.Globals.auth_token
    } ]));
    sendKeepAlives();
});

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

Alloy.Globals.WS.open(uri);