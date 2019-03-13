


// js file to work with weather data layers
function loadSevereLayers(data){
    let today = app.UTCdayOfYear; 
    let last7 = app.UTCdayOfYear - 7; 
    let last30 = app.UTCdayOfYear - 31;
    app.data = {}
    // #####################################################################################
    // tornado today
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 3 && element.properties.dayOfYear == app.UTCdayOfYear;
    });
    app.data.tornadoDatatoday = {"type":"FeatureCollection", features }

    // tornado last 7 days
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 3 && element.properties.dayOfYear >= last7 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.tornadoDataweek = {"type":"FeatureCollection", features }

    // tornado last 30 days
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 3 && element.properties.dayOfYear >= last30 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.tornadoDatamonth = {"type":"FeatureCollection", features }
    

	// tornado past year
	var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 3;
    });
    
    app.data.tornadoDatayear = {"type":"FeatureCollection", features }
   
   // #####################################################################################
    // wind past Today
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 2 && element.properties.dayOfYear == app.UTCdayOfYear;
    });
    app.data.windDatatoday = {"type":"FeatureCollection", features }

    // wind past week
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 2 && element.properties.dayOfYear >= last7 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.windDataweek = {"type":"FeatureCollection", features }

    // wind past month
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 2 && element.properties.dayOfYear >= last30 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.windDatamonth = {"type":"FeatureCollection", features }

    // wind past year
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 2;
    });
    app.data.windDatayear = {"type":"FeatureCollection", features }

    // #####################################################################################
    // hail Today
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 1 && element.properties.dayOfYear == app.UTCdayOfYear;
    });
    app.data.hailDatatoday = {"type":"FeatureCollection", features }

    // hail past week
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 1 && element.properties.dayOfYear >= last7 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.hailDataweek = {"type":"FeatureCollection", features }

    // hail past month
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 1 && element.properties.dayOfYear >= last30 && element.properties.dayOfYear <= app.UTCdayOfYear;
    });
    app.data.hailDatamonth = {"type":"FeatureCollection", features }

    // hail past year
    var features = $.grep(data.features, function(element, index){
          return element.properties.eventNum == 1;
    });
    app.data.hailDatayear = {"type":"FeatureCollection", features }

    // add the wind storm layer 
    map.addLayer({
        'id': 'wind',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": app.data.windDatatoday
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
        'id': 'hail',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": app.data.hailDatatoday
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
        'id': 'tornado',
        'type': 'symbol',
        'source': {
            "type": "geojson",
            "data": app.data.tornadoDatatoday
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
     // add the storm selection layer
    map.addLayer({
        'id': 'storm_selection',
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
            'circle-color':"#efe140",
            'circle-radius': {
                'base': 1.75,
                'stops': [[1, 2],[4, 3],[6, 5],[10, 10],[14, 25]]
            },
        },
        "filter": ["in", "uniqueid", ""]
    });
    // // use code below to add a point pukse functionality ***************************
    // var framesPerSecond = 15; 
    // var initialOpacity = 1
    // var opacity = initialOpacity;
    // var initialRadius = 3;
    // var radius = initialRadius;
    // var maxRadius = 15;

    // // Add a source and layer displaying a point which will be animated in a circle.
    // // map.addSource('point', {
    // //     "type": "geojson",
    // //     "data": {
    // //         "type": "geojson",
    // //         "data": tornadoData
    // //     }
    // // });

    // map.addLayer({
    //     "id": "point",
    //     "source": {
    //         "type": "geojson",
    //         "data": tornadoData
    //     },
    //     "type": "circle",
    //     "paint": {
    //         "circle-radius": initialRadius,
    //         "circle-radius-transition": {duration: 0},
    //         "circle-opacity-transition": {duration: 0},
    //         "circle-color": "#ef2009"
    //     }
    // });

    // map.addLayer({
    //     "id": "point1",
    //     "source": {
    //         "type": "geojson",
    //         "data": tornadoData
    //     },
    //     "type": "circle",
    //     "paint": {
    //         "circle-radius": initialRadius,
    //         "circle-color": "#ef2009"
    //     }
    // });



    // function animateMarker(timestamp) {
    //     setTimeout(function(){
    //         requestAnimationFrame(animateMarker);
    //         radius += (maxRadius - radius) / framesPerSecond;
    //         opacity -= ( .9 / framesPerSecond );
    //         if(opacity < 0){
    //             opacity = 0; // to stop error
    //         }
    //         map.setPaintProperty('point', 'circle-radius', radius);
    //         map.setPaintProperty('point', 'circle-opacity', opacity);

    //         if (opacity <= 0) {
    //             radius = initialRadius;
    //             opacity = initialOpacity;
    //         } 

    //     }, 1000 / framesPerSecond);
        
    // }

    // // Start the animation.
    // animateMarker(0);
} // end of load severe weather data function


// load radar layers

function radarLayerLoad(){
    // the url below is for archived radar products !!!!!!!!!!!!!!!! back to at least 2007
    'https://mesonet.agron.iastate.edu/archive/data/2019/01/05/GIS/uscomp/n0q_201901051835.png'
    // may 20th 2013 radar image
    'https://mesonet.agron.iastate.edu/archive/data/2013/05/20/GIS/uscomp/n0r_201305200005.png'
    'https://mesonet.agron.iastate.edu/cgi-bin/wms/iowa/rainfall.cgi?'

    // at specific time
    'http://realearth.ssec.wisc.edu/tiles/nexrphase/20190303/212100/{z}/{x}/{y}.png'
    // radar layers //////////////////////
    map.addLayer({
        'id': 'nexrad',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'http://realearth.ssec.wisc.edu/tiles/nexrphase/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
        }
    },);
    map.setPaintProperty('nexrad', 'raster-opacity', .70);
    // radar - 10 mins
    map.addLayer({
        'id': 'radar_10',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m10m/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // radar - 20 mins
    map.addLayer({
        'id': 'radar_20',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m20m/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // radar - 50 mins
    map.addLayer({
        'id': 'radar_50',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m50m/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    
    // 1 hour precip
    map.addLayer({
        'id': 'one_hour_precip',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-n1p-900913/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // 24 hour precip
    map.addLayer({
        'id': '24_precip',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-p24h-900913/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // 48 hour precip
    map.addLayer({
        'id': '48_precip',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-p48h-900913/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // 72 hour precip
    map.addLayer({
        'id': '72_precip',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-p72h-900913/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {}
    },);
    // satalite layers ////////////////////////
    // goes vis
    map.addLayer({
        'id': 'goes_vis',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://realearth.ssec.wisc.edu/tiles/globalir-avn/{z}/{x}/{y}.png'
            ],
            'tileSize': 256
        },
        'layout': {
            'visibility': 'none'
        },
        
    },);
    map.setPaintProperty('goes_vis', 'raster-opacity', .70);

} 


function loadESRIServices(){
}

function loadWatchWarn(data){
    let features = data.features
    var tornadoData = {"type":"FeatureCollection", features }
    map.addLayer({
        'id': 'watch_warn',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': tornadoData,
        },
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    },);
}
// end of code *****************************************




















// // use code below to add a point pukse functionality ***************************
//     var framesPerSecond = 15; 
//     var initialOpacity = 1
//     var opacity = initialOpacity;
//     var initialRadius = 3;
//     var radius = initialRadius;
//     var maxRadius = 15;

//     // Add a source and layer displaying a point which will be animated in a circle.
//     // map.addSource('point', {
//     //     "type": "geojson",
//     //     "data": {
//     //         "type": "geojson",
//     //         "data": tornadoData
//     //     }
//     // });

//     map.addLayer({
//         "id": "point",
//         "source": {
//             "type": "geojson",
//             "data": tornadoData
//         },
//         "type": "circle",
//         "paint": {
//             "circle-radius": initialRadius,
//             "circle-radius-transition": {duration: 0},
//             "circle-opacity-transition": {duration: 0},
//             "circle-color": "#ef2009"
//         }
//     });

//     map.addLayer({
//         "id": "point1",
//         "source": {
//             "type": "geojson",
//             "data": tornadoData
//         },
//         "type": "circle",
//         "paint": {
//             "circle-radius": initialRadius,
//             "circle-color": "#ef2009"
//         }
//     });



//     function animateMarker(timestamp) {
//         setTimeout(function(){
//             requestAnimationFrame(animateMarker);
//             radius += (maxRadius - radius) / framesPerSecond;
//             opacity -= ( .9 / framesPerSecond );
//             if(opacity < 0){
//                 opacity = 0; // to stop error
//             }
//             map.setPaintProperty('point', 'circle-radius', radius);
//             map.setPaintProperty('point', 'circle-opacity', opacity);

//             if (opacity <= 0) {
//                 radius = initialRadius;
//                 opacity = initialOpacity;
//             } 

//         }, 1000 / framesPerSecond);
        
//     }

//     // Start the animation.
//     animateMarker(0);








// })




