function Controller() {
    function addFriend() {
        console.log("friends are magical");
    }
    function goback() {
        var win = Alloy.createController("index").getView();
        win.open();
    }
    function getFriend(userid) {
        var url = mainserver + "/users/" + userid + ".json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("pessoa selecionada: " + this.responseText);
                console.log("pesosa nome: " + JSON.parse(this.responseText).user.name);
                $.profile_name.title = JSON.parse(this.responseText).user.name;
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Erro: " + this.responseText);
            },
            timeout: 6e4
        });
        client.open("GET", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profilemodal";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profile_name = Ti.UI.createWindow({
        backgroundColor: "#2980b9",
        color: "fff",
        id: "profile_name",
        title: ""
    });
    $.__views.back = Ti.UI.createButton({
        color: "fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.profile_name.leftNavButton = $.__views.back;
    $.__views.__alloyId31 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.profile_name.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createButton({
        color: "fff",
        title: "Add Friend",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId33"
    });
    $.__views.__alloyId31.add($.__views.__alloyId33);
    addFriend ? $.__views.__alloyId33.addEventListener("click", addFriend) : __defers["$.__views.__alloyId33!click!addFriend"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.profile_name,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userid = arguments[0] || {};
    console.log(userid.args1 + " arguments:  " + arguments[0]);
    getFriend(userid.args1);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId33!click!addFriend"] && $.__views.__alloyId33.addEventListener("click", addFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;