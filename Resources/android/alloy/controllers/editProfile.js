function Controller() {
    function goback() {
        $.win_editprofile.close();
        $.win_editprofile = null;
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
                        message: "status code " + this.status
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
    this.__controllerPath = "editProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.back!click!goback"] && $.__views.back.addEventListener("click", goback);
    __defers["$.__views.__alloyId15!click!uploadCoverPic"] && $.__views.__alloyId15.addEventListener("click", uploadCoverPic);
    __defers["$.__views.__alloyId16!click!uploadPic"] && $.__views.__alloyId16.addEventListener("click", uploadPic);
    __defers["$.__views.__alloyId18!click!editProfile"] && $.__views.__alloyId18.addEventListener("click", editProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;