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
                    false == parsedText[i].read && addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id, parsedText[i].id, "accepted");
                    break;

                  case "friend_request_recieved":
                    false == parsedText[i].read && addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id, parsedText[i].id, "recieved");
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
    function addActivitiesToTable(user_name, friend_name, position, friend_id, activity_id, type) {
        var row = Ti.UI.createTableViewRow({
            className: "activity_row",
            color: "white",
            rowID: friend_id,
            backgroundColor: "rgba(0,0,0,0.2)",
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
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
        imageAvatar.addEventListener("click", function() {
            Ti.API.info("You clicked the guy: " + this.id);
            profilemodal(this.id);
        });
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: "You've accepted " + friend_name,
            height: "50dp",
            width: "auto",
            color: "#fff",
            font: {
                fontSize: "19dp",
                fontWeight: "bold"
            }
        });
        var readButton = Ti.UI.createButton({
            title: "x",
            color: "#fff",
            id: activity_id,
            top: 10,
            right: 0,
            width: 20,
            height: 50
        });
        var acceptButton = Ti.UI.createButton({
            title: "✓",
            color: "#fff",
            top: 10,
            right: 30,
            width: 20,
            height: 50
        });
        row.add(label);
        "recieved" == type && row.add(acceptButton);
        row.add(readButton);
        readButton.addEventListener("click", function() {
            Ti.API.info("You marking this as read: " + this.id);
            markAsRead(this.id);
        });
        "First" == position ? $.activityTable.insertRowBefore(0, row) : $.activityTable.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    function profilemodal(userid) {
        var profilewin = Alloy.createController("acceptFriend", {
            userId: userid
        }).getView();
        profilewin.open();
    }
    function markAsRead(activity_id) {
        var url = mainserver + "/read_activity.json?" + activity_id + "&auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
            },
            onerror: function(e) {
                alert("error" + e);
                console.log(e);
            },
            timeout: 6e4
        });
        var params = {
            activity: {
                read: "true"
            }
        };
        client.open("PUT", url);
        client.send(params);
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
        translucent: "false",
        barColor: "#fff",
        title: "Feed",
        id: "activityWindow"
    });
    $.__views.activityWindow && $.addTopLevelView($.__views.activityWindow);
    $.__views.refresh = Ti.UI.createButton({
        color: "#fff",
        id: "refresh",
        title: "Refresh"
    });
    getActivityFeed ? $.__views.refresh.addEventListener("click", getActivityFeed) : __defers["$.__views.refresh!click!getActivityFeed"] = true;
    $.__views.activityWindow.rightNavButton = $.__views.refresh;
    $.__views.feed_area = Ti.UI.createScrollView({
        id: "feed_area",
        layout: "vertical",
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%"
    });
    $.__views.activityWindow.add($.__views.feed_area);
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