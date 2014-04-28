function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                var parsedText = JSON.parse(this.responseText).activities;
                for (var i = 0; parsedText.length > i; i++) "Friendship" == parsedText[i].subject_type && ($.status.text = parsedText[i].subject.user.name + " " + parsedText[i].direction + " " + parsedText[i].subject.friend.name);
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("get feed error: " + this.responseText);
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
        var url = mainserver + "/people_nearby.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("update radar text: " + this.responseText);
                Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                    var persons_id = JSON.parse(this.responseText).people[i].id;
                    var personView = Ti.UI.createView({
                        top: 40 * i,
                        id: JSON.parse(this.responseText).people[i].id
                    });
                    var label = Ti.UI.createLabel({
                        text: JSON.parse(this.responseText).people[i].name,
                        id: "name",
                        color: "white",
                        top: 10
                    });
                    var face = Ti.UI.createImageView({
                        image: "/person.png",
                        top: 30 + i,
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    });
                    personView.addEventListener("click", function() {
                        profilemodal(this.id);
                        console.log("gaja a passar para modal: " + persons_id);
                    });
                    personView.add(face);
                    personView.add(label);
                    $.radar.add(personView);
                }
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Get radar error: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            latitude: lat,
            longitude: longi
        };
        client.open("GET", url);
        client.send(params);
    }
    function profilemodal(userid) {
        var userNumber = userid;
        console.log(userNumber + " este e o user");
        var profilewin = Alloy.createController("profilemodal", {
            userId: userNumber
        }).getView();
        profilewin.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        $.index.close();
    }
    function loadData() {
        $.user_name.text = Alloy.Globals.user_name;
        $.birthdate.text = Alloy.Globals.birthdate;
        $.short_description.text = Alloy.Globals.short_description;
    }
    function sendKeepAlives() {
        Alloy.Globals.WS.send(JSON.stringify([ "ping" ]));
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
    var __alloyId2 = [];
    $.__views.__alloyId4 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Profile",
        id: "__alloyId4"
    });
    $.__views.add = Ti.UI.createButton({
        color: "fff",
        id: "add",
        title: "Add"
    });
    $.__views.__alloyId4.rightNavButton = $.__views.add;
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId6"
    });
    $.__views.__alloyId4.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createButton({
        color: "fff",
        title: "Edit",
        height: "40",
        width: Ti.UI.FILL,
        zIndex: "100",
        right: "10",
        textAlign: "right",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    editProfile ? $.__views.__alloyId7.addEventListener("click", editProfile) : __defers["$.__views.__alloyId7!click!editProfile"] = true;
    $.__views.__alloyId8 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId8"
    });
    $.__views.__alloyId6.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "__alloyId9"
    });
    $.__views.__alloyId6.add($.__views.__alloyId9);
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
    $.__views.__alloyId6.add($.__views.user_name);
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
    $.__views.__alloyId6.add($.__views.birthdate);
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
    $.__views.__alloyId6.add($.__views.short_description);
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.__alloyId4,
        title: "Profile",
        icon: "profile.png",
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Activity",
        id: "__alloyId11"
    });
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createButton({
        color: "fff",
        title: "Refresh",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    getActivityFeed ? $.__views.__alloyId13.addEventListener("click", getActivityFeed) : __defers["$.__views.__alloyId13!click!getActivityFeed"] = true;
    $.__views.feed_area = Ti.UI.createScrollView({
        id: "feed_area",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.__alloyId12.add($.__views.feed_area);
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
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId10"
    });
    __alloyId2.push($.__views.__alloyId10);
    $.__views.__alloyId15 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "tangify",
        id: "__alloyId15"
    });
    $.__views.__alloyId16 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createButton({
        color: "fff",
        title: "Geolocate",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    geolocate ? $.__views.__alloyId17.addEventListener("click", geolocate) : __defers["$.__views.__alloyId17!click!geolocate"] = true;
    $.__views.radar = Ti.UI.createView({
        id: "radar",
        width: "460px",
        height: "460px",
        backgroundImage: "/radar_back.png"
    });
    $.__views.__alloyId16.add($.__views.radar);
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15,
        title: "Radar",
        icon: "radar.png",
        id: "__alloyId14"
    });
    __alloyId2.push($.__views.__alloyId14);
    $.__views.chat = Alloy.createController("chat", {
        id: "chat"
    });
    $.__views.__alloyId18 = Ti.UI.createTab({
        window: $.__views.chat.getViewEx({
            recurse: true
        }),
        title: "Chat",
        icon: "chat.png",
        id: "__alloyId18"
    });
    __alloyId2.push($.__views.__alloyId18);
    $.__views.__alloyId20 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
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
        text: "I am Settings",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId19 = Ti.UI.createTab({
        window: $.__views.__alloyId20,
        title: "Settings",
        icon: "settings.png",
        id: "__alloyId19"
    });
    __alloyId2.push($.__views.__alloyId19);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId2,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("base64.js");
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
        Ti.App.fireEvent("app:messageReceived", {
            e: ev
        });
    });
    Alloy.Globals.WS.open(uri);
    Alloy.Globals.tabgroup = $.index;
    var win = Alloy.createController("login").getView();
    win.addEventListener("open", loadData);
    win.open({
        transition: Ti.UI.iPhone.AnimationStyle.NONE
    });
    __defers["$.__views.__alloyId7!click!editProfile"] && $.__views.__alloyId7.addEventListener("click", editProfile);
    __defers["$.__views.__alloyId13!click!getActivityFeed"] && $.__views.__alloyId13.addEventListener("click", getActivityFeed);
    __defers["$.__views.__alloyId17!click!geolocate"] && $.__views.__alloyId17.addEventListener("click", geolocate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;