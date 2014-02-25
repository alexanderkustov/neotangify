function Controller() {
    function openRegister() {
        var win = Alloy.createController("register").getView();
        win.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    }
    function login() {
        var url = "http://localhost:3000/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Alloy.Globals.tabgroup.setActiveTab(2);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
            },
            onerror: function(e) {
                alert("error" + e);
                TI.API.info("error" + e);
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.login.value,
            password: $.password.value,
            Login: "",
            provider: "identity"
        };
        client.open("POST", url);
        client.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Login",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.login.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createImageView({
        image: "/appicon.png",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.login = Ti.UI.createTextField({
        hintText: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "login"
    });
    $.__views.__alloyId17.add($.__views.login);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId17.add($.__views.password);
    $.__views.__alloyId19 = Ti.UI.createButton({
        color: "fff",
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    login ? $.__views.__alloyId19.addEventListener("click", login) : __defers["$.__views.__alloyId19!click!login"] = true;
    $.__views.__alloyId20 = Ti.UI.createButton({
        color: "fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId20"
    });
    $.__views.__alloyId17.add($.__views.__alloyId20);
    openRegister ? $.__views.__alloyId20.addEventListener("click", openRegister) : __defers["$.__views.__alloyId20!click!openRegister"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId19!click!login"] && $.__views.__alloyId19.addEventListener("click", login);
    __defers["$.__views.__alloyId20!click!openRegister"] && $.__views.__alloyId20.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;