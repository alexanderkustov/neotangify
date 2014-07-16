function Controller() {
    function geolocate() {
        j = 1;
        Titanium.Geolocation.ACCURACY_HIGH;
        if ("android" == Ti.Platform.osname) {
            gpsProvider = Ti.Geolocation.Android.createLocationProvider({
                name: Ti.Geolocation.PROVIDER_GPS,
                minUpdateTime: 600,
                minUpdateDistance: 1e3
            });
            Ti.Geolocation.Android.addLocationProvider(gpsProvider);
        }
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (null === JSON.stringify(e.coords.longitude)) alert("We cant locate you!"); else {
                cur_long = JSON.stringify(e.coords.longitude);
                cur_lat = JSON.stringify(e.coords.latitude);
                Ti.API.info(JSON.stringify(e.coords.longitude) + JSON.stringify(e.coords.latitude));
                console.log("Tua posicao " + cur_lat + " " + cur_long);
                clearRadar();
                changePosition(cur_lat, cur_long);
            }
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
            longitude: longi,
            sex: sex,
            min_age: min_age,
            max_age: max_age
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
            zIndex: 999,
            borderColor: "#e74c3c",
            borderWidth: 1
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
    function filter() {
        var infoWin = Titanium.UI.createWindow({
            backgroundColor: "#2980b9",
            top: 0,
            left: 0,
            opacity: 1,
            zIndex: 100
        });
        var titleLabel = Ti.UI.createLabel({
            text: "Filter your Radar",
            color: "#fff",
            width: "100%",
            height: "auto",
            top: 40,
            left: 0,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        infoWin.add(titleLabel);
        var maleLabel = Ti.UI.createLabel({
            text: "Male",
            color: "#fff",
            width: "100%",
            height: "auto",
            top: 100,
            left: 20
        });
        infoWin.add(maleLabel);
        var maleSwitch = Ti.UI.createSwitch({
            value: true,
            top: 95,
            left: 240
        });
        infoWin.add(maleSwitch);
        maleSwitch.addEventListener("change", function() {
            Ti.API.info("Male value: " + maleSwitch.value);
        });
        var femaleLabel = Ti.UI.createLabel({
            text: "Female",
            color: "#fff",
            width: "100%",
            height: "auto",
            top: 150,
            left: 20
        });
        infoWin.add(femaleLabel);
        var femaleSwitch = Ti.UI.createSwitch({
            value: true,
            top: 145,
            left: 240
        });
        infoWin.add(femaleSwitch);
        femaleSwitch.addEventListener("change", function() {
            Ti.API.info("Switch value: " + femaleSwitch.value);
        });
        var closeBtn = Titanium.UI.createButton({
            title: "Search",
            color: "#fff",
            top: 400,
            width: 100,
            left: 100,
            height: 50
        });
        var slider = Titanium.UI.createSlider({
            min: 25,
            max: 75,
            width: "90%",
            value: 30,
            top: 210
        });
        var label = Ti.UI.createLabel({
            text: slider.value,
            width: "100%",
            height: "auto",
            color: "#fff",
            top: 190,
            left: 0,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        slider.addEventListener("change", function(e) {
            label.text = String.format("Maximum Distance: %3.1fm", e.value);
        });
        var minAge = Ti.UI.createLabel({
            text: "Minimum Age",
            color: "#fff",
            width: "100%",
            height: "auto",
            top: 270,
            left: 20
        });
        infoWin.add(minAge);
        var minAgeInput = Ti.UI.createTextField({
            value: "18",
            color: "#333",
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            top: 270,
            left: 200
        });
        infoWin.add(minAgeInput);
        var maxAge = Ti.UI.createLabel({
            text: "Maximum Age",
            color: "#fff",
            width: "100%",
            height: "auto",
            top: 300,
            left: 20
        });
        infoWin.add(maxAge);
        var maxAgeInput = Ti.UI.createTextField({
            value: "99",
            color: "#333",
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            top: 300,
            left: 200
        });
        infoWin.add(maxAgeInput);
        closeBtn.addEventListener("click", function() {
            sex = true === maleSwitch.value && true === femaleSwitch.value ? null : false === maleSwitch.value && true === femaleSwitch.value ? "female" : "male";
            max_age = maxAgeInput;
            min_age = minAgeInput;
            console.log(sex + " min_age: " + min_age + " max_age: " + max_age);
            infoWin.close();
        });
        infoWin.add(closeBtn);
        infoWin.add(slider);
        infoWin.add(label);
        infoWin.open({
            modal: true
        });
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
    filter ? $.__views.filter.addEventListener("click", filter) : __defers["$.__views.filter!click!filter"] = true;
    $.__views.radar_window.rightNavButton = $.__views.filter;
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
    var j = 0;
    var sex, min_age, max_age;
    $.radar_window.addEventListener("focus", function() {
        geolocate();
    });
    __defers["$.__views.refresh!click!geolocate"] && $.__views.refresh.addEventListener("click", geolocate);
    __defers["$.__views.filter!click!filter"] && $.__views.filter.addEventListener("click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;