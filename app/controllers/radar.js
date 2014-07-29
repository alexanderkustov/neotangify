var cur_long, cur_lat;
const LATCONV = 0.0000089928;
const LONGCONV = 0.0000101857;
var persons = new Array();
var j = 0;
var sex, min_age, max_age;

function geolocate(e){
	//var cur_loc_timestamp;
	j = 1;
	Titanium.Geolocation.ACCURACY_HIGH;	
	
	if (Ti.Platform.osname == "android") {
	
		gpsProvider = Ti.Geolocation.Android.createLocationProvider({
	    	name: Ti.Geolocation.PROVIDER_GPS,
	   		minUpdateTime: 600, 
		    minUpdateDistance: 1000
		});
	
		Ti.Geolocation.Android.addLocationProvider(gpsProvider);
	}
	
	Titanium.Geolocation.getCurrentPosition(function(e){
		if(JSON.stringify(e.coords.longitude) === null || typeof JSON.stringify(e.coords.longitude) === 'undefined')
		{
			alert("We cant locate you!");
		}else{
			cur_long = JSON.stringify(e.coords.longitude);                     
			cur_lat = JSON.stringify(e.coords.latitude);	
			Ti.API.info( JSON.stringify(e.coords.longitude) + JSON.stringify(e.coords.latitude));
			console.log("Tua posicao " + cur_lat +  ' ' + cur_long);
			clearRadar();
			changePosition(cur_lat, cur_long);	
		}
			
	});
	
	
}

function changePosition(lat, longi){
	
	var url = mainserver + '/change_position.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	
	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	    	Ti.API.info("Received text: " + this.responseText);
	    	updateRadar(lat,longi);
	    },
	    onerror : function(e) {
	    	alert('error' + e);
	    },
	    timeout : 60 * 1000
	});
	
	var params = { 'latitude': lat, 'longitude' : longi };
	
	client.open("POST", url);
	client.send(params);
}

function updateRadar(lat, longi){
	var url = mainserver + '/people_nearby.json?' + 'auth_token=' + Alloy.Globals.auth_token ;
	console.log(url);
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			
			console.log("pessoas a tua volta: " + JSON.stringify(this.responseText));
			
			if(JSON.parse(this.responseText).people.length > 0){
				
				for (var i = 0; i < JSON.parse(this.responseText).people.length; i++) {
					
					var persons_name = JSON.parse(this.responseText).people[i].name;
					var persons_id = JSON.parse(this.responseText).people[i].id;
					var lat = JSON.parse(this.responseText).people[i].position.latitude;
					var longi = JSON.parse(this.responseText).people[i].position.longitude;
					
					if(JSON.parse(this.responseText).people[i].presentation_picture.url != null){
						var person_image = mainserver + JSON.parse(this.responseText).people[i].presentation_picture.url;
					}
					else{
						var person_image = "person.png";
					}
					
						//alert("pessoa: " + persons_name + " " + lat + " " + longi );
						if(persons_id != Alloy.Globals.user_id)
							addPersonToRadar(persons_id, lat, longi, i, person_image);
				}
					addClickstoRadar();
			} else {
				alert("Nobody's here");
			};
			
		},
		onerror : function(e) {
			alert('error' + e);
			Ti.API.info("Get radar error: " + this.responseText);
		},
		timeout : 60 * 1000
	});
	
	var params = { 
		'latitude': lat,
		'longitude' : longi,
		'sex' : sex,
		'min_age': min_age,
		'max_age': max_age
		};
	client.open("GET", url);
	client.send(params);  
}


function addPersonToRadar(personId, lat, longi, i, person_image){
	var thisPerson = personId;
	
	//var dlat = cur_lat - lat;
	//var dlong = cur_long - longi;
	
	//var topOffset = (((dlat/LATCONV) / 50) * 200) + 100;
	//var leftOffset = (((dlong/LONGCONV) / 50) * 200) + 100;
	
	//alert(cur_lat.toFixed(5) + " " + cur_long.toFixed(5));
	//alert(lat.toFixed(5) + " " + longi.toFixed(5));
	
	if(i%300 === 0){
		j++;
	}
	
	persons[personId] = Ti.UI.createImageView({
		backgroundImage: person_image,
		left: i*60,
		top: j*60,
		id: thisPerson,
		autorotate: true,
		width: 60,
		height: 60,
		zIndex: 999,
		borderColor: "#e74c3c",
        borderWidth: 1,
	});
	
	//alert(dlat.toFixed(5) + " " + dlong.toFixed(5)   + " " + topOffset.toFixed(5)  + " " + leftOffset.toFixed(5)  + " " + thisPerson);
	
	$.radar.add(persons[personId]);		
}

