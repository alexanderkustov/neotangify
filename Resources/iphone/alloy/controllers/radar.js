function Controller() {
    function geolocate() {
        var cur_longitude, cur_latitude;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            cur_longitude = e.coords.longitude;
            cur_latitude = e.coords.latitude;
            console.log("current location long " + cur_longitude.toFixed(3) + " lat " + cur_latitude.toFixed(3));
            changePosition(cur_longitude, cur_latitude);
        });
    }
    function changePosition(lat, longi) {
        var url = mainserver + "/change_position.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                updateRadar(lat, longi);
            },
            onerror: function(e) {
                alert("error" + e);
            },
            timeout: 6e4
        });
        var params = {
            latitude: lat,
            longitude: longi
        };
        client.open("POST", url);
        client.send(params);
    }
    function updateRadar(lat, longi) {
        var url = mainserver + "/people_nearby.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("update radar text: " + this.responseText);
                Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                    var persons_id = JSON.parse(this.responseText).people[i].id;
                    var personView = Ti.UI.createView({
                        top: 40 * i,
                        id: JSON.parse(this.responseText).people[i].id
                    });
                    var face = Ti.UI.createImageView({
                        image: "/person.png",
                        top: 30 + i,
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    });
                    personView.addEventListener("click", function() {
                        profilemodal(this.id);
                        console.log("gaja a passar para modal: " + persons_id);
                    });
                    personView.add(face);
                    $.radar.add(personView);
                }
            },
            onerror: function(e) {
                alert("error" + e);
                Ti.API.info("Get radar error: " + this.responseText);
            },
            timeout: 6e4
        });
        var params = {
            latitude: lat,
            longitude: longi
        };
        client.open("GET", url);
        client.send(params);
    }
    function profilemodal(userid) {
        var userNumber = userid;
        console.log(userNumber + " este e o user");
        var profilewin = Alloy.createController("profilemodal", {
            userId: userNumber
        }).getView();
        profilewin.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        $.index.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "radar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.radar_window = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "tangify",
        id: "radar_window"
    });
    $.__views.radar_window && $.addTopLevelView($.__views.radar_window);
    $.__views.__alloyId40 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId40"
    });
    $.__views.radar_window.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createButton({
        color: "fff",
        title: "Geolocate",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    geolocate ? $.__views.__alloyId41.addEventListener("click", geolocate) : __defers["$.__views.__alloyId41!click!geolocate"] = true;
    $.__views.radar = Ti.UI.createView({
        id: "radar",
        width: "460px",
        height: "460px",
        backgroundImage: "/radar_back.png"
    });
    $.__views.__alloyId40.add($.__views.radar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.radar_window.addEventListener("focus", function() {
        geolocate();
    });
    __defers["$.__views.__alloyId41!click!geolocate"] && $.__views.__alloyId41.addEventListener("click", geolocate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;