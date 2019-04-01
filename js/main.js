
let app = {}; // main app object to store global vars
// let pathToData = '../efs/severeWeatherData/' // for ec2 instance
let pathToData = '../python/data/' // for development on mac


// init mapbox map ****************************************************************************
mapboxgl.accessToken = accessToken; // this comes from PHP code to keep it hidden on the index.php page
var map = new mapboxgl.Map({
	container: 'map', // container id
	// style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
	style: 'mapbox://styles/matts5517/cjtg30p9m6ev11fpivqwl31v2', // stylesheet location
	center: [-95.50, 40], // starting position [lng, lat]
	zoom: 3.2 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl({showCompass:false, showZoom:true}));

// load layers, call functions, etc on map ready ****************************************************************************
map.on('style.load', function(){
	radarLayerLoad(); //  load radar layers
	loadESRIServices(); // load esri services geojson

	// get severe storm report json data
	$.getJSON( pathToData + "geoJson/severeWeather/currentYear_stormReports.json", function(jsonData) {
		app.severeStormData = jsonData; // set global var to carry over severe storm json to entire app
		loadSevereLayers(app.severeStormData);
		
	})
	// get severe storm count json data
	$.getJSON( pathToData + "geoJson/severeWeather/stormReports_count.json", function(jsonData) {
		app.severeStormCount = jsonData;
		populateStormCount(); // count storms and populate html
	})
	// get USA counties data
	$.getJSON( pathToData + "geoJson/staticData/cb_2017_us_county_20m.geojson", function(jsonData) {
		staticLayerLoad(jsonData)
		
	})
})







