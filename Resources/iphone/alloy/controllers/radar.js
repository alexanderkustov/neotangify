function Controller() {
    function geolocate() {
        Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.getCurrentPosition(function(e) {
            cur_long = e.coords.longitude;
            cur_lat = e.coords.latitude;
            console.log("Tua posicao " + cur_lat + " " + cur_long);
            clearRadar();
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
        var url = mainserver + "/people_nearby.json?" + "auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                alert("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
                if (JSON.parse(this.responseText).people.length > 0) {
                    for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                        var persons_name = JSON.parse(this.responseText).people[i].name;
                        var persons_id = JSON.parse(this.responseText).people[i].id;
                        var lat = JSON.parse(this.responseText).people[i].position.latitude;
                        var longi = JSON.parse(this.responseText).people[i].position.longitude;
                        alert("pessoa: " + persons_name + " " + lat + " " + longi);
                        persons_id != Alloy.Globals.user_id && addPersonToRadar(persons_id, lat, longi, i);
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
        var topOffset = 200 * (dlat / LATCONV / 50) + 100;
        var leftOffset = 200 * (dlong / LONGCONV / 50) + 100;
        alert(cur_lat.toFixed(5) + " " + cur_long.toFixed(5));
        alert(lat.toFixed(5) + " " + longi.toFixed(5));
        persons[personId] = Ti.UI.createImageView({
            image: "/person.png",
            top: topOffset,
            left: leftOffset,
            id: thisPerson,
            width: 30,
            height: 30,
            borderRadius: 15,
            zIndex: 999
        });
        $.radar.add(persons[personId]);
    }
    function addClickstoRadar() {
        if ($.radar.children) for (var i = 0; $.radar.children.length > i; i++) $.radar.children[i].addEventListener("click", function() {
            profilemodal(this.id);
        });
    }
    function clearRadar() {
        if ($.radar.children) {
            for (var c = $.radar.children.length - 1; c >= 0; c--) $.radar.remove($.radar.children[c]);
            $.radar.children = null;
        }
    }
    function profilemodal(userid) {
        console.log(userid + " este e o user");
        var profilewin = Alloy.createController("profilemodal", {
            userId: userid
        }).getView();
        profilewin.open();
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
    $.__views.radar = Ti.UI.createView({
        id: "radar",
        width: "460px",
        height: "460px",
        top: "40px",
        backgroundImage: "/radar_back.png"
    });
    $.__views.radar_window.add($.__views.radar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var cur_long;
    var cur_lat;
    const LATCONV = 89928e-10;
    const LONGCONV = 101857e-10;
    var persons = new Array();
    $.radar_window.addEventListener("focus", function() {
        geolocate();
    });
    __defers["$.__views.refresh!click!geolocate"] && $.__views.refresh.addEventListener("click", geolocate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;