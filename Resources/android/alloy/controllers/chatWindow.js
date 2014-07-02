function Controller() {
    function goback() {
        $.win_chat.close();
        $.win_chat = null;
    }
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
            appendChatMessage(text, "Last", false);
            break;

          case "conversation_with":
            console.log("Conversation With... Received");
            appendChatConversation(data);
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
            user: Alloy.Globals.user_email,
            auth_token: Alloy.Globals.auth_token,
            friend_id: friend_id,
            page: 1
        } ]));
    }
    function sendMessage(message, friend_id) {
        if (!message) return;
        Ti.API.info("Message sent: " + Base64.encode(message) + " friend_id: " + friend_id + " auth_token" + Alloy.Globals.auth_token);
        Alloy.Globals.WS.send(JSON.stringify([ "message", {
            user: Alloy.Globals.user_email,
            auth_token: Alloy.Globals.auth_token,
            receiver_id: friend_id,
            message: Base64.encode(message)
        } ]));
    }
    function appendChatMessage(message, position) {
        var row = Ti.UI.createTableViewRow({
            className: "chat_message",
            color: "white",
            backgroundColor: "transparent",
            selecttionStyle: "none"
        });
        var imageAvatar = Ti.UI.createButton({
            backgroundImage: "person.png",
            backgroundSelectedImage: "person.png",
            left: 5,
            top: 5,
            id: friend_id,
            width: 45,
            height: 45,
            borderColor: "#fff",
            borderRadius: 20,
            borderWidth: 1
        });
        null != Alloy.Globals.user_pic && (imageAvatar.image = mainserver + Alloy.Globals.user_pic);
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: message || "no-message",
            height: "50dp",
            width: "auto",
            color: "#fff",
            left: 50,
            font: {
                fontSize: "19dp",
                fontWeight: "bold"
            }
        });
        row.add(label);
        if ("First" == position) if (0 == $.chatArea.data.length) $.chatArea.appendRow(row); else {
            $.chatArea.insertRowBefore(0, row);
            $.chatArea.scrollToIndex($.chatArea.data[0].rows.length - 1);
        } else {
            $.chatArea.appendRow(row);
            $.chatArea.scrollToIndex($.chatArea.data[0].rows.length - 1);
        }
        row = null;
        imageAvatar = null;
        label = null;
    }
    function appendChatConversation(data) {
        var rows = [];
        for (var i = 0; data.length > i; i++) {
            text = data[i].sender.name + ": " + data[i].text;
            var row = Ti.UI.createTableViewRow({
                className: "chat_message",
                color: "white",
                backgroundColor: "transparent",
                selecttionStyle: "none"
            });
            var imageAvatar = Ti.UI.createButton({
                backgroundImage: "person.png",
                id: "cover_picture",
                backgroundSelectedImage: "person.png",
                left: 5,
                top: 5,
                id: friend_id,
                width: 45,
                height: 45,
                borderColor: "#fff",
                borderRadius: 20,
                borderWidth: 1
            });
            null != Alloy.Globals.user_pic && data[i].sender.id == Alloy.Globals.user_id && (imageAvatar.image = mainserver + Alloy.Globals.user_pic);
            row.add(imageAvatar);
            var label = Ti.UI.createLabel({
                text: text || "no-message",
                height: "50dp",
                width: "auto",
                color: "#fff",
                left: 50,
                font: {
                    fontSize: "19dp",
                    fontWeight: "bold"
                }
            });
            row.add(label);
            rows.push(row);
            row = null;
            imageAvatar = null;
            label = null;
        }
        $.chatArea.data = rows;
        $.chatArea.scrollToIndex($.chatArea.data[0].rows.length - 1);
        rows = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "chatWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var friend_id = Ti.App.SelectedFriend;
    Ti.App.addEventListener("app:messageReceived", function(e) {
        messageRoute(e);
    });
    $.textChat.addEventListener("return", function() {
        if ("" == $.textChat.value) console.log("Está vazio"); else {
            appendChatMessage(Alloy.Globals.user_name + ": " + $.textChat.value, "Last", true);
            sendMessage($.textChat.value, friend_id);
            $.textChat.value = "";
        }
    });
    $.chatWindow.addEventListener("focus", function() {
        getConversationWith(friend_id);
    });
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;