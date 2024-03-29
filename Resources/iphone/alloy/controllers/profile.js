function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadData() {
        $.user_name.text = Alloy.Globals.user_name;
        $.birthdate.text = Alloy.Globals.birthdate;
        $.short_description.text = Alloy.Globals.short_description;
        console.log(mainserver + Alloy.Globals.user_pic);
        null != Alloy.Globals.user_pic && ($.user_picture.image = mainserver + Alloy.Globals.user_pic);
        null != Alloy.Globals.cover_picture && ($.cover_picture.image = mainserver + Alloy.Globals.cover_picture);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.profile = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        navBarHidden: "true",
        id: "profile"
    });
    $.__views.profile && $.addTopLevelView($.__views.profile);
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId10"
    });
    $.__views.profile.add($.__views.__alloyId10);
    $.__views.cover_picture = Ti.UI.createImageView({
        image: "/tangy_back2.jpg",
        zIndex: "1",
        height: "200",
        top: "-50",
        width: Ti.UI.FILL,
        id: "cover_picture"
    });
    $.__views.__alloyId10.add($.__views.cover_picture);
    $.__views.user_picture = Ti.UI.createImageView({
        width: "200",
        height: "200",
        borderRadius: "50",
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderWidth: "3",
        borderColor: "white",
        id: "user_picture"
    });
    $.__views.__alloyId10.add($.__views.user_picture);
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
    $.__views.__alloyId10.add($.__views.user_name);
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
    $.__views.__alloyId10.add($.__views.birthdate);
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
    $.__views.__alloyId10.add($.__views.short_description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.profile.addEventListener("focus", loadData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;