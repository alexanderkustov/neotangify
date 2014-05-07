function Controller() {
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var rd = [];
        $.activityTable.data = rd;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                var parsedText = JSON.parse(this.responseText).activities;
                for (var i = 0; parsedText.length > i; i++) switch (parsedText[i].name) {
                  case "friend_request_accepted":
                    false == parsedText[i].read && addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id);
                    break;

                  case "friend_request_recieved":
                    addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id);
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
    function addActivitiesToTable(user_name, friend_name, position, friend_id) {
        var row = Ti.UI.createTableViewRow({
            className: "activity_row",
            color: "white",
            rowID: friend_id,
            backgroundColor: "transparent",
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
        });
        var imageAvatar = Ti.UI.createButton({
            backgroundImage: "profile.png",
            backgroundSelectedImage: "profile.png",
            left: 5,
            top: 5,
            id: friend_id,
            width: 45,
            height: 45,
            borderColor: "#fff",
            borderRadius: 20,
            borderWidth: 1
        });
        imageAvatar.addEventListener("click", function() {
            Ti.API.info("You clicked the guy: " + this.id);
            profilemodal(this.id);
        });
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: "You've accepted " + friend_name,
            height: "auto",
            width: "auto",
            color: "#fff",
            font: {
                fontSize: 14,
                fontWeight: "normal"
            }
        });
        var readButton = Ti.UI.createButton({
            title: "✖",
            color: "#ff0000",
            top: 10,
            right: 0,
            width: 20,
            height: 50
        });
        var acceptButton = Ti.UI.createButton({
            title: "✓",
            color: "#00ff00",
            top: 10,
            right: 30,
            width: 20,
            height: 50
        });
        row.add(label);
        row.add(acceptButton);
        row.add(readButton);
        "First" == position ? $.activityTable.insertRowBefore(0, row) : $.activityTable.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    function profilemodal(userid) {
        var profilewin = Alloy.createController("profilemodal", {
            userId: userid
        }).getView();
        profilewin.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "activity";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.activityWindow = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Feed",
        id: "activityWindow"
    });
    $.__views.activityWindow && $.addTopLevelView($.__views.activityWindow);
    $.__views.refresh = Ti.UI.createButton({
        color: "fff",
        id: "refresh",
        title: "Refresh"
    });
    getActivityFeed ? $.__views.refresh.addEventListener("click", getActivityFeed) : __defers["$.__views.refresh!click!getActivityFeed"] = true;
    $.__views.activityWindow.rightNavButton = $.__views.refresh;
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.activityWindow.add($.__views.__alloyId1);
    $.__views.feed_area = Ti.UI.createScrollView({
        id: "feed_area",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "80%"
    });
    $.__views.__alloyId1.add($.__views.feed_area);
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
    $.activityWindow.addEventListener("focus", function() {
        getActivityFeed();
    });
    __defers["$.__views.refresh!click!getActivityFeed"] && $.__views.refresh.addEventListener("click", getActivityFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;