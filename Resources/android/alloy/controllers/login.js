function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId26!click!login"] && $.__views.__alloyId26.addEventListener("click", login);
    __defers["$.__views.__alloyId27!click!openRegister"] && $.__views.__alloyId27.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;