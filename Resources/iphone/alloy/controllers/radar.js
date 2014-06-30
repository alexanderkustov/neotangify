function Controller() {
    function geolocate() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            cur_long = e.coords.longitude;
            cur_lat = e.coords.latitude;
            console.log("Tua posicao " + cur_long + " " + cur_lat);
            changePosition(cur_lat, cur_long);
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
        clearRadar();
        var url = mainserver + "/people_nearby.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                if (JSON.parse(this.responseText).people.length > 0) for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                    var persons_id = JSON.parse(this.responseText).people[i].id;
                    var persons_name = JSON.parse(this.responseText).people[i].name;
                    var lat = JSON.parse(this.responseText).people[i].position.latitude;
                    var longi = JSON.parse(this.responseText).people[i].position.longitude;
                    if (persons_id != Alloy.Globals.user_id) {
                        Ti.API.info("pessoa: " + persons_id + " nome " + persons_name + " " + lat + " " + longi);
                        addPersonToRadar(persons_id, lat, longi, i);
                    }
                    addClickstoRadar();
                } else alert("Nobody's here");
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
    function addPersonToRadar(personId, lat, longi) {
        var thisPerson = personId;
        var dlat = cur_lat - lat;
        var dlong = cur_long - longi;
        var topOffset = -1 * 200 * (dlat / LATCONV / 25);
        var leftOffset = -1 * 200 * (dlong / LONGCONV / 25);
        var personView = Ti.UI.createView({
            id: thisPerson,
            myIndex: thisPerson,
            top: topOffset,
            left: leftOffset
        });
        var face = Ti.UI.createImageView({
            image: "/person.png",
            id: thisPerson,
            width: 30,
            height: 30,
            borderRadius: 15
        });
        personView.add(face);
        $.radar.add(personView);
    }
    function addClickstoRadar() {
        if ($.radar.children) {
            console.log($.radar.children);
            console.log(JSON.stringify($.radar.children));
            for (var i = 0; $.radar.children.length > i; i++) {
                console.log($.radar.children[i].id);
                console.log($.radar.children[i].myIndex);
                $.radar.children[i].addEventListener("click", function(e) {
                    console.log("ALERTA " + e.source.id + e.source.myIndex + this.id);
                });
            }
        }
    }
    function clearRadar() {
        if ($.radar.children) {
            for (var c = $.radar.children.length - 1; c >= 0; c--) $.radar.remove($.radar.children[c]);
            $.radar.children = null;
        }
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
        translucent: "false",
        barColor: "#fff",
        title: "tangify",
        id: "radar_window"
    });
    $.__views.radar_window && $.addTopLevelView($.__views.radar_window);
    $.__views.refresh = Ti.UI.createButton({
        color: "#fff",
        title: "Refresh",
        id: "refresh"
    });
    geolocate ? $.__views.refresh.addEventListener("click", geolocate) : __defers["$.__views.refresh!click!geolocate"] = true;
    $.__views.radar_window.leftNavButton = $.__views.refresh;
    $.__views.__alloyId39 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId39"
    });
    $.__views.radar_window.add($.__views.__alloyId39);
    $.__views.radar = Ti.UI.createView({
        id: "radar",
        width: "460px",
        height: "460px",
        top: "20px",
        backgroundImage: "/radar_back.png"
    });
    $.__views.__alloyId39.add($.__views.radar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var cur_long, cur_lat;
    const LATCONV = 89928e-10;
    const LONGCONV = 101857e-10;
    new Array();
    $.radar_window.addEventListener("focus", function() {
        geolocate();
        setInterval(function() {
            geolocate();
        }, 35e3);
    });
    __defers["$.__views.refresh!click!geolocate"] && $.__views.refresh.addEventListener("click", geolocate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;