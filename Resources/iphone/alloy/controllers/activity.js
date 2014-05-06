function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                var parsedText = JSON.parse(this.responseText).activities;
                for (var i = 0; parsedText.length > i; i++) switch (parsedText[i].subject_type) {
                  case "Friendship":
                    addActivitiesToTable(parsedText[i].name, parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last");
                    break;

                  default:
                    console.log("default feed stuff");
                }
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("get feed error: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            format: "json"
        };
        client.open("GET", url);
        client.send(params);
    }
    function addActivitiesToTable(activity_name, user_name, friend_name, position) {
        var row = Ti.UI.createTableViewRow({
            className: "activity_row",
            color: "white",
            backgroundColor: "transparent"
        });
        var label = Ti.UI.createLabel({
            text: activity_name + " : " + user_name + " : " + friend_name,
            height: "auto",
            width: "auto",
            color: "#fff",
            font: {
                fontSize: 14,
                fontWeight: "normal"
            }
        });
        row.add(label);
        "First" == position ? $.activityTable.insertRowBefore(0, row) : $.activityTable.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "activity";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.activity = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Activity",
        id: "activity"
    });
    $.__views.activity && $.addTopLevelView($.__views.activity);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.activity.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createButton({
        color: "fff",
        title: "Refresh",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    getActivityFeed ? $.__views.__alloyId1.addEventListener("click", getActivityFeed) : __defers["$.__views.__alloyId1!click!getActivityFeed"] = true;
    $.__views.feed_area = Ti.UI.createScrollView({
        id: "feed_area",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.__alloyId0.add($.__views.feed_area);
    $.__views.status = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "16"
        },
        textAlign: "center",
        left: "5",
        right: "5",
        id: "status"
    });
    $.__views.feed_area.add($.__views.status);
    $.__views.activityTable = Ti.UI.createTableView({
        id: "activityTable",
        backgroundColor: "transparent"
    });
    $.__views.feed_area.add($.__views.activityTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.activityTable.addEventListener("focus", function() {
        var rd = [];
        $.activityTable.data = rd;
        getActivityFeed();
    });
    $.activityTable.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            message: "Accept Friend Request",
            ok: "Yes",
            title: "Friend Request"
        }).show();
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Confirm", "Cancel" ],
            message: "Accept Friendship?",
            title: "Friend Request"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel && Ti.API.info("The cancel button was clicked");
            Ti.API.info("e.cancel: " + e.cancel);
            Ti.API.info("e.source.cancel: " + e.source.cancel);
            Ti.API.info("e.index: " + e.index);
        });
        dialog.show();
    });
    __defers["$.__views.__alloyId1!click!getActivityFeed"] && $.__views.__alloyId1.addEventListener("click", getActivityFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;