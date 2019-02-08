
<!-- index.php public facing site for  -->
<!-- Bring in the init php functions -->
<?php require_once('../private/initialize.php');?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
	<!-- bring in CSS and JS files -->
	<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js'></script>
	<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css' rel='stylesheet' />
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
			<div class="headerOptions">
				<div>About</div>
				<div id="loginBtn">Sign In</div>
			</div>
		</header>
		<!-- Main content area -->
		<div class="mainContentArea">
			<div class="siteSettings">
				<img src="assets/settingCog.png" style="height: 24px;">
			</div>


			<div class="layerSelectorWrapper">
				<!-- <input checked="true" type="checkbox" id="current-option" name="" value="co"> -->

				<div class="pillCheckbox" id="currentObs-Pill">
		            <!-- <label class="form-component mainCB" for="all-option">
		              <input checked="true" type="checkbox" id="all-option" name="" value="all">
		              <div class="check"></div>
		              <span class="form-text">All Storms</span>
		            </label> -->
		            <div class="subStormsWrapper">
		            	<h3>Storm Reports</h3>
		            	<hr class="whiteHr">
		            	 <label class="form-component mainCB" for="tornado-option">
			              <input checked="true" type="checkbox" id="tornado-option" name="" value="tornado">
			              <div class="check"></div>
			              <span class="form-text">Tornadoes</span>
			            </label>
			            <label class="form-component mainCB" for="hail-option">
			              <input checked="true" type="checkbox" id="hail-option" name="" value="hail">
			              <div class="check"></div>
			              <span class="form-text">Hail</span>
			            </label>
			            <label class="form-component mainCB" for="wind-option">
			              <input checked="true" type="checkbox" id="wind-option" name="" value="wind">
			              <div class="check"></div>
			              <span class="form-text">Wind</span>
			            </label>
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
		<script
		  src="https://code.jquery.com/jquery-3.3.1.min.js"
		  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
		  crossorigin="anonymous">
		</script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/layers.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
		<script type="text/javascript" src="js/ui.js"></script>
	</body>
</html>

