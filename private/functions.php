
<?php
	// function used to connect to a mysql database
	function db_connect(){
	  // user creds, db, host, and port
	  $user = 'root';
	  $password = 'root';
	  $db = 'severeWeatherAdmin';
	  $host = 'localhost';
	  $port = 8889;

	  // connect to the database
	  $link = mysqli_init(); // use this var to connect to mysql
	  $success = mysqli_real_connect(
	     $link,
	     $host,
	     $user,
	     $password,
	     $db,
	     $port
	  );
	  //  error handling 
	  if(mysqli_connect_errno()){
	    // create message
	    $msg = "Database connection failed: ";
	    $msg .= mysqli_connect_error();
	    $msg .= " " . mysqli_connect_errno() . ")";
	    exit($msg);
	  }else{
	    return $link;
	  }
	}
?>


