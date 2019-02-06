<?php
require_once('db_credentials.php'); // bring in database creds
// function used to connect to a mysql database
function db_connect(){
  // user creds, db, host, and port
  $user = DB_USER;
  $password = DB_PASS;
  $host = DB_SERVER;
  $port = 8889;
  $db = 'severe_weather_admin'; // name of mysql database

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
  confirm_db_connect();
  return $link;
}

// close the database connection
function db_close($connection){
  if(isset($connection)) {
    mysqli_close($connection);
  }
}

// database error handling //////////////////////////////
// confirm database connection
function confirm_db_connect(){
  if(mysqli_connect_errno()){
    $msg = "Database connection failed: ";
    $msg .= mysqli_connect_error();
    $msg .= " (" . mysqli_connect_errno() . ")";
    exit($msg);
  }
}

// confirm that a database query returned results
function confirm_result_set($result_set){
  if (!$result_set) {
    exit("Database query failed.");
  }
}


?>