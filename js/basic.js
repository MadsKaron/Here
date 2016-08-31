
var map=$("#map");
var limit = 0; 
var markers =[];
var labels='12345'; 


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -36.850, lng: 174.763}, //-36.850942, 174.763904
    zoom: 14
  });
  
  google.maps.event.addListener(map,"click",function(event){ 
    addMarker(event.latLng, map)
  });


} 

function addMarker(location, map){
  if(limit<5){
    var marker = new google.maps.Marker({  
     position: location,
     draggable: true,
     label: labels[limit],
     map: map
    });
    markers.push(marker);
    limit++;
  }else{
    alert("The limit of marker is 5"); 
  }
};

function setMapOnAll(map){
  for(var i=0;i<markers.length; i++){
    markers[i].setMap(map); 
  }
};

function clearMarkers(){
  setMapOnAll(null); 
};

function showMarkers(){
  setMapOnAll(map); 
};

function deleteMarkers(){
  clearMarkers();
  markers =[]; 
  limit=0; 
}
//google.maps.event.addDomListener(window,'load',initMap);

