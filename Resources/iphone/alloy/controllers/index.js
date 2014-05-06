function Controller() {
    function logout() {
        var win = Alloy.createController("login").getView();
        win.open({
            transition: Ti.UI.iPhone.AnimationStyle.NONE
        });
        auth_token = null;
    }
    function editProfile() {
        var win = Alloy.createController("profile").getView();
        win.open();
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
    var __alloyId5 = [];
    $.__views.__alloyId7 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Profile",
        id: "__alloyId7"
    });
    $.__views.edut = Ti.UI.createButton({
        color: "fff",
        id: "edut",
        title: "Edit"
    });
    editProfile ? $.__views.edut.addEventListener("click", editProfile) : __defers["$.__views.edut!click!editProfile"] = true;
    $.__views.__alloyId7.rightNavButton = $.__views.edut;
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.__alloyId7.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.user_name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "user_name"
    });
    $.__views.__alloyId9.add($.__views.user_name);
    $.__views.birthdate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "birthdate"
    });
    $.__views.__alloyId9.add($.__views.birthdate);
    $.__views.short_description = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "short_description"
    });
    $.__views.__alloyId9.add($.__views.short_description);
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7,
        title: "Profile",
        icon: "profile.png",
        id: "__alloyId6"
    });
    __alloyId5.push($.__views.__alloyId6);
    $.__views.activity = Alloy.createController("activity", {
        id: "activity"
    });
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.activity.getViewEx({
            recurse: true
        }),
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId12"
    });
    __alloyId5.push($.__views.__alloyId12);
    $.__views.radar = Alloy.createController("radar", {
        id: "radar"
    });
    $.__views.radar_window = Ti.UI.createTab({
        window: $.__views.radar.getViewEx({
            recurse: true
        }),
        title: "Radar",
        icon: "radar.png",
        id: "radar_window"
    });
    __alloyId5.push($.__views.radar_window);
    $.__views.chat = Alloy.createController("chat", {
        id: "chat"
    });
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.chat.getViewEx({
            recurse: true
        }),
        title: "Chat",
        icon: "chat.png",
        id: "__alloyId14"
    });
    __alloyId5.push($.__views.__alloyId14);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Chat",
        id: "__alloyId16"
    });
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Tangible on the Radar",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.basicSwitch = Ti.UI.createSwitch({
        value: true,
        id: "basicSwitch"
    });
    $.__views.__alloyId17.add($.__views.basicSwitch);
    $.__views.__alloyId19 = Ti.UI.createButton({
        color: "fff",
        title: "Logout",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    logout ? $.__views.__alloyId19.addEventListener("click", logout) : __defers["$.__views.__alloyId19!click!logout"] = true;
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "Settings",
        icon: "settings.png",
        id: "__alloyId15"
    });
    __alloyId5.push($.__views.__alloyId15);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId5,
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
    __defers["$.__views.edut!click!editProfile"] && $.__views.edut.addEventListener("click", editProfile);
    __defers["$.__views.__alloyId19!click!logout"] && $.__views.__alloyId19.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;