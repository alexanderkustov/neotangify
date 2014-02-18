function Controller() {
    function login() {
        console.log("starting to send out the auth shit");
        var url = "http://localhost:3000/auth/identity/callback?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("success " + JSON.parse(this.responseText).user.auth_token);
                auth_token = JSON.parse(this.responseText).user.auth_token;
            },
            onerror: function() {
                alert("error");
            },
            timeout: 6e4
        });
        var params = {
            auth_key: $.login.value,
            password: $.password.value,
            Login: "",
            provider: "identity"
        };
        client.setRequestHeader("enctype", "multipart/form-data");
        client.open("POST", url);
        client.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.login = Ti.UI.createTextField({
        hintText: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "login"
    });
    $.__views.__alloyId3.add($.__views.login);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        passwordMask: "true",
        height: "40",
        width: Ti.UI.FILL,
        id: "password"
    });
    $.__views.__alloyId3.add($.__views.password);
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Login",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    login ? $.__views.__alloyId4.addEventListener("click", login) : __defers["$.__views.__alloyId4!click!login"] = true;
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId6 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 1",
        id: "__alloyId6"
    });
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 1",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        title: "Tab 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId5"
    });
    __alloyId0.push($.__views.__alloyId5);
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 3",
        id: "__alloyId9"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 3",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        title: "Tab 3",
        icon: "KS_nav_ui.png",
        id: "__alloyId8"
    });
    __alloyId0.push($.__views.__alloyId8);
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 4",
        id: "__alloyId12"
    });
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 4",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12,
        title: "Tab 4",
        icon: "KS_nav_ui.png",
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId15 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 5",
        id: "__alloyId15"
    });
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Radar",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15,
        title: "Tab 5",
        icon: "KS_nav_ui.png",
        id: "__alloyId14"
    });
    __alloyId0.push($.__views.__alloyId14);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.__alloyId4!click!login"] && $.__views.__alloyId4.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;