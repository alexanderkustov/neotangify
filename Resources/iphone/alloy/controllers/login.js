function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.__alloyId8 = Alloy.createController("loginWindow", {
        id: "__alloyId8",
        __parentSymbol: __parentSymbol
    });
    $.__views.loginWindow = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId8.getViewEx({
            recurse: true
        }),
        id: "loginWindow",
        exitOnClose: "true"
    });
    $.__views.loginWindow && $.addTopLevelView($.__views.loginWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;