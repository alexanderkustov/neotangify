function Controller() {
    function sendMsg() {
        Ti.App.SelectedFriend = current_user_id;
        var win = Alloy.createController("chatWindow").getView();
        win.open();
    }
    function addFriend() {
        console.log("friends are magical");
        var url = mainserver + "/friendships.json";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                console.log("enviado para o :" + current_user_id);
                alert("Friend Request Sent!");
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
                $.profile_name.short_description = JSON.parse(this.responseText).user.short_description;
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
        translucent: "false",
        barColor: "#fff",
        id: "profile_name",
        title: ""
    });
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.profile_name.leftNavButton = $.__views.back;
    $.__views.__alloyId34 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId34"
    });
    $.__views.profile_name.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createImageView({
        image: "/tangy_back.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL,
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderRadius: "50%",
        borderWidth: "3",
        borderColor: "white",
        id: "__alloyId36"
    });
    $.__views.__alloyId34.add($.__views.__alloyId36);
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Send a Message",
        id: "back"
    });
    $.__views.__alloyId34.add($.__views.back);
    sendMsg ? $.__views.back.addEventListener("click", sendMsg) : __defers["$.__views.back!click!sendMsg"] = true;
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Add a Friend",
        id: "back"
    });
    $.__views.__alloyId34.add($.__views.back);
    addFriend ? $.__views.back.addEventListener("click", addFriend) : __defers["$.__views.back!click!addFriend"] = true;
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
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.back!click!sendMsg"] && $.__views.back.addEventListener("click", sendMsg);
    __defers["$.__views.back!click!addFriend"] && $.__views.back.addEventListener("click", addFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;