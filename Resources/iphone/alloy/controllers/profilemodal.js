function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

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
    function isFriend() {}
    function getFriend(userid) {
        var url = mainserver + "/users/" + userid + ".json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("pessoa selecionada: " + this.responseText);
                console.log("pesosa nome: " + JSON.parse(this.responseText));
                current_user_id = JSON.parse(this.responseText).user.id;
                null != JSON.parse(this.responseText).user.presentation_picture.thumb.url && ($.person_picture.image = mainserver + JSON.parse(this.responseText).user.presentation_picture.thumb.url);
                null != JSON.parse(this.responseText).user.cover_picture.small.url && ($.cover_picture.image = mainserver + JSON.parse(this.responseText).user.cover_picture.small.url);
                isFriend || $.addFriend.hide();
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
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win_profilemodal = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        navBarHidden: "true",
        id: "win_profilemodal",
        title: ""
    });
    $.__views.win_profilemodal && $.addTopLevelView($.__views.win_profilemodal);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId11"
    });
    $.__views.win_profilemodal.add($.__views.__alloyId11);
    $.__views.cover_picture = Ti.UI.createImageView({
        id: "cover_picture",
        image: "/tangy_back2.jpg",
        zIndex: "1",
        height: "160",
        top: "-50",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId11.add($.__views.cover_picture);
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
    $.__views.__alloyId11.add($.__views.person_picture);
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: "80",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.borderBtn = Ti.UI.createButton({
        color: "#fff",
        borderWidth: "1",
        borderColor: "white",
        borderRadius: "3",
        title: "Send a Message",
        top: "10px",
        id: "borderBtn",
        paddingLeft: "5",
        paddingRight: "5"
    });
    $.__views.__alloyId12.add($.__views.borderBtn);
    sendMsg ? $.__views.borderBtn.addEventListener("click", sendMsg) : __defers["$.__views.borderBtn!click!sendMsg"] = true;
    $.__views.borderBtn = Ti.UI.createButton({
        color: "#fff",
        borderWidth: "1",
        borderColor: "white",
        borderRadius: "3",
        title: "Add a Friend",
        left: "10px",
        top: "10px",
        paddingLeft: "5",
        paddingRight: "5",
        id: "borderBtn"
    });
    $.__views.__alloyId12.add($.__views.borderBtn);
    addFriend ? $.__views.borderBtn.addEventListener("click", addFriend) : __defers["$.__views.borderBtn!click!addFriend"] = true;
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Go Back",
        id: "back"
    });
    $.__views.__alloyId13.add($.__views.back);
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var current_user_id;
    var args = arguments[0] || {};
    console.log("About to get user with id " + args.userId);
    getFriend(args.userId);
    __defers["$.__views.borderBtn!click!sendMsg"] && $.__views.borderBtn.addEventListener("click", sendMsg);
    __defers["$.__views.borderBtn!click!addFriend"] && $.__views.borderBtn.addEventListener("click", addFriend);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;