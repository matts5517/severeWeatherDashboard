


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
				'base': 1.75,
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
   //  // add the tornado storm layer 
   //  map.addLayer({
   //      'id': 'tornadoReport',
   //      'type': 'symbol',
   //      'source': {
   //          "type": "geojson",
   //          "data": tornadoData
   //      },
   //      'layout': {
   //          'visibility': 'visible',
   //      },
   //      "type": "circle",
   //      'paint': {
   //          'circle-color': {
   //              property: 'eventNum',
   //              stops: allStormList
   //          },
   //          'circle-radius': {
			// 	'base': 1.75,
			// 	'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
			// },
   //      },
        
   //  });

    

    var framesPerSecond = 15; 
    var initialOpacity = 1
    var opacity = initialOpacity;
    var initialRadius = 3;
    var radius = initialRadius;
    var maxRadius = 15;

    // Add a source and layer displaying a point which will be animated in a circle.
    // map.addSource('point', {
    //     "type": "geojson",
    //     "data": {
    //         "type": "geojson",
    //         "data": tornadoData
    //     }
    // });

    map.addLayer({
        "id": "point",
        "source": {
            "type": "geojson",
            "data": tornadoData
        },
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-radius-transition": {duration: 0},
            "circle-opacity-transition": {duration: 0},
            "circle-color": "#ef2009"
        }
    });

    map.addLayer({
        "id": "point1",
        "source": {
            "type": "geojson",
            "data": tornadoData
        },
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-color": "#ef2009"
        }
    });



    function animateMarker(timestamp) {
        setTimeout(function(){
            requestAnimationFrame(animateMarker);
            radius += (maxRadius - radius) / framesPerSecond;
            opacity -= ( .9 / framesPerSecond );
            if(opacity < 0){
                opacity = 0; // to stop error
            }
            map.setPaintProperty('point', 'circle-radius', radius);
            map.setPaintProperty('point', 'circle-opacity', opacity);

            if (opacity <= 0) {
                radius = initialRadius;
                opacity = initialOpacity;
            } 

        }, 1000 / framesPerSecond);
        
    }

    // Start the animation.
    animateMarker(0);


}





// })




