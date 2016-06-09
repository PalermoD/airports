// Global Varibles 
var linePresent = false;
var line;
var lastInput;
var lastMarker;
var marker1;
var marker2;
var apiKey = "AIzaSyANcA5jmdl_PYiffJkE0ewuT58ckav-AuA"

//Render Google Map
var map;
function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 37.0902, lng: -95.7129},
   zoom: 4
 });
}

//Ajax call that handles the distance, plot points, and draws line on success 
$.ajax({
  type: 'GET',
  dataType: "json",
  url: '/api/airports',
  async: false,
  success: function(data){
    var names = data.filter( (airport) => {
      return airport.country == "United States";
    }).map( (airport) => {
      return airport.name ? airport.name.toLowerCase() : '';
    });


    $(function() {

      $( "#tags" ).autocomplete({
        select: function( event, ui ) {

          if ($("#airports").val() != ''){
           var airport1 = getLatLon(data, $("#airports").val());
           var airport2 = getLatLon(data, ui.item.label);
           if (lastMarker && lastInput === "input1"){
            marker2.setMap(null)

          } else if (lastMarker){
            marker1.setMap(null)
          }
          marker1 = placeMaker(airport1);
          marker2 = placeMaker(airport2);
          

          if (lastInput === "input1"){
            lastMarker = marker2;
          } else {
            lastMarker = marker1;
          }

          $('#tags').on('input', function() { 
           marker1.setMap(null)
         });


          if (linePresent){
            line.setMap(null)
          } else {
            linePresent = true;
          }
          line = drawLine(airport1, airport2);

          calculate(airport1, airport2);
        } 

        lastInput = "input1";
      },
      minLength: 3,
      source: names
      
    });
$( "#airports" ).autocomplete({
  select: function( event, ui ) {

    if ($("#tags").val() != ''){
     var airport1 = getLatLon(data, $("#tags").val());
     var airport2 = getLatLon(data, ui.item.label);
     if (lastMarker && lastInput === "input2"){
      marker2.setMap(null)

    } else if (lastMarker){
      marker1.setMap(null)
    }
    marker1 = placeMaker(airport1);
    marker2 = placeMaker(airport2);


    if (lastInput === "input2"){
      lastMarker = marker1;
    } else {
      lastMarker = marker2;
    }



    if (linePresent){
      line.setMap(null)
    } else {
      linePresent = true;
    }
    line = drawLine(airport1, airport2);

    calculate(airport1, airport2);
  }
  lastInput = "input2";
},
minLength: 3,
source: names
});


});
}
});


//Get latitude and longitude of aiports 
var getLatLon = function(airports, name){
  var airport = airports.filter( (airport) => {

    var lowercased = airport.name ? airport.name.toLowerCase() : '';
    return  lowercased === name;
  });
  console.log("g", airport);
  return airport[0];
}




var toRad = function(num) {
  return num * Math.PI / 180
}

// Caculate the distance in miles and covert to nauticles miles 
var calculate = function(airport1, airport2){

  var dLat = toRad(airport2.lon - airport1.lon);
  var dLon = toRad(airport2.lat - airport1.lat);
  var lat1 = toRad(airport1.lat);
  var lat2 = toRad(airport2.lat);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));


  var r = 3959;
  var d = r * c;
  var nauticleMiles = d * 0.868976;


  $('#distance').text("Distance: " + Math.round(nauticleMiles) + " nautical miles" );
}


// place marker function for ploting the airport
var placeMaker = function(airport){

 var myLatLng = {lat: Number(airport.lat), lng: Number(airport.lon)};
 console.log(myLatLng);

 var marker = new google.maps.Marker({
   position: myLatLng,
   map: map,
   animation: google.maps.Animation.DROP,
   title: 'Hello World!'
 });
 return marker;
}


// draw line function for drawing the trip on the map after two makers have been placed 
var drawLine = function(airport1, airport2){
  var line = new google.maps.Polyline({
    path: [
    new google.maps.LatLng(Number(airport1.lat), Number(airport1.lon)), 
    new google.maps.LatLng(Number(airport2.lat), Number(airport2.lon))
    ],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4,
    map: map


  });
  return line;
}



