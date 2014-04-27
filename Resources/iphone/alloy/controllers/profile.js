function Controller() {
    function goback() {
        var win = Alloy.createController("index").getView();
        win.open();
    }
    function editProfile() {
        var url = mainserver + "/users/" + Alloy.Globals.user_id + "/?format=json&auth_token=" + Alloy.Globals.auth_token;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("Profile updated!");
            },
            onerror: function(e) {
                alert("error" + e);
                console.log(e);
            },
            timeout: 6e4
        });
        var params = {
            name: $.name.value,
            email: $.email.value.toLowerCase(),
            short_description: $.short_description.value,
            password: $.password.value,
            password_confirmation: $.password_confirmation.value
        };
        auth_token = null;
        client.open("POST", url);
        client.send(params);
    }
    function takePicture() {
        var dialog = Titanium.UI.createOptionDialog({
            title: "Choose an image source...",
            options: [ "Camera", "Photo Gallery", "Cancel" ],
            cancel: 2
        });
        dialog.addEventListener("click", function(e) {
            0 == e.index ? Titanium.Media.showCamera({
                success: function(event) {
                    var image = event.media;
                    event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO && Ti.App.Properties.setString("image", image.nativePath);
                },
                cancel: function() {},
                error: function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title: "Camera"
                    });
                    error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have camera") : a.setMessage("Unexpected error: " + error.code);
                    a.show();
                },
                allowImageEditing: true,
                saveToPhotoGallery: true
            }) : 1 == e.index && Titanium.Media.openPhotoGallery({
                success: function(event) {
                    var image = event.media;
                    event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO && Ti.App.Properties.setString("image", image.nativePath);
                },
                cancel: function() {}
            });
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId25 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        title: "Registration",
        id: "__alloyId25"
    });
    $.__views.back = Ti.UI.createButton({
        color: "fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.__alloyId25.leftNavButton = $.__views.back;
    $.__views.__alloyId27 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId27"
    });
    $.__views.__alloyId25.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createButton({
        color: "fff",
        title: "Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    takePicture ? $.__views.__alloyId28.addEventListener("click", takePicture) : __defers["$.__views.__alloyId28!click!takePicture"] = true;
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
    $.__views.__alloyId27.add($.__views.name);
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
    $.__views.__alloyId27.add($.__views.email);
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
    $.__views.__alloyId27.add($.__views.short_description);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Want to change your password? (Optional)",
        id: "__alloyId29"
    });
    $.__views.__alloyId27.add($.__views.__alloyId29);
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
    $.__views.__alloyId27.add($.__views.password);
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
    $.__views.__alloyId27.add($.__views.password_confirmation);
    $.__views.__alloyId30 = Ti.UI.createButton({
        color: "fff",
        title: "Submit",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId30"
    });
    $.__views.__alloyId27.add($.__views.__alloyId30);
    editProfile ? $.__views.__alloyId30.addEventListener("click", editProfile) : __defers["$.__views.__alloyId30!click!editProfile"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId25,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId28!click!takePicture"] && $.__views.__alloyId28.addEventListener("click", takePicture);
    __defers["$.__views.__alloyId30!click!editProfile"] && $.__views.__alloyId30.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;