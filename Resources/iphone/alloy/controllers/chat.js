function Controller() {
    function sendMsg() {
        appendChatMessage($.textChat.value);
        sendMessage($.textChat.value);
        $.textChat.value = "";
    }
    function sendMessage(message) {
        if (!message) return;
        Ti.API.info("Message sent: " + Base64.encode(message));
        Alloy.Globals.WS.send(JSON.stringify([ "message", {
            from: "2",
            to: "253",
            auth_token: "g2NnWq4GipQknAzHnWNh9Q",
            message: Base64.encode(message)
        } ]));
    }
    function appendChatMessage(message) {
        var row = Ti.UI.createTableViewRow({
            className: "chat_message",
            backgroundGradient: {
                type: "linear",
                colors: [ "#fff", "#eeeeed" ],
                startPoint: {
                    x: 0,
                    y: 0
                },
                endPoint: {
                    x: 0,
                    y: 70
                },
                backFillStart: false
            }
        });
        var imageAvatar = Ti.UI.createImageView({
            image: "profile.png",
            left: 10,
            top: 5,
            width: 50,
            height: 50,
            borderColor: "#fff",
            borderRadius: 50,
            borderWidth: 3
        });
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: message || "no-message",
            height: "auto",
            width: "auto",
            color: "#111",
            left: 50,
            font: {
                fontSize: 14,
                fontWeight: "normal"
            }
        });
        row.add(label);
        $.chatArea.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.insertRowBefore(0, row);
        $.chatArea.scrollToIndex(11);
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
        id: "chatArea"
    });
    $.__views.chatContaniner.add($.__views.chatArea);
    $.__views.chatBtn = Ti.UI.createView({
        id: "chatBtn",
        layout: "horizontal",
        top: "80%",
        backgroundColor: "#0071bc"
    });
    $.__views.chatWindow.add($.__views.chatBtn);
    $.__views.textChat = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: "70%",
        height: "40",
        hintText: "Enter Message...",
        id: "textChat"
    });
    $.__views.chatBtn.add($.__views.textChat);
    $.__views.__alloyId0 = Ti.UI.createButton({
        color: "fff",
        title: "Send",
        height: "40",
        width: "20%",
        id: "__alloyId0"
    });
    $.__views.chatBtn.add($.__views.__alloyId0);
    sendMsg ? $.__views.__alloyId0.addEventListener("click", sendMsg) : __defers["$.__views.__alloyId0!click!sendMsg"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.textChat.addEventListener("return", function() {
        appendChatMessage($.textChat.value);
        sendMessage($.textChat.value);
        $.textChat.value = "";
    });
    appendChatMessage("Hello");
    __defers["$.__views.__alloyId0!click!sendMsg"] && $.__views.__alloyId0.addEventListener("click", sendMsg);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;