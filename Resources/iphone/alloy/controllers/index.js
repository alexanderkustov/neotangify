function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                $.status.text = JSON.parse(this.responseText);
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
    function editProfile() {}
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
                        id: "profileRadar"
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
        var chatMsg = Ti.UI.createLabel({
            color: "#ffffff",
            font: {
                fontSize: 14
            },
            text: message,
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
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    editProfile ? $.__views.__alloyId4.addEventListener("click", editProfile) : __defers["$.__views.__alloyId4!click!editProfile"] = true;
    $.__views.__alloyId5 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        height: "160",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Your Name",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Profile",
        icon: "KS_nav_views.png",
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
    var __alloyId11 = [];
    $.__views.listRow = Ti.UI.createTableViewRow({
        height: "200",
        selectionStyle: "NONE",
        id: "listRow"
    });
    __alloyId11.push($.__views.listRow);
    $.__views.rowContainer = Ti.UI.createView({
        borderColor: "#cacdd8",
        borderRadius: 5,
        borderWidth: 1,
        left: "5",
        right: "5",
        top: "5",
        bottom: "5",
        height: "Ti.UI.FILL",
        width: "Ti.UI.FILL",
        backgroundColor: "#fff",
        id: "rowContainer"
    });
    $.__views.listRow.add($.__views.rowContainer);
    $.__views.profilePic = Ti.UI.createImageView({
        width: "66",
        height: "66",
        top: "5",
        left: "5",
        id: "profilePic",
        image: "radar.png"
    });
    $.__views.rowContainer.add($.__views.profilePic);
    $.__views.profileName = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#576b95",
        font: {
            fontSize: "16",
            fontWeight: "bold"
        },
        textAlign: "center",
        top: "5",
        left: "80",
        text: "Teste",
        id: "profileName"
    });
    $.__views.rowContainer.add($.__views.profileName);
    $.__views.timeAgo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#bbbbbb",
        font: {
            fontSize: "16"
        },
        textAlign: "center",
        top: "25",
        left: "80",
        text: "10 minutes ago",
        id: "timeAgo"
    });
    $.__views.rowContainer.add($.__views.timeAgo);
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
    $.__views.rowContainer.add($.__views.status);
    $.__views.grayLine = Ti.UI.createView({
        id: "grayLine",
        bottom: "51"
    });
    $.__views.rowContainer.add($.__views.grayLine);
    $.__views.bottomActions = Ti.UI.createView({
        bottom: 0,
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#eff2f5",
        layout: "horizontal",
        id: "bottomActions"
    });
    $.__views.rowContainer.add($.__views.bottomActions);
    $.__views.mainList = Ti.UI.createTableView({
        backgroundColor: "#2980b9",
        separatorStyle: "NONE",
        data: __alloyId11,
        id: "mainList"
    });
    $.__views.__alloyId9.add($.__views.mainList);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId13 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "tangify",
        id: "__alloyId13"
    });
    $.__views.__alloyId14 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createButton({
        color: "fff",
        title: "Geolocate",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    geolocate ? $.__views.__alloyId15.addEventListener("click", geolocate) : __defers["$.__views.__alloyId15!click!geolocate"] = true;
    $.__views.radar = Ti.UI.createView({
        id: "radar"
    });
    $.__views.__alloyId14.add($.__views.radar);
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.__alloyId13,
        title: "Radar",
        icon: "radar.png",
        id: "__alloyId12"
    });
    __alloyId0.push($.__views.__alloyId12);
    $.__views.__alloyId17 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "chat",
        id: "__alloyId17"
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
    $.__views.__alloyId17.add($.__views.chatArea);
    $.__views.chatBtn = Ti.UI.createView({
        id: "chatBtn",
        layout: "vertical",
        top: "80%",
        backgroundColor: "#0071bc"
    });
    $.__views.__alloyId17.add($.__views.chatBtn);
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
    $.__views.chatBtn.add($.__views.labelChat);
    $.__views.textChat = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Enter Message...",
        id: "textChat"
    });
    $.__views.chatBtn.add($.__views.textChat);
    $.__views.__alloyId18 = Ti.UI.createButton({
        color: "fff",
        title: "Send",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId18"
    });
    $.__views.chatBtn.add($.__views.__alloyId18);
    sendMsg ? $.__views.__alloyId18.addEventListener("click", sendMsg) : __defers["$.__views.__alloyId18!click!sendMsg"] = true;
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.__alloyId17,
        title: "Chat",
        icon: "KS_nav_ui.png",
        id: "__alloyId16"
    });
    __alloyId0.push($.__views.__alloyId16);
    $.__views.__alloyId20 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Chat",
        id: "__alloyId20"
    });
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Messages",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId19 = Ti.UI.createTab({
        window: $.__views.__alloyId20,
        title: "Settings",
        icon: "chat.png",
        id: "__alloyId19"
    });
    __alloyId0.push($.__views.__alloyId19);
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
    win.open();
    __defers["$.__views.__alloyId4!click!editProfile"] && $.__views.__alloyId4.addEventListener("click", editProfile);
    __defers["$.__views.__alloyId10!click!getActivityFeed"] && $.__views.__alloyId10.addEventListener("click", getActivityFeed);
    __defers["$.__views.__alloyId15!click!geolocate"] && $.__views.__alloyId15.addEventListener("click", geolocate);
    __defers["$.__views.__alloyId18!click!sendMsg"] && $.__views.__alloyId18.addEventListener("click", sendMsg);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;