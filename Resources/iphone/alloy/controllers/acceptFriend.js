function Controller() {
    function goback() {
        var win = Alloy.createController("index").getView();
        win = Alloy.Globals.tabgroup.setActiveTab(2);
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "acceptFriend";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profile_name = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        id: "profile_name",
        title: ""
    });
    $.__views.back = Ti.UI.createButton({
        color: "fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.profile_name.leftNavButton = $.__views.back;
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.profile_name.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    var __alloyId5 = [];
    var __alloyId6 = {
        title: "Send a Msg",
        ns: "Alloy.Abstract"
    };
    __alloyId5.push(__alloyId6);
    var __alloyId7 = {
        title: "Accept Friend",
        ns: "Alloy.Abstract"
    };
    __alloyId5.push(__alloyId7);
    var __alloyId8 = {
        title: "Reject",
        ns: "Alloy.Abstract"
    };
    __alloyId5.push(__alloyId8);
    $.__views.bb1 = Ti.UI.iOS.createTabbedBar({
        labels: __alloyId5,
        id: "bb1",
        backgroundColor: "#fff",
        top: "50",
        height: "25",
        width: "300"
    });
    $.__views.__alloyId1.add($.__views.bb1);
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
    $.__views.bb1.add($.__views.short_description);
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.profile_name,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;