function Controller() {
    function sendMsg() {
        var message = $.textChat.value;
        var chatMsg = Ti.UI.createLabel({
            color: "#ffffff",
            font: {
                fontSize: 14
            },
            text: Alloy.Globals.user_name + ":" + message,
            top: 25,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        "" != message && Alloy.Globals.WS.send(JSON.stringify([ "message", {
            from: "eu",
            to: "Outro",
            message: Base64.encode(message)
        } ]));
        $.chatArea.add(chatMsg);
        $.textChat.value = "";
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
        backgroundColor: "#2980b9",
        color: "fff",
        id: "chatWindow",
        title: "chat"
    });
    $.__views.chatWindow && $.addTopLevelView($.__views.chatWindow);
    $.__views.chatArea = Ti.UI.createScrollView({
        id: "chatArea",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.chatWindow.add($.__views.chatArea);
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
    __defers["$.__views.__alloyId0!click!sendMsg"] && $.__views.__alloyId0.addEventListener("click", sendMsg);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;