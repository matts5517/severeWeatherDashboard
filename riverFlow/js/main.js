


// init mapbox map ****************************************************************************
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHM1NTE3IiwiYSI6ImNpeWo0amtmdTA2MGQzMm9lZWUzbHd1MW4ifQ.AJr1T--2DBpQWH_UEPPIww'; // this comes from PHP code to keep it hidden on the index.php page
var map = new mapboxgl.Map({
	container: 'map', // container id
	// style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
	style: 'mapbox://styles/matts5517/cjtg30p9m6ev11fpivqwl31v2', // stylesheet location
	center: [-105.50, 39], // starting position [lng, lat]
	zoom: 5.7 // starting zoom
});

function getRiverData(){
	let url = 'data/riverFlowGeoJsonData.json'
	$.getJSON( url, function(jsonData) {
		addLayers(jsonData);
	})
}
getRiverData();

function addLayers(data){
  
	console.log('add layers', data)
	// hail past month
    var features = $.grep(data.features, function(element, index){
          // return element.properties.flow == 1 && element.properties.dayOfYear >= last30 && element.properties.dayOfYear <= app.UTCdayOfYear;
          return element.properties.flow != 'Ssn' && element.properties.flow != 'Eqp' && element.properties.flow != 'Bkw' && element.properties.flow != 'Ice';
    });
    console.log(features)
    liveSites =  {"type":"FeatureCollection", features }
    var features = $.grep(data.features, function(element, index){
          // return element.properties.flow == 1 && element.properties.dayOfYear >= last30 && element.properties.dayOfYear <= app.UTCdayOfYear;
          return element.properties.flow == 'Ssn' || element.properties.flow == 'Eqp' || element.properties.flow == 'Bkw' || element.properties.flow == 'Ice';
    });
    
    downSites =  {"type":"FeatureCollection", features}
    console.log(liveSites, downSites, data)
	// add the live sites layer 
    map.addLayer({
        'id': 'liveSites',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": data
        },
        'layout': {
            'visibility': 'visible',
        },
        "type": "circle",
        'paint': {
            'circle-color': {
                property: 'flow',
                stops: [
				  [0, 'rgba(0,0,0,.2)'],
				  [1, 'red'],
				  [10, 'orange'],
				  [24, 'orange'], 
				  [30, 'green'], 
				  [50, 'green'], 
				  [60, 'green'], 
				  [80, 'light blue'],
				  [90, 'blue'],
				]
            },
            'circle-radius': {
				'base': 1.75,
				'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
			},
        },
    });
    // add the down sites layer 
    map.addLayer({
        'id': 'liveSitesLabel',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": liveSites
        },
        "minzoom": 8, // Set zoom level to whatever suits your needs
        'layout': {
            'visibility': 'visible',
            'text-field': '{flow} cfs',
            "text-anchor": 'top',
            "text-offset": [0,0.7],
            "symbol-placement": "point",
    		"text-size": 13
        },
        'paint':{
        	'text-color': 'white',
        }
    });
    // add the down sites layer 
    map.addLayer({
        'id': 'downSites',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": downSites
        },
        'layout': {
            'visibility': 'visible',
        },
        "type": "circle",
        'paint': {
        	"circle-opacity": 0,
		    "circle-stroke-width": 1,
		    "circle-stroke-color": 'black',
        },
    });
}



