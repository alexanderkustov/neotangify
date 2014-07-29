function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function logout() {
        console.log("logout");
        auth_token = null;
        $.settings = null;
        tabgroup = null;
        $.main_nav = null;
        var win = Alloy.createController("login").getView();
        win.open();
    }
    function uploadPic() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                var xhr = Titanium.Network.createHTTPClient();
                xhr.onload = function() {
                    Ti.UI.createAlertDialog({
                        title: "Success",
                        message: "Photo uploaded "
                    }).show();
                };
                xhr.open("POST", mainserver + "/users/" + Alloy.Globals.user_id + "/picture_upload.json?" + "auth_token=" + Alloy.Globals.auth_token);
                xhr.send({
                    picture: event.media
                });
                xhr.setRequestHeader("enctype", "multipart/form-data");
                xhr.setRequestHeader("Content-Type", "image/png");
            }
        });
    }
    function uploadCoverPic() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                var xhr = Titanium.Network.createHTTPClient();
                xhr.onload = function() {
                    Ti.UI.createAlertDialog({
                        title: "Success",
                        message: "Success, Photo uploaded "
                    }).show();
                };
                xhr.open("POST", mainserver + "/users/" + Alloy.Globals.user_id + "/cover_upload.json?" + "auth_token=" + Alloy.Globals.auth_token);
                xhr.send({
                    cover: event.media
                });
                xhr.setRequestHeader("enctype", "multipart/form-data");
                xhr.setRequestHeader("Content-Type", "image/png");
            }
        });
    }
    function editProfile() {
        var url = mainserver + "/users/" + Alloy.Globals.user_id;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                Alloy.Globals.auth_token = JSON.parse(this.responseText).user.auth_token;
                Alloy.Globals.user_id = JSON.parse(this.responseText).user.id;
                Alloy.Globals.user_name = JSON.parse(this.responseText).user.name;
                Alloy.Globals.user_email = JSON.parse(this.responseText).user.email;
                Alloy.Globals.birthdate = JSON.parse(this.responseText).user.birthdate;
                Alloy.Globals.short_description = JSON.parse(this.responseText).user.short_description;
                Alloy.Globals.user_pic = JSON.parse(this.responseText).user.presentation_picture.thumb.url;
                Alloy.Globals.cover_picture = JSON.parse(this.responseText).user.cover_picture.small.url;
            },
            onerror: function(e) {
                alert("Error updating profile: " + e.code);
                console.log(e);
            },
            timeout: 6e4
        });
        var params = {
            user: {
                name: $.name.value,
                email: $.email.value.toLowerCase(),
                short_description: $.short_description.value,
                password: $.password.value,
                password_confirmation: $.password_confirmation.value
            },
            auth_token: Alloy.Globals.auth_token
        };
        client.open("PUT", url);
        client.setRequestHeader("content-type", "application/json; charset=utf-8");
        client.send(JSON.stringify(params));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settings = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        navBarHidden: "true",
        title: "Settings",
        id: "settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    $.__views.logout = Ti.UI.createButton({
        color: "#fff",
        id: "logout",
        title: "Logout"
    });
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    $.__views.settings.rightNavButton = $.__views.logout;
    $.__views.__alloyId18 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId18"
    });
    $.__views.settings.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Tangible on the Radar",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.basicSwitch = Ti.UI.createSwitch({
        value: true,
        id: "basicSwitch"
    });
    $.__views.__alloyId18.add($.__views.basicSwitch);
    $.__views.__alloyId20 = Ti.UI.createButton({
        color: "#fff",
        title: "Cover Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    uploadCoverPic ? $.__views.__alloyId20.addEventListener("click", uploadCoverPic) : __defers["$.__views.__alloyId20!click!uploadCoverPic"] = true;
    $.__views.__alloyId21 = Ti.UI.createButton({
        color: "#fff",
        title: "Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId21"
    });
    $.__views.__alloyId18.add($.__views.__alloyId21);
    uploadPic ? $.__views.__alloyId21.addEventListener("click", uploadPic) : __defers["$.__views.__alloyId21!click!uploadPic"] = true;
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Sex: Male/Female",
        id: "__alloyId22"
    });
    $.__views.__alloyId18.add($.__views.__alloyId22);
    $.__views.sexSwitch = Ti.UI.createSwitch({
        value: true,
        id: "sexSwitch"
    });
    $.__views.__alloyId18.add($.__views.sexSwitch);
    $.__views.name = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Name",
        id: "name"
    });
    $.__views.__alloyId18.add($.__views.name);
    $.__views.age = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Age",
        id: "age"
    });
    $.__views.__alloyId18.add($.__views.age);
    $.__views.email = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Email",
        id: "email"
    });
    $.__views.__alloyId18.add($.__views.email);
    $.__views.short_description = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Short Description",
        id: "short_description"
    });
    $.__views.__alloyId18.add($.__views.short_description);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Want to change your password?",
        id: "__alloyId23"
    });
    $.__views.__alloyId18.add($.__views.__alloyId23);
    $.__views.password = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Password",
        passwordMask: "true",
        id: "password"
    });
    $.__views.__alloyId18.add($.__views.password);
    $.__views.password_confirmation = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Confirm Password",
        passwordMask: "true",
        id: "password_confirmation"
    });
    $.__views.__alloyId18.add($.__views.password_confirmation);
    $.__views.__alloyId24 = Ti.UI.createButton({
        color: "#fff",
        title: "Submit",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId24"
    });
    $.__views.__alloyId18.add($.__views.__alloyId24);
    editProfile ? $.__views.__alloyId24.addEventListener("click", editProfile) : __defers["$.__views.__alloyId24!click!editProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.__alloyId20!click!uploadCoverPic"] && $.__views.__alloyId20.addEventListener("click", uploadCoverPic);
    __defers["$.__views.__alloyId21!click!uploadPic"] && $.__views.__alloyId21.addEventListener("click", uploadPic);
    __defers["$.__views.__alloyId24!click!editProfile"] && $.__views.__alloyId24.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;