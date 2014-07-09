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
        $.win_profilemodal.remove($.cover_picture);
        $.win_profilemodal.remove($.person_picture);
        if ($.win_profilemodal.children) for (var c = $.win_profilemodal.children.length - 1; c >= 0; c--) {
            $.win_profilemodal.remove($.win_profilemodal.children[c]);
            $.win_profilemodal.children[c] = null;
        }
        $.win_profilemodal.close();
        $.win_profilemodal = null;
    }
    function getFriend(userid) {
        var url = mainserver + "/users/" + userid + ".json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("pessoa selecionada: " + this.responseText);
                console.log("pesosa nome: " + JSON.parse(this.responseText));
                current_user_id = JSON.parse(this.responseText).user.id;
                $.user_name.text = JSON.parse(this.responseText).user.name;
                $.short_description.text = JSON.parse(this.responseText).user.short_description;
                null != JSON.parse(this.responseText).user.presentation_picture.thumb.url && ($.person_picture.image = mainserver + JSON.parse(this.responseText).user.presentation_picture.thumb.url);
                null != JSON.parse(this.responseText).user.cover_picture.small.url && ($.cover_picture.image = mainserver + JSON.parse(this.responseText).user.cover_picture.small.url);
                console.log($.profile_name.person_picture);
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
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId12"
    });
    $.__views.profile_name.add($.__views.__alloyId12);
    $.__views.cover_picture = Ti.UI.createImageView({
        id: "cover_picture",
        image: "/tangy_back2.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId12.add($.__views.cover_picture);
    $.__views.person_picture = Ti.UI.createImageView({
        image: "/person.png",
        zIndex: "5",
        top: "-50",
        borderWidth: "3",
        borderColor: "white",
        width: "200",
        height: "200",
        id: "person_picture"
    });
    $.__views.__alloyId12.add($.__views.person_picture);
    $.__views.user_name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "user_name"
    });
    $.__views.__alloyId12.add($.__views.user_name);
    $.__views.birthdate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "birthdate"
    });
    $.__views.__alloyId12.add($.__views.birthdate);
    $.__views.short_description = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "short_description"
    });
    $.__views.__alloyId12.add($.__views.short_description);
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Send a Message",
        id: "back"
    });
    $.__views.__alloyId12.add($.__views.back);
    sendMsg ? $.__views.back.addEventListener("click", sendMsg) : __defers["$.__views.back!click!sendMsg"] = true;
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Add a Friend",
        id: "back"
    });
    $.__views.__alloyId12.add($.__views.back);
    addFriend ? $.__views.back.addEventListener("click", addFriend) : __defers["$.__views.back!click!addFriend"] = true;
    $.__views.win_profilemodal = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.profile_name,
        id: "win_profilemodal"
    });
    $.__views.win_profilemodal && $.addTopLevelView($.__views.win_profilemodal);
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