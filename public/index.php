
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
				<div class="loginClose">Close</div>
			</div>
		</div>

		<!-- header area -->
		<header>
			<h1>Severe Weather Explorer</h1>
			<div class="headerOptions">
				<div>About</div>
				<div id="loginBtn">Create Account/Login</div>
			</div>
		</header>
		<!-- Main content area -->
		<div class="mainContentArea">
			<div>Main body of the site</div>
			<div class="siteSettings">
				<img src="assets/settingCog.png" style="height: 30px;">
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

