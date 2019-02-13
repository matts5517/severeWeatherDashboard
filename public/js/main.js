
let app = {}; // main app object to store global vars




// init mapbox map ****************************************************************************
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHM1NTE3IiwiYSI6ImNpeWo0amtmdTA2MGQzMm9lZWUzbHd1MW4ifQ.AJr1T--2DBpQWH_UEPPIww';
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
	center: [-95.50, 40], // starting position [lng, lat]
	zoom: 3.5 // starting zoom
});

// load layers, call functions, etc on map ready ****************************************************************************
map.on('style.load', function(){
	radarLayerLoad(); //  load radar layers
	loadESRIServices();
	// get severe storm report data
	$.getJSON("../../python/data/geoJson/severeData_130520.json", function(jsonData) {
		loadSevereLayers(jsonData);
	})
	$.getJSON("../../python/data/geoJson/watch_warn.json", function(jsonData) {
		loadWatchWarn(jsonData);
	})
})







