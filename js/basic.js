
var map=$("#map");
var limit = 0; 
var markers =[];
var labels='12345'; 



var CLIENT_ID = 'AIzaSyDiLsxTu726J0qJcKG-mRR-A6Ic8UHBsCw';
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];


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

function getMarkerPosition(){
  var pos=[];
  var posit;
  for(var i=0;i<markers.length;i++){
    pos.push(markers[i].getPosition());
  }  
  for(var i=0;i<5;i++){
    if(i>=markers.length){
      document.getElementById("output"+(i+1)).innerHTML="N/A";
    }else{
      document.getElementById("output"+(i+1)).innerHTML=pos[i]; 
    }
  } 
}  //get coordiantes of markers in map 



function loadSheetsApi() {
  var sheetUrl =
    'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(listMarkers);
}   //Load Sheets API client library.

function listMarkers(){
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1_mC_OZHBCxFeFZ6RPIR9m4oR4UUnhWMLN014KRysTf4',
    range: 'sheet1!A2:C2',
  }).then(function(response){
    var range = response.result;
    //if(range.values.length>0){
      appendPre('Ref No, Marker:'); 
    //  for(i=0;i<range.values.length;i++){
        var row = range.values[0]; 
        appendPre(row[0]+', '+row[2]); //row가 열의 n번째 
    //  }
////    } else{
 //     appendPre('No data found.'); 
 //   }
  }, function(response){
    appendPre('Error:'+ response.result.error.message); 
  }); 

}

function appendPre(message){
  var pre = document.getElementById('output'); 
  var textContent = document.createTextNode(message +'\n'); 
  pre.appendChild(textContent); 
}



//google.maps.event.addDomListener(window,'load',initMap);