function addClickstoRadar(e){
	if ($.radar.children){
        for (var i=0; i<$.radar.children.length; i++) {
        	$.radar.children[i].addEventListener('click',function(e){
       			profilemodal(this.id);
   			});
   		}
   	}
}


$.radar_window.addEventListener('focus', function() {
	geolocate();
	// setInterval(function(){geolocate();},30000);
});

//CENAS INUTEIS POR AGORA
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    
    return d * 1000; // meters
}


function clearRadar(e){
	if ($.radar.children) {
        for (var c = $.radar.children.length - 1; c >= 0; c--) {
            $.radar.remove($.radar.children[c]);
            
        }
        $.radar.children = null;
    }
	
}

function filter(e){
	
var infoWin = Titanium.UI.createWindow({
    backgroundColor: '#2980b9',
    top: 0,
    left: 0,
    opacity: 1,
    zIndex: 100
});

var titleLabel = Ti.UI.createLabel({
    text: "Filter your Radar",
    color: "#fff",
    width: '100%',
    height: 'auto',
    top: 40,
    left: 0,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    
    infoWin.add(titleLabel);
//MALE SWITCH
var maleLabel = Ti.UI.createLabel({
    text: "Male",
    color: "#fff",
    width: '100%',
    height: 'auto',
    top: 100,
    left: 20
        });
    
    infoWin.add(maleLabel);

var maleSwitch = Ti.UI.createSwitch({
  	value:true,
   	top: 95,
    left: 240,
});

infoWin.add(maleSwitch);

maleSwitch.addEventListener('change',function(e){
  Ti.API.info('Male value: ' + maleSwitch.value);
 
  
});

//FEMALE SWITCH
var femaleLabel = Ti.UI.createLabel({
    text: "Female",
    color: "#fff",
    width: '100%',
    height: 'auto',
    top: 150,
    left: 20
        });
    
    infoWin.add(femaleLabel);

var femaleSwitch = Ti.UI.createSwitch({
  	value:true,
   	top: 145,
    left: 240,
});

infoWin.add(femaleSwitch);

femaleSwitch.addEventListener('change',function(e){
  Ti.API.info('Switch value: ' + femaleSwitch.value);
  
});




var closeBtn = Titanium.UI.createButton({
   title: 'Search',
   color: "#fff",
   top: 400,
   width: 100,
   left:100,
   height: 50
});



var slider = Titanium.UI.createSlider({
    min: 25,
    max: 75,
    width: '90%',
    value: 30,
    top: 210
    });
    
var label = Ti.UI.createLabel({
    text: slider.value,
    width: '100%',
    height: 'auto',
    color: "#fff",
    top: 190,
    left: 0,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });

slider.addEventListener('change', function(e) {
    label.text = String.format("Maximum Distance: " + "%3.1f" + "m", e.value);
});

var minAge = Ti.UI.createLabel({
    text: "Minimum Age",
    color: "#fff",
    width: '100%',
    height: 'auto',
    top: 270,
    left: 20
        });
    
    infoWin.add(minAge);

var minAgeInput = Ti.UI.createTextField({
  	value:"18",
  	 color: "#333",
  	 borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
   	top: 270,
    left: 200,
});

infoWin.add(minAgeInput);


var maxAge = Ti.UI.createLabel({
    text: "Maximum Age",
  color: "#fff",
    width: '100%',
    height: 'auto',
    top: 320,
    left: 20
        });
    
    infoWin.add(maxAge);

var maxAgeInput = Ti.UI.createTextField({
  	value:"99",
  	color: "#333",
  	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
   	top: 320,
    left: 200,
});

infoWin.add(maxAgeInput);



closeBtn.addEventListener('click',function(e)
{
if(maleSwitch.value===true && femaleSwitch.value===true ){
  	sex = null;
  }
else{
	if(maleSwitch.value===false && femaleSwitch.value===true)
		sex = "female";
	else
		sex = "male";
	}
	
	max_age = maxAgeInput;
	min_age = minAgeInput;
	
		console.log(sex + " min_age: " +  min_age + " max_age: " + max_age);
   infoWin.close();
  
});


infoWin.add(closeBtn);
infoWin.add(slider);
infoWin.add(label);

infoWin.open({modal:true});
}

function profilemodal(userid){	
	console.log(userid + ' este e o user');
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();
	profilewin.open();
}
