function Controller() {
    function login() {
        var url = mainserver + "/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                var win = Alloy.createController("index").getView();
                win.open();
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
                console.log(auth_token);
            },
            onerror: function(e) {
                alert("Error, try again!");
                Ti.API.info("url: " + url + " error: " + JSON.stringify(e));
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.login.value,
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
    $.__views.__alloyId18 = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        title: "Please login",
        id: "__alloyId18"
    });
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.login = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "login"
    });
    $.__views.__alloyId19.add($.__views.login);
    $.__views.password = Ti.UI.createTextField({
        color: "#fff",
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId19.add($.__views.password);
    $.__views.__alloyId21 = Ti.UI.createButton({
        color: "fff",
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId21"
    });
    $.__views.__alloyId19.add($.__views.__alloyId21);
    login ? $.__views.__alloyId21.addEventListener("click", login) : __defers["$.__views.__alloyId21!click!login"] = true;
    $.__views.__alloyId22 = Ti.UI.createButton({
        color: "fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId22"
    });
    $.__views.__alloyId19.add($.__views.__alloyId22);
    openRegister ? $.__views.__alloyId22.addEventListener("click", openRegister) : __defers["$.__views.__alloyId22!click!openRegister"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId18,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId21!click!login"] && $.__views.__alloyId21.addEventListener("click", login);
    __defers["$.__views.__alloyId22!click!openRegister"] && $.__views.__alloyId22.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;