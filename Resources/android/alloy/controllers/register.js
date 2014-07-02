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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId41!click!register"] && $.__views.__alloyId41.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;