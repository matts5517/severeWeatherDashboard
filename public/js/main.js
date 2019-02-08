
let app = {}; // main app object to store global vars

allStormList = [
  [1, '#ef2009'],
  [2, '#2009ef'],
  [3, '#1ab701']

]

// init mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHM1NTE3IiwiYSI6ImNpeWo0amtmdTA2MGQzMm9lZWUzbHd1MW4ifQ.AJr1T--2DBpQWH_UEPPIww';
var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
	center: [-95.50, 40], // starting position [lng, lat]
	zoom: 3.5 // starting zoom
});


map.on('style.load', function(){
	// get severe storm report data
	$.getJSON("../../python/data/geoJson/severeData_130520.json", function(jsonData) {
		loadSevereLayers(jsonData);
	})
})







