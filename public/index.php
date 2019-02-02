
<!-- index.php public facing site for  -->
<!-- Bring in the init php functions -->
<!-- <?php require_once('../private/initialize.php'); ?> -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
	<!-- bring in CSS and JS files -->
	<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js'></script>
	<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css' rel='stylesheet' />
	<link rel="stylesheet" media="all" href="css/main.css">
	<title>Severe Weather Explorer</title>
</head>
	<body>
		<!--  login modal window -->
		<div class="loginModalWindow">
			<div class="loginArea">
				<div class="loginCloseWrapper">
					<div class="loginClose">&times;</div>
				</div>
				<!-- sign in wrapper //////////////////////////////////// -->
				<div class="signInWrapper">
					<div class="loginHeader">Member Sign In</div>
					<hr>
					<form class="loginForm">
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
				<div class="signUpWrapper" style="display: none;">
					<div class="loginHeader">Create Account</div>
					<hr>
					<form class="loginForm">
						<div class="signupNameWrapper">
							<input type="text" placeholder="First Name" name="first" required>
							<input type="text" placeholder="Last Name" name="last" required>
						</div>
					
    					<input type="text" placeholder="Email Address" name="email" required>
    					<br>
    					<input type="text" placeholder="Password" name="password" required>
    					<input type="text" placeholder="Confirm Password" name="confPassword" required>
    					<input class="loginButton" type="submit" name="login" value="Create Account">
					</form>
					<div class="loginFooter">
						<div class="loginFooterContent">
							<div>Already a member?</div>
							<button class="toLogin">Log In</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>

		<!-- header area -->
		<header>
			<h1>Severe Weather Explorer</h1>
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
		</div>
		<!-- mapbox div -->
		<div id="map"></div>

		<!-- footer -->
		<footer>
			<div>&copy <?php echo date('Y');?> Severe Weather Explorer</div>
		</footer>
		<!-- Bring in JS files at end of DOM -->
		<script
		  src="https://code.jquery.com/jquery-3.3.1.min.js"
		  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
		  crossorigin="anonymous">
		</script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
	</body>
</html>

