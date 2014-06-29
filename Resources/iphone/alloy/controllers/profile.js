function Controller() {
    function editProfile() {
        var win = Alloy.createController("editProfile").getView();
        win.open();
    }
    function loadData() {
        $.user_name.text = Alloy.Globals.user_name;
        $.birthdate.text = Alloy.Globals.birthdate;
        $.short_description.text = Alloy.Globals.short_description;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profile = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        title: "Profile",
        id: "profile"
    });
    $.__views.profile && $.addTopLevelView($.__views.profile);
    $.__views.edut = Ti.UI.createButton({
        color: "#fff",
        id: "edut",
        title: "Edit"
    });
    editProfile ? $.__views.edut.addEventListener("click", editProfile) : __defers["$.__views.edut!click!editProfile"] = true;
    $.__views.profile.rightNavButton = $.__views.edut;
    $.__views.__alloyId32 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId32"
    });
    $.__views.profile.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.user_picture = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "user_picture"
    });
    $.__views.__alloyId32.add($.__views.user_picture);
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
    $.__views.__alloyId32.add($.__views.user_name);
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
    $.__views.__alloyId32.add($.__views.birthdate);
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
    $.__views.__alloyId32.add($.__views.short_description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.profile.addEventListener("open", loadData);
    Ti.include("base64.js");
    Ti.include("websockets.js");
    __defers["$.__views.edut!click!editProfile"] && $.__views.edut.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;