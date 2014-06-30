function Controller() {
    function logout() {
        console.log("logout");
        var win = Alloy.createController("login").getView();
        win.open({
            transition: Ti.UI.iPhone.AnimationStyle.NONE
        });
        $.settings = null;
        tabgroup = null;
        auth_token = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settings = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        title: "Settings",
        id: "settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    $.__views.logout = Ti.UI.createButton({
        color: "#fff",
        id: "logout",
        title: "Logout"
    });
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    $.__views.settings.rightNavButton = $.__views.logout;
    $.__views.__alloyId46 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId46"
    });
    $.__views.settings.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Tangible on the Radar",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.basicSwitch = Ti.UI.createSwitch({
        value: true,
        id: "basicSwitch"
    });
    $.__views.__alloyId46.add($.__views.basicSwitch);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;