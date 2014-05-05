function Controller() {
    function messageRoute(e) {
        console.log(e);
        message = JSON.parse(e.e.data);
        var event = message[0];
        console.log(event);
        var data = message[1];
        console.log("Data" + JSON.stringify(data));
        switch (event) {
          case "message":
            console.log("Message Received");
            text = data.sender.name + ": " + Base64.decode(data.text);
            appendChatMessage(text, "Last");
            break;

          case "conversation_with":
            console.log("Conversation With... Received");
            for (var i = 0; data.length > i; i++) {
                text = data.sender.name + ": " + Base64.decode(data.text);
                appendChatMessage(text, "First");
            }
            break;

          case "auth_response":
            "authentication_success" == message[1]["data"] ? console.log("Authentication Success Received") : console.log("Authentication Failed Received");
            break;

          case "pong":
            console.log("Pong Received");
            break;

          case "connection_success":
            console.log("Connection Success Received");
            break;

          default:
            console.log("WTF is this?");
        }
    }
    function getConversationWith(friend_id) {
        Alloy.Globals.WS.send(JSON.stringify([ "get_conversation_with", {
            user: "a@a.com",
            auth_token: Alloy.Globals.auth_token,
            friend_id: friend_id,
            page: 1
        } ]));
    }
    function sendMsg() {
        appendChatMessage($.textChat.value);
        sendMessage($.textChat.value, selected_friend);
        $.textChat.value = "";
    }
    function sendMessage(message, friend_id) {
        if (!message) return;
        Ti.API.info("Message sent: " + Base64.encode(message) + " frined_id: " + friend_id);
        Alloy.Globals.WS.send(JSON.stringify([ "message", {
            user: "a@a.com",
            auth_token: Alloy.Globals.auth_token,
            receiver_id: friend_id,
            message: Base64.encode(message)
        } ]));
    }
    function appendChatMessage(message, position) {
        var row = Ti.UI.createTableViewRow({
            className: "chat_message",
            color: "white",
            backgroundColor: "transparent"
        });
        var imageAvatar = Ti.UI.createImageView({
            image: "profile.png",
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
            text: message || "no-message",
            height: "auto",
            width: "auto",
            color: "#fff",
            left: 50,
            font: {
                fontSize: 14,
                fontWeight: "normal"
            }
        });
        row.add(label);
        "First" == position ? $.chatArea.insertRowBefore(0, row) : $.chatArea.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    function conversation() {
        getConversationWith(16);
    }
    function getFriends() {
        var url = mainserver + "/friendships.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get friends : " + this.responseText);
                var parsedText = JSON.parse(this.responseText).friends;
                for (var i = 0; parsedText.length > i; i++) {
                    var friendBtn = Titanium.UI.createButton({
                        title: parsedText[i].name,
                        top: 10,
                        width: 100,
                        height: 50,
                        id: parsedText[i].id
                    });
                    friendBtn.addEventListener("click", function() {
                        Titanium.API.info("You clicked on friend " + this.title + this.id);
                        openChat(this.id);
                    });
                    $.friends.add(friendBtn);
                }
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
    function openChat(friend_id) {
        selected_friend = friend_id;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "chat";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.chatWindow = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        id: "chatWindow",
        title: "chat"
    });
    $.__views.chatWindow && $.addTopLevelView($.__views.chatWindow);
    $.__views.friends = Ti.UI.createView({
        layout: "vertical",
        id: "friends"
    });
    $.__views.chatWindow.add($.__views.friends);
    $.__views.chatContaniner = Ti.UI.createScrollView({
        id: "chatContaniner",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.chatWindow.add($.__views.chatContaniner);
    $.__views.chatArea = Ti.UI.createTableView({
        id: "chatArea",
        backgroundColor: "transparent"
    });
    $.__views.chatContaniner.add($.__views.chatArea);
    $.__views.chatBtn = Ti.UI.createView({
        id: "chatBtn",
        layout: "horizontal",
        top: "50%",
        backgroundColor: "#0071bc"
    });
    $.__views.chatWindow.add($.__views.chatBtn);
    $.__views.textChat = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: "60%",
        height: "40",
        hintText: "Enter Message...",
        id: "textChat"
    });
    $.__views.chatBtn.add($.__views.textChat);
    $.__views.__alloyId0 = Ti.UI.createButton({
        color: "fff",
        title: "Snd",
        height: "40",
        width: "20%",
        id: "__alloyId0"
    });
    $.__views.chatBtn.add($.__views.__alloyId0);
    sendMsg ? $.__views.__alloyId0.addEventListener("click", sendMsg) : __defers["$.__views.__alloyId0!click!sendMsg"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        color: "fff",
        title: "Get",
        height: "40",
        width: "20%",
        id: "__alloyId1"
    });
    $.__views.chatBtn.add($.__views.__alloyId1);
    conversation ? $.__views.__alloyId1.addEventListener("click", conversation) : __defers["$.__views.__alloyId1!click!conversation"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var selected_friend;
    Ti.App.addEventListener("app:messageReceived", function(e) {
        messageRoute(e);
    });
    $.textChat.addEventListener("return", function() {
        appendChatMessage($.textChat.value, "Last");
        sendMessage($.textChat.value);
        $.textChat.value = "";
    });
    $.chatWindow.addEventListener("focus", function() {
        getFriends();
    });
    __defers["$.__views.__alloyId0!click!sendMsg"] && $.__views.__alloyId0.addEventListener("click", sendMsg);
    __defers["$.__views.__alloyId1!click!conversation"] && $.__views.__alloyId1.addEventListener("click", conversation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;