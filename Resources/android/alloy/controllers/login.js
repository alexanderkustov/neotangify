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
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loginInput.addEventListener("click", function() {
        $.loginInput.blur();
        $.loginInput.keyboardType = Titanium.UI.KEYBOARD_EMAIL;
        $.loginInput.focus();
    });
    __defers["$.__views.__alloyId29!click!login"] && $.__views.__alloyId29.addEventListener("click", login);
    __defers["$.__views.__alloyId30!click!openRegister"] && $.__views.__alloyId30.addEventListener("click", openRegister);
    __defers["$.__views.__alloyId31!click!facebookLogin"] && $.__views.__alloyId31.addEventListener("click", facebookLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;