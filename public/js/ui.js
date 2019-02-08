// js file for handling the UI of the site ////////////////////////////////////////////////////////////////////////////////////////


// when a user clicks on All Storms, 
$('#all-option').on('click', function(v){
	console.log(v);
	let val = $(this).val();
	console.log(val)
})
	// if checkbox checked

		// loop through all sub checkboxes and trigger check them

	// else

		// loop through all sub checkboxes and trigger uncheck them
































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


