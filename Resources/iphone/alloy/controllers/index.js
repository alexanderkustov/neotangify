function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get ACtivity feed text: " + this.responseText);
                $.activityfeed.text = JSON.parse(this.responseText);
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Get ACtivity feed text: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            format: "json"
        };
        client.open("GET", url);
        client.send(params);
    }
    function geolocate() {
        var cur_longitude, cur_latitude;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            cur_longitude = e.coords.longitude;
            cur_latitude = e.coords.latitude;
            console.log("current location long " + cur_longitude.toFixed(3) + " lat " + cur_latitude.toFixed(3));
            changePosition(cur_longitude, cur_latitude);
        });
    }
    function changePosition(lat, longi) {
        var url = mainserver + "/change_position.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                updateRadar(lat, longi);
            },
            onerror: function(e) {
                alert("error" + e);
            },
            timeout: 6e4
        });
        var params = {
            latitude: lat,
            longitude: longi
        };
        client.open("POST", url);
        client.send(params);
    }
    function updateRadar(lat, longi) {
        var url = mainserver + "/people_nearby?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("update radar text: " + this.responseText);
                Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                    persons_id = JSON.parse(this.responseText).people[i].id;
                    console.log("criar label" + i);
                    var label = Ti.UI.createLabel({
                        text: JSON.parse(this.responseText).people[i].name,
                        id: "name"
                    });
                    console.log("label criada" + i);
                    $.radar.add(label);
                    console.log("criar img" + i);
                    if (null != face) var face = Ti.UI.createImageView({
                        image: JSON.parse(this.responseText).people[i].presentation_picture.url
                    }); else var face = Ti.UI.createImageView({
                        image: "http://lorempixel.com/100/100/people",
                        id: "face"
                    });
                    face.addEventListener("click", function() {
                        profilemodal(persons_id);
                        console.log("gaja a passar aqui: " + persons_id);
                    });
                    $.radar.add(face);
                    console.log("get radar text: " + JSON.parse(this.responseText).people[i].presentation_picture.url);
                }
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Get radar text: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            latitude: lat,
            longitude: longi,
            format: "json"
        };
        client.open("GET", url);
        client.send(params);
    }
    function profilemodal(userid) {
        var userNumber = userid;
        console.log(userNumber + " este e o user");
        var profilewin = Alloy.createController("profilemodal", {
            args1: userNumber
        }).getView();
        $.index.close();
        profilewin.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
    }
    function sendMsg() {
        var message = $.textChat.value;
        "" != message && WS.send(JSON.stringify([ "message", {
            from: "eu",
            to: "Outro",
            message: Base64.encode(message)
        } ]));
    }
    function sendKeepAlives() {
        WS.send(JSON.stringify([ "ping" ]));
        setTimeout("sendKeepAlives();", 3e4);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.login = Alloy.createController("login", {
        id: "login"
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.login.getViewEx({
            recurse: true
        }),
        title: "Profile",
        icon: "KS_nav_views.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId4 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Activity",
        id: "__alloyId4"
    });
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createButton({
        color: "fff",
        title: "Refresh",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    getActivityFeed ? $.__views.__alloyId6.addEventListener("click", getActivityFeed) : __defers["$.__views.__alloyId6!click!getActivityFeed"] = true;
    $.__views.activityfeed = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am feed",
        id: "activityfeed"
    });
    $.__views.__alloyId5.add($.__views.activityfeed);
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.__alloyId4,
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.__alloyId8 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "tangify",
        id: "__alloyId8"
    });
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createButton({
        color: "fff",
        title: "Geolocate",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    geolocate ? $.__views.__alloyId10.addEventListener("click", geolocate) : __defers["$.__views.__alloyId10!click!geolocate"] = true;
    $.__views.radar = Ti.UI.createView({
        id: "radar"
    });
    $.__views.__alloyId9.add($.__views.radar);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Radar",
        icon: "radar.png",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "teste",
        id: "__alloyId12"
    });
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.labelChat = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "chat area",
        id: "labelChat"
    });
    $.__views.__alloyId13.add($.__views.labelChat);
    $.__views.textChat = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Enter Message...",
        height: "40",
        width: Ti.UI.FILL,
        id: "textChat"
    });
    $.__views.__alloyId13.add($.__views.textChat);
    $.__views.__alloyId14 = Ti.UI.createButton({
        color: "fff",
        title: "Send",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    sendMsg ? $.__views.__alloyId14.addEventListener("click", sendMsg) : __defers["$.__views.__alloyId14!click!sendMsg"] = true;
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12,
        title: "Chat",
        icon: "KS_nav_ui.png",
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Chat",
        id: "__alloyId16"
    });
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Messages",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "Settings",
        icon: "chat.png",
        id: "__alloyId15"
    });
    __alloyId0.push($.__views.__alloyId15);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("base64.js");
    uri = "ws://tangifyapp.com:81";
    var WS = require("net.iamyellow.tiws").createWS();
    WS.addEventListener("open", function() {
        Ti.API.info("websocket opened");
        WS.send(JSON.stringify([ "connect", {
            user: "a@a.com",
            auth_token: "_YW1MBm_cDBmNn985NnCdw"
        } ]));
        sendKeepAlives();
    });
    WS.addEventListener("close", function(ev) {
        Ti.API.info(ev);
    });
    WS.addEventListener("error", function(ev) {
        Ti.API.info(ev);
    });
    WS.addEventListener("message", function(ev) {
        message = JSON.parse(ev.data);
        var event = message[0];
        var data = message[1];
        if ("message" == event) {
            console.log("From " + data.from);
            console.log("To " + data.to);
            console.log("Message " + Base64.decode(data.message));
        } else {
            if ("pong" == event) {
                console.log("pong");
                return;
            }
            if ("new_user" == event) console.log("New user: " + data.data); else if ("user_left" == event) console.log("User left: " + data.data); else if ("room_state" == event) {
                var names = data.data.split(",");
                console.log(names[0]);
            }
        }
    });
    WS.open(uri);
    Alloy.Globals.tabgroup = $.index;
    $.index.open({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });
    null != auth_token ? console.log(auth_token) : console.log("auth_token e null");
    __defers["$.__views.__alloyId6!click!getActivityFeed"] && $.__views.__alloyId6.addEventListener("click", getActivityFeed);
    __defers["$.__views.__alloyId10!click!geolocate"] && $.__views.__alloyId10.addEventListener("click", geolocate);
    __defers["$.__views.__alloyId14!click!sendMsg"] && $.__views.__alloyId14.addEventListener("click", sendMsg);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;