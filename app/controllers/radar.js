var cur_long, cur_lat;
const LATCONV = 0.0000089928;
const LONGCONV = 0.0000101857;
var persons = new Array();
var j = 1;
function geolocate(e){
	//var cur_loc_timestamp;
	Titanium.Geolocation.ACCURACY_BEST;	
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		cur_long = e.coords.longitude;                     
		cur_lat = e.coords.latitude;
		
		console.log("Tua posicao " + cur_lat +  ' ' + cur_long);
		clearRadar();
		changePosition(cur_lat, cur_long);
		
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
	
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			
			//alert("pessoas a tua volta: " + JSON.parse(this.responseText).people.length);
			
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
							//(persons_id + ' ' + lat + " " + longi + " " + i);
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
	
	var params = { 'latitude': lat, 'longitude' : longi};
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
		image: person_image,
		left: i*60,
		top: j*60,
		id: thisPerson,
		width: 60,
		height: 60,
		zIndex: 999
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
	var win=Alloy.createController('radarQuery').getView();
	win.open();
}

function profilemodal(userid){	
	console.log(userid + ' este e o user');
	var profilewin = Alloy.createController('profilemodal', {userId: userid}).getView();
	profilewin.open();
}
