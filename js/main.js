
let app = {}; // main app object to store global vars

// init mapbox map ****************************************************************************
mapboxgl.accessToken = accessToken; // this comes from PHP code to keep it hidden on the index.php page
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
	center: [-95.50, 40], // starting position [lng, lat]
	zoom: 3.5 // starting zoom
});

// load layers, call functions, etc on map ready ****************************************************************************
map.on('style.load', function(){
	radarLayerLoad(); //  load radar layers
	loadESRIServices();
	// get severe storm report data
	$.getJSON("../python/data/geoJson/severeData_130520.json", function(jsonData) {
		loadSevereLayers(jsonData);
	})
	$.getJSON("../python/data/geoJson/watch_warn.json", function(jsonData) {
		loadWatchWarn(jsonData);
	})
})







