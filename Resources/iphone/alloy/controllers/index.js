function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                $.status.text = JSON.parse(this.responseText).activities;
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("get feed text: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            format: "json"
        };
        client.open("GET", url);
        client.send(params);
    }
    function editProfile() {
        var win = Alloy.createController("profile").getView();
        win.open();
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
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("update radar text: " + this.responseText);
                Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                    persons_id = JSON.parse(this.responseText).people[i].id;
                    var personView = Ti.UI.createView({
                        top: 30 * i
                    });
                    var label = Ti.UI.createLabel({
                        text: JSON.parse(this.responseText).people[i].name,
                        id: "name",
                        color: "white",
                        top: 10
                    });
                    if (null != face) var face = Ti.UI.createImageView({
                        image: JSON.parse(this.responseText).people[i].presentation_picture.url
                    }); else var face = Ti.UI.createImageView({
                        image: "/person.png",
                        top: 30 + i,
                        borderRadius: 50,
                        borderWidth: "3",
                        borderColor: "white",
                        width: 100,
                        height: 100
                    });
                    label.addEventListener("click", function() {
                        profilemodal(persons_id);
                        console.log("gaja a passar aqui: " + persons_id);
                    });
                    personView.add(face);
                    personView.add(label);
                    $.radar.add(personView);
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
        var chatMsg = Ti.UI.createLabel({
            color: "#ffffff",
            font: {
                fontSize: 14
            },
            text: Alloy.Globals.user_name + ":" + message,
            top: 25,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        "" != message && WS.send(JSON.stringify([ "message", {
            from: "eu",
            to: "Outro",
            message: Base64.encode(message)
        } ]));
        $.chatArea.add(chatMsg);
        $.textChat.value = "";
    }
    function sendKeepAlives() {
        WS.send(JSON.stringify([ "ping" ]));
        setTimeout("sendKeepAlives();", 3e4);
    }
    function loadData() {
        $.user_name.text = Alloy.Globals.user_name;
        $.birthdate.text = Alloy.Globals.birthdate;
        $.short_description.text = Alloy.Globals.short_description;
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
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Profile",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createButton({
        color: "fff",
        title: "Edit",
        height: "40",
        width: Ti.UI.FILL,
        zIndex: "100",
        right: "10",
        textAlign: "right",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    editProfile ? $.__views.__alloyId4.addEventListener("click", editProfile) : __defers["$.__views.__alloyId4!click!editProfile"] = true;
    $.__views.__alloyId5 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.user_name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Your Name",
        id: "user_name"
    });
    $.__views.__alloyId3.add($.__views.user_name);
    $.__views.birthdate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Birthdate",
        id: "birthdate"
    });
    $.__views.__alloyId3.add($.__views.birthdate);
    $.__views.short_description = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Short Description",
        id: "short_description"
    });
    $.__views.__alloyId3.add($.__views.short_description);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Profile",
        icon: "profile.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId8 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Activity",
        id: "__alloyId8"
    });
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createButton({
        color: "fff",
        title: "Refresh",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    getActivityFeed ? $.__views.__alloyId10.addEventListener("click", getActivityFeed) : __defers["$.__views.__alloyId10!click!getActivityFeed"] = true;
    $.__views.feed_area = Ti.UI.createScrollView({
        id: "feed_area",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.__alloyId9.add($.__views.feed_area);
    $.__views.status = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "16"
        },
        textAlign: "center",
        left: "5",
        right: "5",
        id: "status"
    });
    $.__views.feed_area.add($.__views.status);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "tangify",
        id: "__alloyId12"
    });
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        color: "fff",
        title: "Geolocate",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    geolocate ? $.__views.__alloyId14.addEventListener("click", geolocate) : __defers["$.__views.__alloyId14!click!geolocate"] = true;
    $.__views.radar = Ti.UI.createView({
        id: "radar",
        width: "460px",
        height: "460px",
        backgroundImage: "/radar_back.png"
    });
    $.__views.__alloyId13.add($.__views.radar);
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12,
        title: "Radar",
        icon: "radar.png",
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "chat",
        id: "__alloyId16"
    });
    $.__views.chatArea = Ti.UI.createScrollView({
        id: "chatArea",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.__alloyId16.add($.__views.chatArea);
    $.__views.chatBtn = Ti.UI.createView({
        id: "chatBtn",
        layout: "horizontal",
        top: "80%",
        backgroundColor: "#0071bc"
    });
    $.__views.__alloyId16.add($.__views.chatBtn);
    $.__views.textChat = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: "70%",
        height: "40",
        hintText: "Enter Message...",
        id: "textChat"
    });
    $.__views.chatBtn.add($.__views.textChat);
    $.__views.__alloyId17 = Ti.UI.createButton({
        color: "fff",
        title: "Send",
        height: "40",
        width: "20%",
        id: "__alloyId17"
    });
    $.__views.chatBtn.add($.__views.__alloyId17);
    sendMsg ? $.__views.__alloyId17.addEventListener("click", sendMsg) : __defers["$.__views.__alloyId17!click!sendMsg"] = true;
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "Chat",
        icon: "chat.png",
        id: "__alloyId15"
    });
    __alloyId0.push($.__views.__alloyId15);
    $.__views.__alloyId19 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Chat",
        id: "__alloyId19"
    });
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Settings",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.__alloyId18 = Ti.UI.createTab({
        window: $.__views.__alloyId19,
        title: "Settings",
        icon: "settings.png",
        id: "__alloyId18"
    });
    __alloyId0.push($.__views.__alloyId18);
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
    var win = Alloy.createController("login").getView();
    win.addEventListener("open", loadData);
    win.open({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });
    __defers["$.__views.__alloyId4!click!editProfile"] && $.__views.__alloyId4.addEventListener("click", editProfile);
    __defers["$.__views.__alloyId10!click!getActivityFeed"] && $.__views.__alloyId10.addEventListener("click", getActivityFeed);
    __defers["$.__views.__alloyId14!click!geolocate"] && $.__views.__alloyId14.addEventListener("click", geolocate);
    __defers["$.__views.__alloyId17!click!sendMsg"] && $.__views.__alloyId17.addEventListener("click", sendMsg);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;