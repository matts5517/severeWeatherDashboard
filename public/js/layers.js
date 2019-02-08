

// js file to work with weather data layers
function loadSevereLayers(test){
	// tornado
	var features = $.grep(test.features, function(element, index){
          return element.properties.eventNum == 3;
    });
    var tornadoData = {"type":"FeatureCollection", features }
    // wind
    var features = $.grep(test.features, function(element, index){
          return element.properties.eventNum == 2;
    });
    var windData = {"type":"FeatureCollection", features }
    // hail 
    var features = $.grep(test.features, function(element, index){
          return element.properties.eventNum == 1;
    });
    var hailData = {"type":"FeatureCollection", features }
    
    console.log( windData);
    console.log(allStormList)
    // add the wind storm layer 
    map.addLayer({
        'id': 'windReport',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": windData
        },
        'layout': {
            'visibility': 'visible',
        },
        "type": "circle",
        'paint': {
            'circle-color': {
                property: 'eventNum',
                stops: allStormList
            },
            'circle-radius': {
				'base': 3.75,
				'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
			},
        },
        
    });
    // add the hail storm layer 
    map.addLayer({
        'id': 'hailReport',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": hailData
        },
        'layout': {
            'visibility': 'visible',
        },
        "type": "circle",
        'paint': {
            'circle-color': {
                property: 'eventNum',
                stops: allStormList
            },
            'circle-radius': {
				'base': 1.75,
				'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
			},
        },
        
    });
    // add the tornado storm layer 
    map.addLayer({
        'id': 'tornadoReport',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": tornadoData
        },
        'layout': {
            'visibility': 'visible',
        },
        "type": "circle",
        'paint': {
            'circle-color': {
                property: 'eventNum',
                stops: allStormList
            },
            'circle-radius': {
				'base': 3.75,
				'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
			},
        },
        
    });


}





// })




