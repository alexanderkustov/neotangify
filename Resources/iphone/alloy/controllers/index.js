function Controller() {
    function openRegister() {
        var win = Alloy.createController("register").getView();
        $.index.close();
        win.open();
    }
    function login() {
        var url = "http://localhost:3000/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                $.index.setActiveTab(2);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
            },
            onerror: function(e) {
                alert("error" + e);
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.login.value,
            password: $.password.value,
            Login: "",
            provider: "identity"
        };
        client.setRequestHeader("enctype", "multipart/form-data");
        client.open("POST", url);
        client.send(params);
    }
    function getActivityFeed() {
        var url = "http://localhost:3000/activities.json?auth_token=" + Alloy.Globals.auth_token;
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
    function changePosition(lat, longi) {
        var url = "http://localhost:3000/change_position.json?auth_token=" + Alloy.Globals.auth_token;
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
    function geolocate() {
        var cur_longitude, cur_latitude;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.API.warn(e);
            cur_longitude = e.coords.longitude;
            cur_latitude = e.coords.latitude;
            Titanium.API.info("geo - current location: long " + cur_longitude.toFixed(3) + " lat " + cur_latitude.toFixed(3));
            changePosition(cur_longitude, cur_latitude);
        });
    }
    function updateRadar(lat, longi) {
        var url = "http://localhost:3000/people_nearby.json?auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get ACtivity feed text: " + this.responseText);
                $.radar.text = JSON.parse(this.responseText).people[0].name;
                var face = JSON.parse(this.responseText).people[0].presentation_picture.url;
                $.face.image = null != face ? JSON.parse(this.responseText).people[0].presentation_picture.url : "http://lorempixel.com/100/100";
                Ti.API.info("Get ACtivity feed text: " + JSON.parse(this.responseText).people[0].presentation_picture.url);
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Get radar text: " + this.responseText);
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
        title: "Login",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        image: "/appicon.png",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.login = Ti.UI.createTextField({
        hintText: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "login"
    });
    $.__views.__alloyId3.add($.__views.login);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId3.add($.__views.password);
    $.__views.__alloyId5 = Ti.UI.createButton({
        color: "fff",
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    login ? $.__views.__alloyId5.addEventListener("click", login) : __defers["$.__views.__alloyId5!click!login"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        color: "fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    openRegister ? $.__views.__alloyId6.addEventListener("click", openRegister) : __defers["$.__views.__alloyId6!click!openRegister"] = true;
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Login",
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
    $.__views.__alloyId9.add($.__views.activityfeed);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Tab 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Tab 3",
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
    $.__views.face = Ti.UI.createImageView({
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "white",
        id: "face"
    });
    $.__views.__alloyId13.add($.__views.face);
    $.__views.radar = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am radar",
        id: "radar"
    });
    $.__views.__alloyId13.add($.__views.radar);
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12,
        title: "Tab 3",
        icon: "KS_nav_ui.png",
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Radar",
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
        text: "I am Circle 4",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "Tab 4",
        icon: "KS_nav_ui.png",
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
        text: "I am Messages",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.__alloyId18 = Ti.UI.createTab({
        window: $.__views.__alloyId19,
        title: "Tab 5",
        icon: "KS_nav_ui.png",
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
    $.index.open();
    __defers["$.__views.__alloyId5!click!login"] && $.__views.__alloyId5.addEventListener("click", login);
    __defers["$.__views.__alloyId6!click!openRegister"] && $.__views.__alloyId6.addEventListener("click", openRegister);
    __defers["$.__views.__alloyId10!click!getActivityFeed"] && $.__views.__alloyId10.addEventListener("click", getActivityFeed);
    __defers["$.__views.__alloyId14!click!geolocate"] && $.__views.__alloyId14.addEventListener("click", geolocate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;