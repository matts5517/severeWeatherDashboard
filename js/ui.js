// js file for handling the UI of the site ////////////////////////////////////////////////////////////////////////////////////////

// utc clock on main site
function startTime() {
  	var today = new Date();
  	let utcMonth = today.getUTCMonth();
  	let utcDate = today.getUTCDate();
  	let utcYear = today.getUTCFullYear();
  	let utcHour = today.getUTCHours();
	let utcMin = today.getUTCMinutes();
	let utcSec = today.getUTCSeconds();
	let gmtPlus = today.getTimezoneOffset()/60
  	let html ="Time (UTC+" +gmtPlus+ "): " + utcMonth +"/" + utcDate + "/" +utcYear+ " - " 
  	+  checkTime(utcHour) + ":"+ checkTime(utcMin) + ":" + checkTime(utcSec)
  	$('#utcTime').html(html)
  	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
startTime();


// checkbox layer toggle visibility functionality
let inputs = $('.pillCheckbox input')

$('.pillCheckbox input').on('change',function(v){
	let checked = v.currentTarget.checked;
	let type = v.currentTarget.type;
	let val = $(this).val()
	let radarInput = $('#radarSatLayers input:checked')
	if(radarInput.length > 0){
		$('#sliderWrapper').slideDown();
	}else{
		$('#sliderWrapper').slideUp();
	}
	// only update layers if type checkbox
	if(type == 'checkbox'){
		if(checked){
			map.setLayoutProperty(val, 'visibility', 'visible');
			// if(val === 'nexrad'){
			// 	$('#radarLoop').show();
			// 	loopRadar();
			// }
		}else{
			map.setLayoutProperty(val, 'visibility', 'none');
			// if(val === 'nexrad'){
			// 	$('#radarLoop').hide();
			// 	loopRadar();
			// }
		}
	}
})
// sat and radar slider functionality
$( "#radSatSlider" ).slider({
	value: 80,
  	slide: function( v, ui ) {
  		let sliderVal = ui.value;
  		$('#radar-slider-value').html(sliderVal);
  		map.setPaintProperty('nexrad', 'raster-opacity', parseInt(sliderVal, 10) / 100);
  		map.setPaintProperty('goes_vis', 'raster-opacity', parseInt(sliderVal, 10) / 100);
  	}
});




// on map click
map.on('click', function(e) {
	// set bbox as 5px reactangle area around clicked point
	var bbox = [[e.point.x - 3, e.point.y - 3], [e.point.x + 3, e.point.y + 3]];
	var features = map.queryRenderedFeatures(bbox, { layers: ['tornado', 'hail', 'wind'] });
	// filter features to show the storm selection symbol.
	i = 1
	var filter = features.reduce(function(memo, feature) {
		if(i==1){ // limit to only one selected point
			memo.push(feature.properties.uniqueid);
		}
		i +=1
		return memo;
	}, ['in', 'uniqueid']);
	map.setFilter("storm_selection", filter);

	// call the populate storm info function
	populateStormInfo(features[0])
})
// populate storm information function
function populateStormInfo(feat){
	console.log(feat.properties, 'hey')
	// build out the html for storm click here
}
// on mouse move over map
map.on('mousemove', function (e) {
	let lon = parseFloat(e.lngLat.lng).toFixed(2)
	let lat = parseFloat(e.lngLat.lat).toFixed(2)
	// add lat long to the map
	$('#latLongText').html(lon + ' ' + lat)

	var bbox = [[e.point.x - 3, e.point.y - 3], [e.point.x + 3, e.point.y + 3]];
	var features = map.queryRenderedFeatures(bbox, { layers: ['tornado', 'hail', 'wind'] });
	if(features.length > 0){
		map.getCanvas().style.cursor = 'pointer';
	}else{
		map.getCanvas().style.cursor = '';
	}
})
// on toolbox/settings click
$('.siteSettings').on('click', function(v){
	if ($('.toolBoxWrapper').is(":visible")) {
		$('.toolBoxWrapper').slideUp()
	}else{
		$('.toolBoxWrapper').slideDown()
	}
})
// on basemap tool selection
$('#basemapTool').on('click', function(v){
	if ($('#basemapSelector').is(":visible")) {
		$('#basemapSelector').slideUp()
	}else{
		$('#basemapSelector').slideDown()
	}
	
})
basemapSelector
$('.basemapItems').on('click', function(v){
	let layerId = v.currentTarget.dataset['basemap']
	// dont let the user reselect a basemap if its already selected
	if (layerId != map.style.stylesheet.id) {
		map.setStyle('mapbox://styles/mapbox/' + layerId);
		$('#basemapSelector').slideUp()
	}
	
})





// // if clicked off the toolbox dropdown
// $(document).bind('click', function(e) {
// 	console.log(e.target)
// 	// || !$(e.target).is('.toolBoxItems'))
// 	if (!$(e.target).is('.basemapItems') ) {
// 		console.log('other click')
// 	}
//   // if(!$(e.target).is('#special')) {
//   //   // do something
//   // }
// });

// works but super slow right now. maybe have to download image to server
// function loopRadar(){
// 	i = 0
// 	let radarArray = ['nexrad','radar_10','radar_20','radar_50'];
// 	setInterval(function(){
// 		map.setLayoutProperty('nexrad', 'visibility', 'none');
// 		map.setLayoutProperty('radar_10', 'visibility', 'none');
// 		map.setLayoutProperty('radar_20', 'visibility', 'none');
// 		map.setLayoutProperty('radar_50', 'visibility', 'none');
// 		console.log('timeout')
// 		console.log(i)
// 		console.log(radarArray[i])
// 		map.setLayoutProperty(radarArray[i], 'visibility', 'visible');
// 		if(i==3){
// 			i=0
// 		}else{
// 			i++
// 		}
		
// 	},3000)


// }


// function loopRadar(){
// 	console.log('loop');
// 	let radarArray = ['nexrad','radar_10','radar_20','radar_50'];

// 	function nexradLoop(){
// 		console.log('radar loop');
// 		map.setLayoutProperty('nexrad', 'visibility', 'none');
// 		map.setLayoutProperty('radar_10', 'visibility', 'none');
// 		map.setLayoutProperty('radar_20', 'visibility', 'none');
// 		map.setLayoutProperty('radar_50', 'visibility', 'none');
// 		$.each(radarArray, function(i,v){
// 			console.log(v)
// 			map.setLayoutProperty(v, 'visibility', 'visible');
// 		})
		

// 		t = setTimeout(nexradLoop,2000);
// 	}

// 	nexradLoop();
// }



















// // check temp radio button on start
// $("#temp_f-option").prop("checked", true);
// // show Current ops pill box on init site load
// $('#currentObs-CntrlWrap').show();
// // on main cb click
// 	$('.mainCB input').on('click', function(e){
// 		if(e.currentTarget.checked){
// 			$(e.currentTarget).parent().parent().next().slideDown()
// 			// loop through inputs below and figure out which are checked
// 			$.each($(e.currentTarget).parent().parent().next().find('input'), function(i,v){
// 				// console.log(e)
// 				if(v.checked){
// 					if (e.currentTarget.value == 'co') {
// 						currentObsLayers(v.value)
// 					}else if (e.currentTarget.value == 'sev') {
// 						severeLayers(v.value)
// 					}else if(e.currentTarget.value == 'rad'){
// 						radarLayers(v.value);
// 					}else{
// 						console.log('its another')
// 					}
					
// 				}else{
// 					console.log(e.currentTarget)
// 				}
// 			})
// 				// based on if checked 

// 				// turn on those layer groups by calling the appropriate function


// 		}else{ // if not checked
// 			if (e.currentTarget.value == 'co') {
// 				currentObsLayers('null')
// 			}
// 			if (e.currentTarget.value == 'sev') {
// 				severeLayers('null')
// 			}
// 			if (e.currentTarget.value == 'rad') {
// 				radarLayers('null')
// 			}
// 			$(e.currentTarget).parent().parent().next().slideUp()
// 		}
// 	})
// 	// if checked

// 	// slide down control wrapper below

// 	// figure out which radio/cb button is checked and trigger click











// // Build out the animation for the attribute window expand collapse functionality ////////////////////////////////////////////////
// // $("#attributeMinBtn").click(function () {
// // 	var width = $("#sideBarAttWrapper").width();
// // 	if(width > 250){
// // 		$("#sideBarAttWrapper").animate({ width: '160px'});
// // 		$('#attributeMinBtn').css({ "transform": "rotate(0deg)"})
// // 		$('#currentObs-CntrlWrap').find('.cb_slideContent').each(function(i,v){
// //           $(v).slideUp();
// //     	})

// // 	}else{
// // 		$("#sideBarAttWrapper").animate({ width: '300px'});
// // 		$('#attributeMinBtn').css({ "transform": "rotate(180deg)"})
// // 		$('#currentObs-CntrlWrap').find('input').each(function(i,v){
// // 			if(v.checked){
// // 				$(v).parent().next().children().slideDown();
// // 			}
// // 		})
// // 	}
// // });


// // $( ".pillCheckbox" ).on( "click", function(c) {
// // 	// turn off all the current obs layers now when clicking a different pill box
// // 	if(c.currentTarget.id != 'currentObs-Pill'){
// // 		$(app.lyrList).each(function(v,c){
// // 	        map.setLayoutProperty(c, 'visibility', 'none');
// // 	    })
// // 	}else{ // if the current obs pill is clicked tun on the appropriate layer as indicated by the radio button
// // 		// loop through rad butons to find which one is checked
// // 		$($('#currentObs-CntrlWrap').find('input')).each(function(v,c){
// // 			if(c.checked){
// // 				map.setLayoutProperty(c.value, 'visibility', 'visible');
// // 			}
// // 		})
// // 	}

// // 	var pillID = c.currentTarget.id.split('-')[0];
// // 	var newID;
// // 	// add orange css color text to show what is selected
// // 	let test = $('.sideBarNavigation').find('.pillCheckbox')
// // 	console.log('look 2	')
// // 	$('.sideBarNavigation').find('.pillCheckbox').each(function(i,v){
// //           $(v).css('color', 'white')
// //     })
// // 	$(c.currentTarget).css('color', 'orange')
// // 	// slide down the appropriate control wrapper section.
// // 	$( ".cntrlWrap" ).each(function(v,c){
// // 		var ctrID = c.id.split('-')[0];
// // 		var ctrID2 = c.id;
// // 		if(ctrID == pillID){
// // 			newID = pillID + '-CntrlWrap';
// // 			$( "#" + newID ).slideDown();
// // 		}else{
// // 			$( "#" + ctrID2 ).slideUp();
// // 		}
// // 	});
	
// // });

// // Handle radio buttons for current observations //////////////////////////////////////////////////////////////////
// $( "#currentObs-CntrlWrap input" ).on( "click", function(c) {
// 	var val = c.currentTarget.value;
// 	if(c.currentTarget.checked == true){
// 	  	// $('#' + val).slideDown()
// 	  	console.log(val)
// 	  	currentObsLayers(val); // call the function that controls the visible layers
// 	  }else{
// 	  	// $('#' + val).slideUp()
// 	  	''
// 	  }
// 	//   // loop through radio buttons and slide up all the others that do not match the current target.
// 	//   $( "#currentObs-CntrlWrap input" ).each(function(v,c){
// 	// 	   if(c.value == val){
// 	// 	   	''
// 	// 	   }else{
// 	// 	   	 // $('#' + c.value).slideUp()
// 	// 	   }
// 	// });
// });
// // Handle radio buttons for severe storm reports //////////////////////////////////////////////////////////////////
// $( "#severe-CntrlWrap input" ).on( "click", function(c) {
// 	var val = c.currentTarget.value;
// 	if(c.currentTarget.checked == true){
// 	  	severeLayers(val); // call the function that controls the visible layers
// 	  }
// })
// // Handle radio buttons for radar layers //////////////////////////////////////////////////////////////////
// $( "#radar-CntrlWrap input" ).on( "click", function(c) {
// 	var val = c.currentTarget.value;
// 	if(c.currentTarget.checked == true){
// 	  	radarLayers(val); // call the function that controls the visible layers
// 	  }
// })

// //layout range slider
// // Temp slider Handeler //////////////////////////////////////////////////////////////////////////////////////////
// // $('#tempSldr').slider({range:true, min:-20, max:130, values:[0,100]});
// // $('#tempSldr').on('slidechange', function( event, ui ) {
// // 	var id = event.target.id;
// // 	var lowerVal = ui.values[0]
// //     var upperVal  = ui.values[1]
// // 	currentSliderChange(id,lowerVal, upperVal); // call slider change function.
// // });
// // $('#tempSldr').on('slide', function( event, ui ) {
// // 	$('#tempSldr').prev().find('span').each(function(i,v){
// //         $(v).html(ui.values[i])
// //         test();
// //     })
// // });

// // // Wind slider Handeler //////////////////////////////////////////////////////////////////////////////////////////
// // $('#windSldr').slider({range:true, min:0, max:100, values:[0,100]});
// // $('#windSldr').on('slidechange', function( event, ui ) {
// // 	var id = event.target.id;
// // 	var lowerVal = ui.values[0]
// //     var upperVal  = ui.values[1]
// // 	currentSliderChange(id,lowerVal, upperVal); // call slider change function.
// // });
// // $('#windSldr').on('slide', function( event, ui ) {
// // 	$('#windSldr').prev().find('span').each(function(i,v){
// //         $(v).html(ui.values[i])
// //     })
// // });
// // // Wind gust slider Handeler //////////////////////////////////////////////////////////////////////////////////////////
// // $('#windGustSldr').slider({range:true, min:0, max:100, values:[0,100]});
// // $('#windGustSldr').on('slidechange', function( event, ui ) {
// // 	var id = event.target.id;
// // 	var lowerVal = ui.values[0]
// //     var upperVal  = ui.values[1]
// // 	currentSliderChange(id,lowerVal, upperVal); // call slider change function.
// // });
// // $('#windGustSldr').on('slide', function( event, ui ) {
// // 	console.log('wind gust slider slide');
// // 	$('#windGustSldr').prev().find('span').each(function(i,v){
// //         $(v).html(ui.values[i])
// //     })
// // });
// // // Humidity slider Handeler //////////////////////////////////////////////////////////////////////////////////////////
// // $('#humiditySldr').slider({range:true, min:0, max:100, values:[0,100]});
// // $('#humiditySldr').on('slidechange', function( event, ui ) {
// // 	var id = event.target.id;
// // 	var lowerVal = ui.values[0]
// //     var upperVal  = ui.values[1]
// // 	currentSliderChange(id,lowerVal, upperVal); // call slider change function.
// // });
// // $('#humiditySldr').on('slide', function( event, ui ) {
// // 	console.log('humidity slider slide');
// // 	$('#humiditySldr').prev().find('span').each(function(i,v){
// //         $(v).html(ui.values[i])
// //     })
// // });
// // Pressure slider Handeler //////////////////////////////////////////////////////////////////////////////////////////
// // $('#pressureSldr').slider({range:true, min:0, max:100, values:[0,100]});
// // $('#pressureSldr').on('slidechange', function( event, ui ) {
// // 	var id = event.target.id;
// // 	var lowerVal = ui.values[0]
// //     var upperVal  = ui.values[1]
// // 	currentSliderChange(id,lowerVal, upperVal); // call slider change function.
// // });
// // $('#pressureSldr').on('slide', function( event, ui ) {
// // 	console.log('pressure slider slide');
// // 	$('#pressureSldr').prev().find('span').each(function(i,v){
// //         $(v).html(ui.values[i])
// //     })
// // });


// // Handle changing the icon color on hover ////////////////////////////////////////////////////////////////////////
// $( ".checkboxWrap label").on( "mouseover", function(c) {
// 	$(this).next().addClass('hover');
// });
// $( ".checkboxWrap label" ).on( "mouseout", function(c) {
// 	$(this).next().removeClass('hover');
// });


