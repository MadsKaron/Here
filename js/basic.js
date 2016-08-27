
var map=$("#map");
var limit = 0; 
var markers = {};



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -36.850, lng: 174.763}, //-36.850942, 174.763904
    zoom: 14
  });

  marker = new google.maps.Marker({
    position: location,
    map: map,
    
  });


  google.maps.event.addListener(map,"click",function(event){
    
    addMarker(event.latLng, map)
  });

  google.maps.event.addListener("dbclick",function(){
    marker.setMap(null);
  });

}; 


function addMarker(location, map){
  var marker = new google.maps.Marker({
    position: location,
    label: "?",
    map: map
  })
};

//google.maps.event.addDomListener(window,'load',initMap);
/*
function placeMarkerAndPanTo(latlng, map){
  var marker = new google.maps.Marker({
    positon: latlng,
    map: map
  })
  map.panTo(latlng); 
};
*/