function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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