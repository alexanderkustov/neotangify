function Controller() {
    function register() {
        var url = mainserver + "/auth/identity/register?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("success");
                goBack();
            },
            onerror: function(e) {
                alert("error" + e);
                console.log(e);
            },
            timeout: 6e4
        });
        var params = {
            name: $.name.value,
            email: $.email.value.toLowerCase(),
            password: $.password.value,
            password_confirmation: $.password_confirmation.value
        };
        auth_token = null;
        client.open("POST", url);
        client.send(params);
    }
    function goback() {
        var win = Alloy.createController("login").getView();
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
    $.__views.__alloyId46 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        title: "Registration",
        id: "__alloyId46"
    });
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.__alloyId46.leftNavButton = $.__views.back;
    $.__views.registerContainer = Ti.UI.createScrollView({
        id: "registerContainer",
        layout: "vertical"
    });
    $.__views.__alloyId46.add($.__views.registerContainer);
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
    $.__views.registerContainer.add($.__views.name);
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
    $.__views.registerContainer.add($.__views.email);
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
    $.__views.registerContainer.add($.__views.password);
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
    $.__views.registerContainer.add($.__views.password_confirmation);
    $.__views.__alloyId48 = Ti.UI.createButton({
        color: "#fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId48"
    });
    $.__views.registerContainer.add($.__views.__alloyId48);
    register ? $.__views.__alloyId48.addEventListener("click", register) : __defers["$.__views.__alloyId48!click!register"] = true;
    $.__views.register = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId46,
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId48!click!register"] && $.__views.__alloyId48.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;