function Controller() {
    function addFriend() {
        console.log("friends are magical");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profilemodal";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profilemodal = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Profile",
        id: "profilemodal"
    });
    $.__views.profilemodal && $.addTopLevelView($.__views.profilemodal);
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId22"
    });
    $.__views.profilemodal.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createButton({
        color: "fff",
        title: "Add Friend",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    addFriend ? $.__views.__alloyId23.addEventListener("click", addFriend) : __defers["$.__views.__alloyId23!click!addFriend"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId23!click!addFriend"] && $.__views.__alloyId23.addEventListener("click", addFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;