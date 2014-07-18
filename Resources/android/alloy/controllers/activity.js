function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function acceptFriendship(friend_id) {
        var url = mainserver + "/friendship_accept.json?friend_id=" + friend_id + "&auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("Success,you are no longer alone!");
            },
            onerror: function(e) {
                alert("error" + JSON.stringify(e));
                console.log(e);
            },
            timeout: 6e4
        });
        client.open("POST", url);
        client.send();
    }
    function getActivityFeed() {
        var url = mainserver + "/activities.json?" + "auth_token=" + Alloy.Globals.auth_token;
        console.log(url);
        var rd = [];
        $.activityTable.data = rd;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Get feed text: " + this.responseText);
                var parsedText = JSON.parse(this.responseText).activities;
                for (var i = 0; parsedText.length > i; i++) {
                    if (null != parsedText[i].subject.friend.presentation_picture) {
                        friend_image = mainserver + parsedText[i].subject.friend.presentation_picture;
                        console.log(friend_image);
                    } else friend_image = "person.png";
                    console.log(friend_image);
                    switch (parsedText[i].name) {
                      case "friend_request_accepted":
                        false == parsedText[i].read && ("from" === parsedText[i].direction ? addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id, parsedText[i].id, "accepted", friend_image) : addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.friend.id, parsedText[i].id, "accepted", friend_image));
                        break;

                      case "friend_request_received":
                        false == parsedText[i].read && ("from" === parsedText[i].direction ? addActivitiesToTable(parsedText[i].subject.friend.name, parsedText[i].subject.user.name, "Last", parsedText[i].subject.user.id, parsedText[i].id, "recieved", friend_image) : addActivitiesToTable(parsedText[i].subject.user.name, parsedText[i].subject.friend.name, "Last", parsedText[i].subject.user.id, parsedText[i].id, "recieved", friend_image));
                        console.log(parsedText[i].subject.friend.id + " : " + parsedText[i].subject.user.id);
                        break;

                      default:
                        console.log("default feed stuff");
                    }
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
    function addActivitiesToTable(user_name, friend_name, position, friend_id, activity_id, type, friend_image) {
        function profilemodal(userid) {
            console.log(userid + " este e o user");
            var profilewin = Alloy.createController("profilemodal", {
                userId: userid
            }).getView();
            profilewin.open();
        }
        var row = Ti.UI.createTableViewRow({
            className: "activity_row",
            color: "white",
            rowID: friend_id,
            height: 70,
            backgroundColor: "transparent",
            separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
        });
        var imageAvatar = Ti.UI.createButton({
            backgroundImage: friend_image,
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
            profilemodal(this.id);
        });
        row.add(imageAvatar);
        var label = Ti.UI.createLabel({
            text: "Request " + type + " " + friend_name,
            height: "50dp",
            width: "auto",
            left: 55,
            top: 15,
            color: "#fff",
            font: {
                fontSize: "15dp"
            }
        });
        var readButton = Ti.UI.createButton({
            title: "Ignore",
            color: "#fff",
            id: activity_id,
            top: 30,
            right: 0
        });
        var acceptButton = Ti.UI.createButton({
            title: "Accept",
            color: "#fff",
            id: friend_id,
            top: 30,
            right: 50
        });
        row.add(label);
        "recieved" === type && row.add(acceptButton);
        row.add(readButton);
        readButton.addEventListener("click", function() {
            Ti.API.info("You marking this as read: " + this.id);
            markAsRead(this.id);
        });
        acceptButton.addEventListener("click", function() {
            Ti.API.info("You accepting this friend request: " + this.id);
            acceptFriendship(this.id);
        });
        "First" == position ? $.activityTable.insertRowBefore(0, row) : $.activityTable.appendRow(row, {
            animationStyle: Titanium.UI.iPhone.RowAnimationStyle.RIGHT
        });
    }
    function markAsRead(activity_id) {
        var url = mainserver + "/read_activity.json?activity_id=" + activity_id + "&auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                getActivityFeed();
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
        client.open("POST", url);
        client.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "activity";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.activityWindow = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        navBarHidden: "true",
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
    $.activityWindow.addEventListener("focus", activityListener = function() {
        getActivityFeed();
        $.activityWindow.removeEventListener("focus", activityListener);
        activityListener = null;
    });
    __defers["$.__views.refresh!click!getActivityFeed"] && $.__views.refresh.addEventListener("click", getActivityFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;