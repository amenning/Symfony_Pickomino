<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$errors = array();  // array to hold validation errors
$data = array();    // array to pass back data

if(isset($_POST['username']) && isset($_POST['password'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
		
	if(!empty($username) && !empty($password)){
		$query_username = "SELECT `id`,`password`,`firstname` FROM `".$mySQLi_db_table."` WHERE `username`='".mysqli_real_escape_string($mySQLi_connection, $username)."'";
		if($query_username_run = mysqli_query($mySQLi_connection,$query_username)){
			$query_username_num_rows = mysqli_num_rows($query_username_run);
			if($query_username_num_rows!=1){
				 $errors['message'] = 'Invalid username/password.';
			}else if($query_username_num_rows==1){
				$user_result = mysqli_fetch_all($query_username_run, MYSQLI_ASSOC);
				$user_id = $user_result[0]['id'];
				$user_password_hash = $user_result[0]['password'];
				$firstname = $user_result[0]['firstname'];
				//if(@password_verify($password, $user_password_hash)){				
					$_SESSION['user_id']=$user_id;
					//header('Location: /AngularJS_Pickomino_Project/InProgress/pickomino.php');
					$data['success'] = true;
					$data['firstname'] = $firstname;
					$data['user_id'] = $user_id;
					//echo $response = json_encode(array('match' => true));	
				//}else{
				//	$errors['message'] = 'Invalid username/password.';
				//}
			}
		}
		
		
	}else{
		$errors['message'] = 'You must supply a username and password';
	}
}

if (!empty($errors)) {

  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

  // if there are no errors, return a message
  $data['success'] = true;
  $data['message'] = 'Success!';
}

// return all our data to an AJAX call
echo json_encode($data);

?>