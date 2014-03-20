function Controller() {
    function goback() {
        var win = Alloy.createController("index").getView();
        win.open();
    }
    function editProfile() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId27 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Registration",
        id: "__alloyId27"
    });
    $.__views.back = Ti.UI.createButton({
        color: "fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.__alloyId27.leftNavButton = $.__views.back;
    $.__views.__alloyId29 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId29"
    });
    $.__views.__alloyId27.add($.__views.__alloyId29);
    $.__views.name = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Name",
        id: "name"
    });
    $.__views.__alloyId29.add($.__views.name);
    $.__views.email = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Email",
        id: "email"
    });
    $.__views.__alloyId29.add($.__views.email);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Want to change your password? (Optional)",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.password = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Password",
        passwordMask: "true",
        id: "password"
    });
    $.__views.__alloyId29.add($.__views.password);
    $.__views.password_confirmation = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Confirm Password",
        passwordMask: "true",
        id: "password_confirmation"
    });
    $.__views.__alloyId29.add($.__views.password_confirmation);
    $.__views.__alloyId31 = Ti.UI.createButton({
        color: "fff",
        title: "Submit",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId31"
    });
    $.__views.__alloyId29.add($.__views.__alloyId31);
    editProfile ? $.__views.__alloyId31.addEventListener("click", editProfile) : __defers["$.__views.__alloyId31!click!editProfile"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId27,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId31!click!editProfile"] && $.__views.__alloyId31.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;