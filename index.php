
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
	<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js'></script>
	<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css' rel='stylesheet' />
	<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.2/mapbox-gl-geocoder.min.js'></script>
	<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.2/mapbox-gl-geocoder.css' type='text/css' />
	<link rel="stylesheet" media="all" href="css/main.css">
	<title><?php echo $page_title; ?></title>
</head>
	<body>
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
		<!-- Main content area -->
		<div class="mainContentArea">
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
			


			<div class="layerSelectorWrapper">
				<div class="pillCheckbox" id="">
		            <div class="subStormsWrapper">
		            	<h3>Storm Reports</h3>
		            	<hr class="whiteHr">
		            	 <label class="form-component mainCB" for="tornado-option">
			              <input checked="true" type="checkbox" id="tornado-option" name="" value="tornado">
			              <div class="check"></div>
			              <span class="form-text noselect">Tornadoes</span>
			            </label>
			            <label class="form-component mainCB" for="hail-option">
			              <input checked="true" type="checkbox" id="hail-option" name="" value="hail">
			              <div class="check"></div>
			              <span class="form-text noselect">Hail</span>
			            </label>
			            <label class="form-component mainCB" for="wind-option">
			              <input checked="true" type="checkbox" id="wind-option" name="" value="wind">
			              <div class="check"></div>
			              <span class="form-text noselect">Wind</span>
			            </label>
			            <div>Click Here for more!!</div>
			            <h3>Radar</h3>
			            <hr class="whiteHr">
			            <div id="radarSatLayers">
			            	 <label class="form-component mainCB" for="nexrad-option">
				              <input type="checkbox" id="nexrad-option" name="" value="nexrad">
				              <div class="check"></div>
				              <span class="form-text noselect">NEXRAD</span>
				            </label>
				            <label class="form-component mainCB" for="goes_vis-option">
				              <input type="checkbox" id="goes_vis-option" name="" value="goes_vis">
				              <div class="check"></div>
				              <span class="form-text noselect">GOES Vis</span>
				            </label>
				            <div id="sliderWrapper" style="display: none;">
				            	<div style="font-size: 12px;">Opacity: <span id="radar-slider-value">80</span>%</div>
				            	<div id="radSatSlider"></div>
				            </div>
				        </div>
					</div>
				</div>
			</div>
		<!-- mapbox div -->
		<div id="map"></div>

		<!-- footer -->
		<footer>
			<div>&copy <?php echo date('Y');?> <?php echo $page_title; ?></div>
		</footer>
		<!-- Bring in JS files at end of DOM -->
		
		
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/colors.js"></script>
		<script type="text/javascript" src="js/layers.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
		<script type="text/javascript" src="js/ui.js"></script>
	</body>
</html>

