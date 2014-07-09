function Controller() {
    function login() {
        var url = mainserver + "/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
                Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
                Alloy.Globals.user_name = JSON.parse(this.responseText).user.name;
                Alloy.Globals.user_email = JSON.parse(this.responseText).user.email;
                Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate;
                Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description;
                Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.thumb.url;
                Alloy.Globals.cover_picture = JSON.parse(this.responseText).user.cover_picture.small.url;
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
        $.win1 = null;
        var win = Alloy.createController("register").getView();
        win.open();
    }
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "loginWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginWindow = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        id: "loginWindow"
    });
    $.__views.loginWindow && $.addTopLevelView($.__views.loginWindow);
    $.__views.mainLogin = Ti.UI.createScrollView({
        id: "mainLogin",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%"
    });
    $.__views.loginWindow.add($.__views.mainLogin);
    $.__views.__alloyId9 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        top: "80px",
        id: "__alloyId9"
    });
    $.__views.mainLogin.add($.__views.__alloyId9);
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
    $.__views.loginBtn = Ti.UI.createButton({
        color: "#fff",
        borderWidth: "1",
        borderColor: "white",
        borderRadius: "3",
        top: "10px",
        left: "20px",
        title: "Login",
        height: "40",
        width: "93%",
        id: "loginBtn"
    });
    $.__views.mainLogin.add($.__views.loginBtn);
    login ? $.__views.loginBtn.addEventListener("click", login) : __defers["$.__views.loginBtn!click!login"] = true;
    $.__views.facebookBtn = Ti.UI.createButton({
        color: "#fff",
        borderWidth: "1",
        borderColor: "white",
        backgroundColor: "#4c66a4",
        borderRadius: "3",
        top: "10px",
        title: "Facebook Login",
        height: "40",
        width: "93%",
        left: "20px",
        id: "facebookBtn"
    });
    $.__views.mainLogin.add($.__views.facebookBtn);
    facebookLogin ? $.__views.facebookBtn.addEventListener("click", facebookLogin) : __defers["$.__views.facebookBtn!click!facebookLogin"] = true;
    $.__views.regButton = Ti.UI.createButton({
        color: "#fff",
        top: "10px",
        left: "20px",
        title: "Register",
        height: "40",
        width: "93%",
        id: "regButton"
    });
    $.__views.mainLogin.add($.__views.regButton);
    openRegister ? $.__views.regButton.addEventListener("click", openRegister) : __defers["$.__views.regButton!click!openRegister"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.loginBtn!click!login"] && $.__views.loginBtn.addEventListener("click", login);
    __defers["$.__views.facebookBtn!click!facebookLogin"] && $.__views.facebookBtn.addEventListener("click", facebookLogin);
    __defers["$.__views.regButton!click!openRegister"] && $.__views.regButton.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;