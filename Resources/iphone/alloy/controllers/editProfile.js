function Controller() {
    function goback() {
        var win = Alloy.createController("index").getView();
        win.open();
    }
    function uploadPic() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                var xhr = Titanium.Network.createHTTPClient();
                xhr.onload = function() {
                    Ti.UI.createAlertDialog({
                        title: "Success",
                        message: "status code " + this.status
                    }).show();
                };
                xhr.open("POST", mainserver + "/users/" + Alloy.Globals.user_id + "/pictures.json");
                xhr.send(JSON.stringify(params));
                var params = {
                    user: {
                        image: event.media
                    },
                    user_id: Alloy.Globals.user_id
                };
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
    this.__controllerPath = "editProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId13 = Ti.UI.createWindow({
        backgroundImage: "background.jpg",
        color: "#fff",
        translucent: "false",
        barColor: "#fff",
        title: "Registration",
        id: "__alloyId13"
    });
    $.__views.back = Ti.UI.createButton({
        color: "#fff",
        title: "Back",
        id: "back"
    });
    goback ? $.__views.back.addEventListener("click", goback) : __defers["$.__views.back!click!goback"] = true;
    $.__views.__alloyId13.leftNavButton = $.__views.back;
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createButton({
        color: "#fff",
        title: "Picture",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    uploadPic ? $.__views.__alloyId16.addEventListener("click", uploadPic) : __defers["$.__views.__alloyId16!click!uploadPic"] = true;
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
    $.__views.__alloyId15.add($.__views.name);
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
    $.__views.__alloyId15.add($.__views.email);
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
    $.__views.__alloyId15.add($.__views.short_description);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Want to change your password? (Optional)",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
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
    $.__views.__alloyId15.add($.__views.password);
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
    $.__views.__alloyId15.add($.__views.password_confirmation);
    $.__views.__alloyId18 = Ti.UI.createButton({
        color: "#fff",
        title: "Submit",
        height: "40",
        width: Ti.UI.FILL,
        id: "__alloyId18"
    });
    $.__views.__alloyId15.add($.__views.__alloyId18);
    editProfile ? $.__views.__alloyId18.addEventListener("click", editProfile) : __defers["$.__views.__alloyId18!click!editProfile"] = true;
    $.__views.win1 = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId13,
        id: "win1"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId16!click!uploadPic"] && $.__views.__alloyId16.addEventListener("click", uploadPic);
    __defers["$.__views.__alloyId18!click!editProfile"] && $.__views.__alloyId18.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;