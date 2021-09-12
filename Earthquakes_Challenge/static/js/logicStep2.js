// Add console.log to check to see if our code is working.
console.log("working");


// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([30,30], 2);
// // Get data from cities.js
// let cityData=cities;

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};



// // Grabbing our GeoJSON data 13.5.2 .
// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer)
//       layer.bindPopup();
//      }
// });
// // L.geoJSON(sanFranAirport,{
//     pointToLayer:function(feature,latlng){
//         console.log(feature);
//         return L.marker(latlng).bindPopup("<h2>" + feature.properties.name+"</h2><hr><h3>"+feature.properties.city  +","+ feature.properties.country+ "</h3>")

//     }
// }).addTo(map);
// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city){
//     console.log(city)
//     L.circleMarker(city.location,{radius:city.population/100000,
//         color:"orange",
//         fillColor: '#808080',
//         fillOpacity: 0.5,})
//     .bindPopup("<h2>"+city.city+","+city.state+"</h2><hr><h3> Population "+city.population.toLocaleString()+"</h3>").addTo(map)
// });


// // //  Add a marker to the map for Los Angeles, California.


// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color:"black",
//     fillColor:"#ffffa1"
//  }).addTo(map);
 
// let marker=L.marker([34.0522, -118.2437]).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps={
    "Streets":streets,
    "Satellite":satelliteStreets
};
// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
    
    


// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

//
// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods="https://raw.githubusercontent.com/TAYLORYINGBHANDARI/Mapping_Earthquakes/main/torontoNeighborhoods.json";
// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData="https://raw.githubusercontent.com/TAYLORYINGBHANDARI/Mapping_Earthquakes/main/torontoRoutes.json"

//Accessing the airport GeoJSON URL 
//let airportData="https://raw.githubusercontent.com/TAYLORYINGBHANDARI/Mapping_Earthquakes/main/majorAirports.json";

// Create a style for the lines.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }


//
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    console.log(data);
    L.geoJson(data,{
        pointToLayer:function(feature,latlng){
            console.log(data);
            return L.circleMarker(latlng);

        },
            
        style:styleInfo
    // onEachFeature: function(feature, layer) {
    //              console.log(layer)
    //            layer.bindPopup("<h2>Neighborhood:</h2>"+"<h2>"+feature.properties.AREA_NAME+","+feature.properties.AREA_S_CD+"</h2>")}
    //            //layer.bindPopup("<h2>"+feature.properties.AREA_NAME+","+feature.properties.AREA_S_CD+"</h2><hr><h3> id "+feature.properties.id+"</h3>")}

    }
).addTo(map);
});