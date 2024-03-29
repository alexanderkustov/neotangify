function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function register() {
        var url = mainserver + "/auth/identity/register?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("success");
                var win = Alloy.createController("login").getView();
                $.register.close();
                $.register = null;
                win.open();
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
        $.register.close();
        $.register = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        navBarHidden: "true",
        id: "register",
        title: "Registration"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.registerContainer = Ti.UI.createScrollView({
        id: "registerContainer",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%"
    });
    $.__views.register.add($.__views.registerContainer);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Register",
        id: "__alloyId15"
    });
    $.__views.registerContainer.add($.__views.__alloyId15);
    $.__views.name = Ti.UI.createTextField({
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
    $.__views.age = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Age",
        id: "age"
    });
    $.__views.registerContainer.add($.__views.age);
    $.__views.password = Ti.UI.createTextField({
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
    $.__views.__alloyId16 = Ti.UI.createButton({
        color: "#fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId16"
    });
    $.__views.registerContainer.add($.__views.__alloyId16);
    register ? $.__views.__alloyId16.addEventListener("click", register) : __defers["$.__views.__alloyId16!click!register"] = true;
    $.__views.__alloyId17 = Ti.UI.createButton({
        color: "#fff",
        title: "Go Back",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId17"
    });
    $.__views.registerContainer.add($.__views.__alloyId17);
    goback ? $.__views.__alloyId17.addEventListener("click", goback) : __defers["$.__views.__alloyId17!click!goback"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId16!click!register"] && $.__views.__alloyId16.addEventListener("click", register);
    __defers["$.__views.__alloyId17!click!goback"] && $.__views.__alloyId17.addEventListener("click", goback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;