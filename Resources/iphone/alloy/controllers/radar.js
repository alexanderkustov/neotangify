function Controller() {
    function geolocate() {
        j = 1;
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
                if (JSON.parse(this.responseText).people.length > 0) {
                    for (var i = 0; JSON.parse(this.responseText).people.length > i; i++) {
                        JSON.parse(this.responseText).people[i].name;
                        var persons_id = JSON.parse(this.responseText).people[i].id;
                        var lat = JSON.parse(this.responseText).people[i].position.latitude;
                        var longi = JSON.parse(this.responseText).people[i].position.longitude;
                        if (null != JSON.parse(this.responseText).people[i].presentation_picture.url) var person_image = mainserver + JSON.parse(this.responseText).people[i].presentation_picture.url; else var person_image = "person.png";
                        persons_id != Alloy.Globals.user_id && addPersonToRadar(persons_id, lat, longi, i, person_image);
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
    function addPersonToRadar(personId, lat, longi, i, person_image) {
        var thisPerson = personId;
        0 === i % 300 && j++;
        persons[personId] = Ti.UI.createImageView({
            image: person_image,
            left: 60 * i,
            top: 60 * j,
            id: thisPerson,
            width: 60,
            height: 60,
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
    function updateLabel(e) {
        $.label.text = String.format("%3.1f", e.value) + "m";
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
        title: "Radar",
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
    $.__views.filter = Ti.UI.createButton({
        color: "#fff",
        title: "Filter",
        id: "filter"
    });
    geolocate ? $.__views.filter.addEventListener("click", geolocate) : __defers["$.__views.filter!click!geolocate"] = true;
    $.__views.radar_window.rightNavButton = $.__views.filter;
    $.__views.slider = Ti.UI.createSlider({
        id: "slider",
        top: "50",
        min: "25",
        max: "75",
        width: "100%",
        value: "25"
    });
    $.__views.radar_window.add($.__views.slider);
    updateLabel ? $.__views.slider.addEventListener("change", updateLabel) : __defers["$.__views.slider!change!updateLabel"] = true;
    $.__views.label = Ti.UI.createLabel({
        width: "100%",
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "label",
        top: "30",
        left: "0"
    });
    $.__views.radar_window.add($.__views.label);
    $.__views.radar = Ti.UI.createScrollView({
        id: "radar",
        width: "100%",
        top: "50px"
    });
    $.__views.radar_window.add($.__views.radar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var cur_long, cur_lat;
    var persons = new Array();
    var j = 1;
    $.radar_window.addEventListener("focus", function() {
        geolocate();
    });
    $.slider.text = $.slider.value;
    __defers["$.__views.refresh!click!geolocate"] && $.__views.refresh.addEventListener("click", geolocate);
    __defers["$.__views.filter!click!geolocate"] && $.__views.filter.addEventListener("click", geolocate);
    __defers["$.__views.slider!change!updateLabel"] && $.__views.slider.addEventListener("change", updateLabel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;