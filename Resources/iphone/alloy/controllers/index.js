function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId12 = [];
    $.__views.profile = Alloy.createController("profile", {
        id: "profile"
    });
    $.__views.__alloyId13 = Ti.UI.createTab({
        window: $.__views.profile.getViewEx({
            recurse: true
        }),
        title: "Profile",
        icon: "profile.png",
        id: "__alloyId13"
    });
    __alloyId12.push($.__views.__alloyId13);
    $.__views.activity = Alloy.createController("activity", {
        id: "activity"
    });
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.activity.getViewEx({
            recurse: true
        }),
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId15"
    });
    __alloyId12.push($.__views.__alloyId15);
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
    __alloyId12.push($.__views.radar_window);
    $.__views.chat = Alloy.createController("chat", {
        id: "chat"
    });
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.chat.getViewEx({
            recurse: true
        }),
        title: "Chat",
        icon: "chat.png",
        id: "__alloyId16"
    });
    __alloyId12.push($.__views.__alloyId16);
    $.__views.settings = Alloy.createController("settings", {
        id: "settings"
    });
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.settings.getViewEx({
            recurse: true
        }),
        title: "Settings",
        icon: "settings.png",
        id: "__alloyId17"
    });
    __alloyId12.push($.__views.__alloyId17);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId12,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.App.Properties.getString("saved_login") && Ti.App.Properties.getString("saved_pw")) {
        console.log("poderia ir para autologin");
        var loginWindow = Alloy.createController("login").getView();
        loginWindow.open();
    } else {
        var loginWindow = Alloy.createController("login").getView();
        loginWindow.open();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;