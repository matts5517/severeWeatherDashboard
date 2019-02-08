<?php require_once('initialize.php'); ?>

<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		// ******** This code below works to insert a new row into a database ***************
		$email = $_POST['email']; // this data comes from our create account form
		$first = $_POST['first'];
		$last = $_POST['last'];
		$password = $_POST['password'];

		$sql = "INSERT INTO users (email, first_name, last_name, password) VALUES ("."'" . $email ."', '".$first."', '". $last ."', '" . $password ."')";

		$result = mysqli_query($db, $sql);
		if($result){
			echo 'True';
			echo ":";
			echo $first;
		}else{ 
			echo "False"; 
		}
	}
	

	

	// ******** This code below works to query a database and return data **************
	// // sql code
	// $sql = "SELECT * FROM users WHERE id >0";
	// // perform the query
	// $subject_set = mysqli_query($db, $sql);
	// // error handle reuslt set 
	// confirm_result_set($subject_set);

	// // var_dump($subject_set);

	// // get count
	// $num = mysqli_num_rows($subject_set);
	// echo $num . ' rows'; // num of rows returned by query
	// // loop thrpough the results and print out some of the array
	// while ($row = mysqli_fetch_assoc($subject_set)) {
	//   echo "<br>";
	//   echo $row['email']. '<br>'; // loop through each row and print
	// }


	// ************** this code below works to update a record in the database *****************
	// $sql = "UPDATE users SET email='test@update.com', first_name='happy' WHERE id='5' LIMIT 1";
	// echo $sql;
	// $result = mysqli_query($db, $sql);
	

	// echo "login PHP";
 // 	$email = $_POST['email'];
 // 	echo '<div>'.$email . '</div>';
 	// easy way to see if the form has been submited
 	// if($_SERVER['REQUEST_METHOD'] == 'POST'){
 	// 	echo "Form Submitted again";
 	// 	// do things with the form data
 	// }
?>