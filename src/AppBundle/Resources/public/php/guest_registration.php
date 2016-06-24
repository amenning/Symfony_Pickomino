<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$errors = array();  // array to hold validation errors
$data = array();    // array to pass back data

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$firstname = $request->firstname;
$lastname = $request->lastname;
$username = $request->username;
$password = $request->password;
$password_check = $request->password_check;
$email = $request->email;


$query_username_check="SELECT `id` FROM `".$mySQLi_db_table."` WHERE `username`='".mysqli_real_escape_string($mySQLi_connection, $username)."'";
$query_username_check_run=mysqli_query($mySQLi_connection, $query_username_check);
if(@$query_username_check_run=mysqli_query($mySQLi_connection, $query_username_check)){
	$query_username_check_num_rows=mysqli_num_rows($query_username_check_run);
	if($query_username_check_num_rows!==0){
		$errors['message'] = 'Username is already taken; please choose another username';
	}else{
		$passwordhash=password_hash($password, PASSWORD_DEFAULT);
		$query_register_user="INSERT INTO `".$mySQLi_db_table."` VALUES('','".mysqli_real_escape_string($mySQLi_connection, $username)."','".mysqli_real_escape_string($mySQLi_connection, $passwordhash)."','".mysqli_real_escape_string($mySQLi_connection, $firstname)."','".mysqli_real_escape_string($mySQLi_connection, $lastname)."','".mysqli_real_escape_string($mySQLi_connection, $email)."')";
		if(@$query_register_user_run=mysqli_query($mySQLi_connection, $query_register_user)){
			$query_user_id="SELECT `id` FROM `".$mySQLi_db_table."` WHERE `username`='".mysqli_real_escape_string($mySQLi_connection, $username)."'";
			$query_user_id_run=mysqli_query($mySQLi_connection, $query_user_id);
			$user_result = mysqli_fetch_all($query_user_id_run, MYSQLI_ASSOC);
			$user_id = $user_result[0]['id'];
			$_SESSION['user_id']=$user_id;
			$data['success'] = true;
			$data['firstname'] = $firstname;
			$data['user_id'] = $user_id;
		}else{
			$errors['message'] = 'Registration Error.';
		}
	}
}else{
	$errors['message'] = 'Server Error.';
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