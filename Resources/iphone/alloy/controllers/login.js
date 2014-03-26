function Controller() {
    function login() {
        var url = mainserver + "/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
                console.log(auth_token);
                Alloy.Globals.user_name = JSON.parse(this.responseText).user.name;
                Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate;
                Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description;
                Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
                var win = Alloy.createController("index").getView();
                win.open();
            },
            onerror: function(e) {
                alert("Error, try again!");
                Ti.API.info("url: " + url + " error: " + JSON.stringify(e));
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.login.value.toLowerCase(),
            password: $.password.value,
            provider: "identity",
            Login: "",
            format: "json"
        };
        client.open("POST", url);
        client.send(params);
    }
    function openRegister() {
        var win = Alloy.createController("register").getView();
        win.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId20 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Please login",
        id: "__alloyId20"
    });
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.login = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Login",
        id: "login"
    });
    $.__views.__alloyId21.add($.__views.login);
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
    $.__views.__alloyId21.add($.__views.password);
    $.__views.__alloyId23 = Ti.UI.createButton({
        color: "fff",
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    login ? $.__views.__alloyId23.addEventListener("click", login) : __defers["$.__views.__alloyId23!click!login"] = true;
    $.__views.__alloyId24 = Ti.UI.createButton({
        color: "fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId24"
    });
    $.__views.__alloyId21.add($.__views.__alloyId24);
    openRegister ? $.__views.__alloyId24.addEventListener("click", openRegister) : __defers["$.__views.__alloyId24!click!openRegister"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId20,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId23!click!login"] && $.__views.__alloyId23.addEventListener("click", login);
    __defers["$.__views.__alloyId24!click!openRegister"] && $.__views.__alloyId24.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;