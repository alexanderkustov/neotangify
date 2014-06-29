function Controller() {
    function facebookLogin() {
        var fb = require("facebook");
        fb.appid = 391052681038594;
        fb.permissions = [ "email, public_profile, user_friends " ];
        fb.forceDialogAuth = true;
        fb.addEventListener("login", function(e) {
            e.success ? fb.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var response = JSON.parse(e.result);
                    var email = response.email;
                    var age = response.age;
                    var name = response.name;
                    var gender = response.gender;
                    alert(name + " " + email + " " + gender + " " + age);
                    autologin(email, email);
                } else e.error ? alert(e.error) : alert("Unknown response");
            }) : e.error ? alert(e.error) : e.cancelled && alert("Canceled");
        });
        fb.authorize();
    }
    function login() {
        var url = mainserver + "/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
                Ti.API.info("auth token:" + Alloy.Globals.auth_token);
                Alloy.Globals.user_name = JSON.parse(this.responseText).user.name;
                Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate;
                Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description;
                Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
                var win = Alloy.createController("index").getView();
                $.win1.close();
                win.open();
            },
            onerror: function(e) {
                alert("Error, try again!");
                Ti.API.info("url: " + url + " error: " + JSON.stringify(e));
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.loginInput.value.toLowerCase(),
            password: $.password.value,
            provider: "identity",
            Login: "",
            format: "json"
        };
        Ti.App.Properties.setString("saved_login", $.loginInput.value.toLowerCase());
        Ti.App.Properties.setString("saved_pw", $.password.value);
        Ti.API.info("The value of the stuff saved: " + Ti.App.Properties.getString("saved_login") + " pw: " + Ti.App.Properties.getString("saved_pw"));
        client.open("POST", url);
        client.send(params);
    }
    function openRegister() {
        $.win1.close();
        $.win1 = null;
        var win = Alloy.createController("register").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId25 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        id: "__alloyId25"
    });
    $.__views.myTitleLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#333",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        backgroundColor: "#fff",
        text: "Please Login",
        id: "myTitleLabel"
    });
    $.__views.__alloyId25.titleControl = $.__views.myTitleLabel;
    $.__views.mainLogin = Ti.UI.createScrollView({
        id: "mainLogin",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%"
    });
    $.__views.__alloyId25.add($.__views.mainLogin);
    $.__views.__alloyId27 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        id: "__alloyId27"
    });
    $.__views.mainLogin.add($.__views.__alloyId27);
    $.__views.loginInput = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        value: "a@a.com",
        id: "loginInput"
    });
    $.__views.mainLogin.add($.__views.loginInput);
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
        id: "password",
        value: "123"
    });
    $.__views.mainLogin.add($.__views.password);
    $.__views.__alloyId28 = Ti.UI.createButton({
        color: "#fff",
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId28"
    });
    $.__views.mainLogin.add($.__views.__alloyId28);
    login ? $.__views.__alloyId28.addEventListener("click", login) : __defers["$.__views.__alloyId28!click!login"] = true;
    $.__views.__alloyId29 = Ti.UI.createButton({
        color: "#fff",
        title: "Register",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId29"
    });
    $.__views.mainLogin.add($.__views.__alloyId29);
    openRegister ? $.__views.__alloyId29.addEventListener("click", openRegister) : __defers["$.__views.__alloyId29!click!openRegister"] = true;
    $.__views.__alloyId30 = Ti.UI.createButton({
        color: "#fff",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId30"
    });
    $.__views.mainLogin.add($.__views.__alloyId30);
    facebookLogin ? $.__views.__alloyId30.addEventListener("click", facebookLogin) : __defers["$.__views.__alloyId30!click!facebookLogin"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId25,
        id: "win1",
        exitOnClose: "true"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loginInput.addEventListener("click", function() {
        $.loginInput.keyboardType = Titanium.UI.KEYBOARD_EMAIL;
        $.loginInput.focus();
    });
    __defers["$.__views.__alloyId28!click!login"] && $.__views.__alloyId28.addEventListener("click", login);
    __defers["$.__views.__alloyId29!click!openRegister"] && $.__views.__alloyId29.addEventListener("click", openRegister);
    __defers["$.__views.__alloyId30!click!facebookLogin"] && $.__views.__alloyId30.addEventListener("click", facebookLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;