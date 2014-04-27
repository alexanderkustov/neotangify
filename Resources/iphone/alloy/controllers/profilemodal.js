function Controller() {
    function addFriend() {
        console.log("friends are magical");
        var url = mainserver + "/friendships?format=json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                console.log("enviado para o :" + current_user_id);
            },
            onerror: function(e) {
                alert("Error, try again!");
                Ti.API.info("url: " + url + " error: " + JSON.stringify(e));
            },
            timeout: 6e4
        });
        var params = {
            friend_id: current_user_id,
            format: "json"
        };
        client.open("POST", url);
        client.send(params);
    }
    function goback() {
        var win = Alloy.createController("index").getView();
        win = Alloy.Globals.tabgroup.setActiveTab(2);
        win.open();
    }
    function getFriend(userid) {
        var url = mainserver + "/users/" + userid + ".json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("pessoa selecionada: " + this.responseText);
                console.log("pesosa nome: " + JSON.parse(this.responseText).user.name);
                current_user_id = JSON.parse(this.responseText).user.id;
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
        backgroundImage: "background.jpg",
        color: "#fff",
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
    $.__views.__alloyId33 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId33"
    });
    $.__views.profile_name.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createImageView({
        image: "/login-logo.png",
        height: "160",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId35"
    });
    $.__views.__alloyId33.add($.__views.__alloyId35);
    var __alloyId37 = [];
    var __alloyId38 = {
        title: "Send a Msg",
        ns: "Alloy.Abstract"
    };
    __alloyId37.push(__alloyId38);
    var __alloyId39 = {
        title: "Add Friend",
        ns: "Alloy.Abstract"
    };
    __alloyId37.push(__alloyId39);
    var __alloyId40 = {
        title: "Block",
        ns: "Alloy.Abstract"
    };
    __alloyId37.push(__alloyId40);
    $.__views.bb1 = Ti.UI.iOS.createTabbedBar({
        labels: __alloyId37,
        id: "bb1",
        backgroundColor: "#fff",
        top: "50",
        height: "25",
        width: "300"
    });
    $.__views.__alloyId35.add($.__views.bb1);
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.profile_name,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var current_user_id;
    var args = arguments[0] || {};
    console.log("About to get user with id " + args.userId);
    getFriend(args.userId);
    $.bb1.addEventListener("click", function(e) {
        console.log(e.index);
        (e.index = 1) && addFriend();
    });
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;