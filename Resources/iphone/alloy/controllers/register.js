function Controller() {
    function register() {
        var url = mainserver + "/auth/identity/register?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("success");
            },
            onerror: function(e) {
                alert("error" + e);
                console.log(e);
            },
            timeout: 6e4
        });
        var params = {
            name: $.name.value,
            email: $.email.value,
            password: $.password.value,
            password_confirmation: $.password_confirmation.value
        };
        auth_token = null;
        client.open("POST", url);
        client.send(params);
    }
    function goback() {
        var win = Alloy.createController("index").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId24 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Registration",
        id: "__alloyId24"
    });
    $.__views.back = Ti.UI.createButton({
        color: "fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.__alloyId24.leftNavButton = $.__views.back;
    $.__views.__alloyId26 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.name = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Name",
        height: "40",
        width: Ti.UI.FILL,
        id: "name"
    });
    $.__views.__alloyId26.add($.__views.name);
    $.__views.email = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Email",
        height: "40",
        width: Ti.UI.FILL,
        id: "email"
    });
    $.__views.__alloyId26.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId26.add($.__views.password);
    $.__views.password_confirmation = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Confirm Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password_confirmation"
    });
    $.__views.__alloyId26.add($.__views.password_confirmation);
    $.__views.__alloyId27 = Ti.UI.createButton({
        color: "fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    register ? $.__views.__alloyId27.addEventListener("click", register) : __defers["$.__views.__alloyId27!click!register"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId24,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId27!click!register"] && $.__views.__alloyId27.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;