
<!-- index.php public facing site for  -->
<?php 
	// init php file
	require_once('private/initialize.php');
?>
<!-- bring in vars from php to js -->
 <script> let accessToken = "<?php echo $accessToken; ?>";</script>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
	<!-- bring in CSS and JS files -->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.js'></script>
	<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css' rel='stylesheet' />
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<title><?php echo $page_title; ?></title>
</head>
	<body style="width: 100%; height: 100%; padding: 0px; margin: 0px;">
		<!--  login modal window -->
		<div class="loginModalWindow">
			<div class="loginArea">
				<div class="loginCloseWrapper">
					<div class="loginClose">&times;</div>
				</div>
				<!-- sign in wrapper //////////////////////////////////// -->
				<div id="loginWrapper" class="signInWrapper">
					<div class="loginHeader">Member Sign In</div>
					<hr>
					<form id="loginForm" action="" method="post" class="loginForm">
    					<input type="text" placeholder="Email Address" name="email" required>
    					<br>
    					<input type="text" placeholder="Password" name="password" required>
    					<input class="loginButton" type="submit" name="login" value="Sign In">
					</form>
					<div class="loginFooter">
						<div class="loginFooterContent">
							<div>Not a member yet?</div>
							<button class="toSignUp">Sign Up</button>
						</div>
					</div>
				</div>
				<!-- sign up wrapper ////////////////////// -->
				<div id="createAccountWrapper" class="signUpWrapper" style="display: none;">
					<div class="loginHeader">Create Account</div>
					<hr>
					<form id="createAccountForm" class="loginForm">
						<div class="signupNameWrapper">
							<input  id="ca-firstName" type="text" minlength="2" maxlength="50" placeholder="First Name" name="first" required>
							<input id="ca-lastName" type="text" minlength="2" maxlength="50"  placeholder="Last Name" name="last">
						</div>
					
    					<input id="ca-email" type="text" placeholder="Email Address" name="email" required>
    					<br>
    					<input id="ca-passOne" type="password" minlength="6" maxlength="25" placeholder="Password (must contain letters, numbers, and special chars and be 6 or more chars)" name="password" required>
    					<input id="ca-passTwo" type="password" minlength="6" maxlength="25" placeholder="Confirm Password" name="confPassword" required>
    					<input id="submitCreateAccount" class="loginButton" disabled="disabled" type="submit" name="login" value="Create Account">
					</form>
					<div class="loginFooter">
						<div class="loginFooterContent">
							<div>Already a member?</div>
							<button class="toLogin">Log In</button>
						</div>
					</div>
				</div>
				<!-- welome wrapper after user creates account -->
				<div id="welcomeWrapper" style="display: none;">
					<div>Welcome to the site <span id="welcomeMemberName"></span>!!</div>
					<button id="welcomeToLogin">Login</button>
				</div>
			</div>
		</div>

		
		<!-- Main content area -->
		<div class="mainContentArea">
			<!-- header area -->
			<header>
				<h1><?php echo $page_title; ?></h1>
				<div id="timeWrapper">
					<span id="utcTime">01:34:27</span>
					<br>
					<span id="latLongText"></span>
				</div>
				<div class="headerOptions">

					<div>About</div>
					<div id="loginBtn">Sign In</div>
				</div>
			</header>
			<!-- <div class="siteSettings">
				<img src="assets/settingCog.png" style="height: 24px;">
			</div> -->

			<div  class="toolBoxWrapper" style="display: none;">
				<div class="toolBoxItems" id="basemapTool" style="border-bottom: none;">
					<span class="noselect">Basemap</span>
				</div>
				<span class="noselect" id="basemapSelector" style="display: none;">
					<div data-basemap='navigation-guidance-night-v2' class="basemapItems"><span>Dark</span></div>
					<div data-basemap='satellite-streets-v10' class="basemapItems"><span>Satellite</span></div>
					<div data-basemap='outdoors-v11' class="basemapItems" style="border-bottom: none;"><span>Streets</span></div>
				</span>
				
			</div>

			<div class="layerSelectorWrapper noselect">
				<div class="pillCheckbox" id="">
		            <div class="subStormsWrapper">
						 
						<!-- <hr class="whiteHr"> -->
						<h3 class="layer-header">Storm Reports</h3>
						<div id="stormReportLayers">
							<h4 class="h4LayerHeader">Severe Weather</h4>
							<div class="severeStormLayers">
							<label class="form-component mainCB" for="tornado-option">
								<input checked="true" type="checkbox" id="tornado-option" name="" value="tornado">
								<div class="check"></div>
								<div class="stormCb-countWrapper">
									<span class="form-text noselect severeStormText"><div class="layer-symbol" style="background-color: #ef2009;"></div>Tornado</span>
									<span id="tornadoCount" class="severeStormCount noselect"></span>
								</div>
							</label>
							<label class="form-component mainCB" for="hail-option">
								<input checked="true" type="checkbox" id="hail-option" name="" value="hail">
								<div class="check"></div>
								<div class="stormCb-countWrapper">
									<span class="form-text noselect severeStormText"><div class="layer-symbol" style="background-color: #1ab701;"></div>Hail</span>
									<span id="hailCount" class="severeStormCount noselect"></span>
								</div>
							</label>
							<label class="form-component mainCB" for="wind-option">
								<input checked="true" type="checkbox" id="wind-option" name="" value="wind">
								<div class="check"></div>
								<div class="stormCb-countWrapper">
									<span class="form-text noselect severeStormText"><div class="layer-symbol" style="background-color: #3D9DB3;"></div>Wind</span>
									<span id="windCount" class="severeStormCount noselect"></span>
								</div>
							</label>
							<!-- time filtering for severe storm reports -->
							<div class="layerSelectorSubHeader">Filter days:</div>
							<div class="severeTimeFilterBtnWrapper">
								<div data-severe-time-filter='today' class="radioButton severeTimeFilterButton" style="background-color: rgba(0,150,214,.95)">1</div>
								<div data-severe-time-filter='week' class="radioButton severeTimeFilterButton">7</div>
								<div data-severe-time-filter='month' class="radioButton severeTimeFilterButton">30</div>
								<div data-severe-time-filter='year' class="radioButton severeTimeFilterButton">365</div>
							</div>
						</div>


						<hr class="whiteHr">


							<h4 class="h4LayerHeader">Winter</h4>
							<label class="form-component mainCB" for="snow-option">
				              <input type="checkbox" id="snow-option" name="" value="heavy-snow">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
									<span class="form-text noselect"><div class="layer-symbol" style="background-color: #099ce6;"></div>Heavy Snow</span>
									<span id="heavy-snow-count" class="lsr-storm-count noselect"></span>
							  </div>
				             
							</label>
							<label class="form-component mainCB" for="blizzard-option">
				              <input type="checkbox" id="blizzard-option" name="" value="blizzard">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #2f2fbd;"></div>Blizzard</span>
								<span id="blizzard-count" class="lsr-storm-count noselect"></span>
							  </div>
				              
							</label>
							<label class="form-component mainCB" for="sleet-option">
				              <input type="checkbox" id="sleet-option" name="" value="sleet">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #a73bd9;"></div>Sleet/Frz. Rain</span>
								<span id="sleet-count" class="lsr-storm-count noselect"></span>
							  </div>
				              
				            </label>
				            <label class="form-component mainCB" for="ex-temp-option">
				              <input type="checkbox" id="ex-temp-option" name="" value="extreme-cold">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #de2ad8;"></div>Extreme Temps</span>
								<span id="extreme-cold-count" class="lsr-storm-count noselect"></span>
							  </div>
				              
							</label>
							<h4 class="h4LayerHeader">Rain/Flood</h4>
							<label class="form-component mainCB" for="rain-option">
				              <input type="checkbox" id="rain-option" name="" value="heavy-rain">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #53c68c;"></div>Heavy Rain</span>
								<span id="heavy-rain-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="flood-option">
				              <input type="checkbox" id="flood-option" name="" value="flood">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #00b300;"></div>Flood</span>
								<span id="flood-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="flash-flood-option">
				              <input type="checkbox" id="flash-flood-option" name="" value="flash-flood">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #008000;"></div>Flash Flood</span>
								<span id="flash-flood-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="coastal-flood-option">
				              <input type="checkbox" id="coastal-flood-option" name="" value="coastal-flood">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Coastal Flood</span>
								<span id="coastal-flood-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>



							<h4 class="h4LayerHeader">Wind</h4>
							<label class="form-component mainCB" for="sus-wind-option">
				              <input type="checkbox" id="sus-wind-option" name="" value="wind-sus">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>High Sus. Wind</span></span>
								<span id="wind-sus-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="gust-wind-option">
				              <input type="checkbox" id="gust-wind-option" name="" value="wind-gust">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>High Wind Gust</span></span>
								<span id="wind-gust-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="dmg-wind-option">
				              <input type="checkbox" id="dmg-wind-option" name="" value="wind-dmg">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Wind Damage</span></span>
								<span id="wind-dmg-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="marine-wind-option">
				              <input type="checkbox" id="marine-wind-option" name="" value="marine-tstm-wind">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #ffff00;"></div>Marine Wind Gust</span></span>
								<span id="marine-tstm-wind-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>
							<label class="form-component mainCB" for="waterspout-option">
				              <input type="checkbox" id="waterspout-option" name="" value="waterspout">
							  <div class="check"></div>
							  <div class="lsr-count-wrapper">
								<span class="form-text noselect"><div class="layer-symbol" style="background-color: #ff9900;"></div>Waterspout</span></span>
								<span id="waterspout-count" class="lsr-storm-count noselect"></span>
							  </div>
							</label>


							<!-- time filtering for severe storm reports -->
							<div class="layerSelectorSubHeader">Filter days:</div>
							<div class="severeTimeFilterBtnWrapper">
								<div data-severe-time-filter='today' class="radioButton severeTimeFilterButton" style="background-color: rgba(0,150,214,.95)">24h</div>
								<div data-severe-time-filter='month' class="radioButton severeTimeFilterButton">72h</div>
							</div>
						</div>



						<hr class="whiteHr">



						<h3 class="layer-header">Natural Hazards</h3>
						<div class="natural-hazard-layer-wrapper">
							<label class="form-component mainCB" for="earthquake-option">
								<input type="checkbox" id="earthquake-option" name="" value="earthquake">
								<div class="check"></div>
								<div class="lsr-count-wrapper">
									<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Earthquakes (Last 7d)</span></span>
									<!-- <span id="gust-wind-count" class="lsr-storm-count noselect">23</span> -->
								</div>
							</label>
							<label class="form-component mainCB" for="earthquake-option">
								<input type="checkbox" id="earthquake-option" name="" value="earthquake">
								<div class="check"></div>
								<div class="lsr-count-wrapper">
									<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Wildfires</span></span>
									<span id="gust-wind-count" class="lsr-storm-count noselect">23</span>
								</div>
							</label>
							<label class="form-component mainCB" for="drought-option">
								<input type="checkbox" id="drought-option" name="" value="drought">
								<div class="check"></div>
								<div class="lsr-count-wrapper">
									<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Drought</span></span>
									<span id="gust-wind-count" class="lsr-storm-count noselect">23</span>
								</div>
							</label>
							<label class="form-component mainCB" for="earthquake-option">
								<input type="checkbox" id="earthquake-option" name="" value="earthquake">
								<div class="check"></div>
								<div class="lsr-count-wrapper">
									<span class="form-text noselect"><div class="layer-symbol" style="background-color: #c2f0c2;"></div>Volcano</span></span>
									<span id="gust-wind-count" class="lsr-storm-count noselect">23</span>
								</div>
							</label>
						</div>
						


						<hr class="whiteHr">
						<h3 class="layer-header">Base Layers</h3>
						<div class="current-observation-layers" style="display:none;">
							<h4 class="h4LayerHeader">Temperature</h4>
							<label class="form-component mainCB" for="temperature-option">
				              <input type="checkbox" id="temperature-option" name="" value="surface_temp">
				              <div class="check"></div>
				              <span class="form-text noselect">Temperature</span>
				            </label>
							<h4 class="h4LayerHeader">Radar</h4>
							<label class="form-component mainCB" for="nexradPhase-option">
				              <input type="checkbox" id="nexradPhase-option" name="" value="nexradPhase">
				              <div class="check"></div>
				              <span class="form-text noselect">Precip Type</span>
				            </label>
				             <label class="form-component mainCB" for="nexradBase-option">
				              <input type="checkbox" id="nexradBase-option" name="" value="nexradMerged">
				              <div class="check"></div>
				              <span class="form-text noselect">Base Reflectivity</span>
							</label>
							<h4 class="h4LayerHeader">Satellite</h4>
							<label class="form-component mainCB" for="goes_vis-option">
				              <input type="checkbox" id="goes_vis-option" name="" value="goes_vis">
				              <div class="check"></div>
				              <span class="form-text noselect">Visible False Color</span>
				            </label>
				            <label class="form-component mainCB" for="global_waterVapor-option">
				              <input type="checkbox" id="global_waterVapor-option" name="" value="global_waterVapor">
				              <div class="check"></div>
				              <span class="form-text noselect">Water Vapor</span>
				            </label>
				            <label class="form-component mainCB" for="lightning-option">
				              <input type="checkbox" id="lightning-option" name="" value="lightning">
				              <div class="check"></div>
				              <span class="form-text noselect">GLM Lightning</span>
				            </label>
				             <div id="satSliderWrapper" style="display: none;">
				            	<div style="font-size: 12px;">Opacity: <span id="satellite-slider-value">70</span>%</div>
				            	<div id="satSlider"></div>
				            </div>
				            
				            <div id="radarSliderWrapper" style="display: none;">
				            	<div style="font-size: 12px;">Opacity: <span id="radar-slider-value">70</span>%</div>
				            	<div id="radSlider"></div>
				            </div>
						</div>

			            <hr class="whiteHr">
						
				        <h3 class="layer-header">Warnings/Outlooks</h3>
				        <div id="watchWarnLayers" style="display:none;">
				        	<label class="form-component mainCB" for="severeWarn-option">
				              <input type="checkbox" id="severeWarn-option" name="" value="severeWarn">
				              <div class="check"></div>
				              <span class="form-text noselect">Warnings</span>
				            </label>
				            <label class="form-component mainCB" for="severeWatch-option">
				              <input type="checkbox" id="severeWatch-option" name="" value="severeWatch">
				              <div class="check"></div>
				              <span class="form-text noselect">Watches</span>
				            </label>
				            <label class="form-component mainCB" for="severeOutlook-option">
				              <input type="checkbox" id="severeOutlook-option" name="" value="severeOutlookOutlook">
				              <div class="check"></div>
				              <span class="form-text noselect">Severe Outlook</span>
				            </label>
						</div>
					</div>
				</div>
			</div> <!-- end of layer selector div -->

			<!-- mapbox div -->
			<div id="map"></div>
			<!-- footer -->
			<footer>
				<div>&copy <?php echo date('Y');?> <?php echo $page_title; ?></div>
			</footer>
			
		
		</div> <!-- end of main content area div  -->
		
		<!-- Bring in JS files at end of DOM -->
		
		<script type="text/javascript" src="js/colors.js"></script>
		<script type="text/javascript" src="js/layers.js"></script>

		<script type="text/javascript" src="js/login.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/ui.js"></script>
		
	</body>
</html>

