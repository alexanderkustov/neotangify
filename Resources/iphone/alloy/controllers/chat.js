function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getFriends() {
        var url = mainserver + "/friendships.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get friends : " + this.responseText);
                var parsedText = JSON.parse(this.responseText).friends;
                var person_image;
                for (var i = 0; parsedText.length > i; i++) {
                    if (null != parsedText[i].presentation_picture.url) {
                        person_image = mainserver + parsedText[i].presentation_picture.url;
                        Ti.App.FriendPicture = person_image;
                    } else person_image = "person.png";
                    Ti.App.FriendPicture = person_image;
                    console.log(person_image + " : " + Ti.App.FriendPicture);
                    addFriendToTable(parsedText[i].id, parsedText[i].name, "Last", person_image);
                }
                parsedText = null;
                person_image = null;
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("get friends error: " + this.responseText);
            },
            timeout: 6e4
        });
        client.open("GET", url);
        client.send();
    }
    function addFriendToTable(friend_id, friend_name, position, presentation_picture) {
        var row = Ti.UI.createTableViewRow({
            className: "friend_row",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            id: friend_id,
            separatorColor: "transparent",
            backgroundColor: "rgba(0,0,0,0.2)"
        });
        var imageAvatar = Ti.UI.createImageView({
            image: presentation_picture,
            left: 5,
            top: 5,
            width: 45,
            height: 45,
            borderColor: "#fff",
            borderRadius: 20,
            borderWidth: 1
        });
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: friend_name,
            height: "auto",
            id: friend_id,
            width: "auto",
            color: "#fff",
            left: 60,
            font: {
                fontSize: 14,
                fontWeight: "normal"
            }
        });
        row.add(label);
        if ("First" == position) $.friendsTable.insertRowBefore(0, row); else {
            $.friendsTable.appendRow(row);
            $.friendsTable.scrollToIndex($.friendsTable.data[0].rows.length - 1);
        }
        row = null;
        label = null;
        imageAvatar = null;
    }
    function openChat(friend_id) {
        Ti.App.SelectedFriend = friend_id;
        var win = Alloy.createController("chatWindow").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "chat";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.chatFriends = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        id: "chatFriends",
        title: "Chat"
    });
    $.__views.chatFriends && $.addTopLevelView($.__views.chatFriends);
    $.__views.chatContaniner = Ti.UI.createScrollView({
        id: "chatContaniner",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%"
    });
    $.__views.chatFriends.add($.__views.chatContaniner);
    $.__views.friendsTable = Ti.UI.createTableView({
        id: "friendsTable",
        backgroundColor: "transparent"
    });
    $.__views.chatContaniner.add($.__views.friendsTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.chatFriends.addEventListener("focus", friendsFocuslistener = function() {
        $.friendsTable.data = [];
        getFriends();
    });
    $.friendsTable.addEventListener("click", function(e) {
        Ti.API.info("row clicked: " + e.rowData.id + " index : " + e.index + " texto: " + e.rowData.text);
        openChat(e.rowData.id);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;