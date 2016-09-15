///<reference path="../typings/globals/google.maps/google.maps.d.ts" /> 
var limit = 0;
var markers: google.maps.Marker[] = [];
var labels="12345"; 


export class initializeMap {

    public name: string;
    public map: any;
    

    constructor (mapDiv: Element){
        this.name="GoogleMap"; 
        this.map= new google.maps.Map(document.getElementById("map"), {center: new google.maps.LatLng(-36.850,174.763), zoom: 14});


        //this.map.addDomListener(this.map,"click",()=> {   //여기에 새로 넣어보기
        google.maps.event.addListener(this.map,'click',(event)=>{
            //this.map.getProjection().fromPointToLatLng(new google.maps.Point(event.currentTarget.));
            this.addMarker(event.latLng, this.map);
        }); 
        /* 
        google.maps.event.addListener(this.map, 'click', ()=>{
            var marker = new google.maps.Marker({
                position: this.map.event.currentTarget,

            })
        });*/
    }
        
    addMarker(location, map){
        if(limit<5){
            var marker = new google.maps.Marker({  
            position: location,
            draggable: true,
            label: labels[limit],
            map: map
        });
        marker.setMap(this.map);
        markers.push(marker);
        limit++;
        }else{
            alert("The limit of marker is 5"); 
        }
    }

    setMapOnAll(map){
        for(var i=0;i<markers.length; i++){
            markers[i].setMap(this.map); 
        }
    }
    
    clearMarkers(){
        this.setMapOnAll(null); //<google.maps.Map>null
    }

    showMarkers(){
        this.setMapOnAll(this.map); 
    }

    deleteMarkers(){
        this.clearMarkers();
        markers =[]; 
        limit=0; 
    }

    getMarkerPosition(){
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
    } 
}


//var markers: google.maps.Marker[] = [];