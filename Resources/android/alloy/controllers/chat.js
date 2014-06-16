function Controller() {
    function getFriends() {
        var url = mainserver + "/friendships.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get friends : " + this.responseText);
                var parsedText = JSON.parse(this.responseText).friends;
                for (var i = 0; parsedText.length > i; i++) addFriendToTable(parsedText[i].id, parsedText[i].name, "Last");
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
    function addFriendToTable(friend_id, friend_name, position) {
        var row = Ti.UI.createTableViewRow({
            className: "friend_row",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            id: friend_id
        });
        var imageAvatar = Ti.UI.createImageView({
            image: "person.png",
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
            height: "50dp",
            id: friend_id,
            width: "auto",
            color: "#fff",
            left: 60,
            font: {
                fontSize: "19dp",
                fontWeight: "bold"
            }
        });
        row.add(label);
        "First" == position ? $.friendsTable.insertRowBefore(0, row) : $.friendsTable.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    function openChat(friend_id) {
        selected_friend = friend_id;
        Ti.App.SelectedFriend = selected_friend;
        var win = Alloy.createController("chatWindow").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "chat";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.chatFriends = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
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
    var selected_friend;
    $.chatFriends.addEventListener("focus", function() {
        var rd = [];
        $.friendsTable.data = rd;
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