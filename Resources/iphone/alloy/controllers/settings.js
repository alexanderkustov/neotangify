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
                alert("Profile updated!");
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settings = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
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
    $.__views.__alloyId33 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId33"
    });
    $.__views.settings.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Tangible on the Radar",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.basicSwitch = Ti.UI.createSwitch({
        value: true,
        id: "basicSwitch"
    });
    $.__views.__alloyId33.add($.__views.basicSwitch);
    $.__views.__alloyId35 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId35"
    });
    $.__views.settings.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createButton({
        color: "#fff",
        title: "Cover Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    uploadCoverPic ? $.__views.__alloyId36.addEventListener("click", uploadCoverPic) : __defers["$.__views.__alloyId36!click!uploadCoverPic"] = true;
    $.__views.__alloyId37 = Ti.UI.createButton({
        color: "#fff",
        title: "Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId37"
    });
    $.__views.__alloyId35.add($.__views.__alloyId37);
    uploadPic ? $.__views.__alloyId37.addEventListener("click", uploadPic) : __defers["$.__views.__alloyId37!click!uploadPic"] = true;
    $.__views.name = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Name",
        id: "name"
    });
    $.__views.__alloyId35.add($.__views.name);
    $.__views.email = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Email",
        id: "email"
    });
    $.__views.__alloyId35.add($.__views.email);
    $.__views.short_description = Ti.UI.createTextField({
        color: "#333",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        top: 10,
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        height: "40",
        hintText: "Short Description",
        id: "short_description"
    });
    $.__views.__alloyId35.add($.__views.short_description);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Want to change your password? (Optional)",
        id: "__alloyId38"
    });
    $.__views.__alloyId35.add($.__views.__alloyId38);
    $.__views.password = Ti.UI.createTextField({
        color: "#333",
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
    $.__views.__alloyId35.add($.__views.password);
    $.__views.password_confirmation = Ti.UI.createTextField({
        color: "#333",
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
    $.__views.__alloyId35.add($.__views.password_confirmation);
    $.__views.__alloyId39 = Ti.UI.createButton({
        color: "#fff",
        title: "Submit",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId39"
    });
    $.__views.__alloyId35.add($.__views.__alloyId39);
    editProfile ? $.__views.__alloyId39.addEventListener("click", editProfile) : __defers["$.__views.__alloyId39!click!editProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.__alloyId36!click!uploadCoverPic"] && $.__views.__alloyId36.addEventListener("click", uploadCoverPic);
    __defers["$.__views.__alloyId37!click!uploadPic"] && $.__views.__alloyId37.addEventListener("click", uploadPic);
    __defers["$.__views.__alloyId39!click!editProfile"] && $.__views.__alloyId39.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;