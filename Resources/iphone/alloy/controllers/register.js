function Controller() {
    function register() {
        var url = "http://localhost:3000/auth/identity/register?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("success");
                goBack();
            },
            onerror: function(e) {
                alert("error" + e);
            },
            timeout: 6e4
        });
        var params = {
            name: $.name.value,
            email: $.email.value,
            password: $.password.value,
            password_confirmation: $.password_confirmation.value
        };
        client.setRequestHeader("enctype", "multipart/form-data");
        client.open("POST", url);
        client.send(params);
    }
    function goBack() {
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
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "#eee",
        title: "Registration",
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId21"
    });
    $.__views.register.add($.__views.__alloyId21);
    $.__views.name = Ti.UI.createTextField({
        hintText: "Name",
        height: "40",
        width: Ti.UI.FILL,
        id: "name"
    });
    $.__views.__alloyId21.add($.__views.name);
    $.__views.email = Ti.UI.createTextField({
        hintText: "Email",
        height: "40",
        width: Ti.UI.FILL,
        id: "email"
    });
    $.__views.__alloyId21.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId21.add($.__views.password);
    $.__views.password_confirmation = Ti.UI.createTextField({
        hintText: "Confirm Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password_confirmation"
    });
    $.__views.__alloyId21.add($.__views.password_confirmation);
    $.__views.__alloyId22 = Ti.UI.createButton({
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    register ? $.__views.__alloyId22.addEventListener("click", register) : __defers["$.__views.__alloyId22!click!register"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId22!click!register"] && $.__views.__alloyId22.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;