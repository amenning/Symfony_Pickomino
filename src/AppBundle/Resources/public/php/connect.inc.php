<?php
$mySQLi_host = 'localhost';
$mySQLi_user = 'root';
$mySQLi_pass = '';
$mySQLi_db = 'pickominotest';
$mySQLi_db_table = 'users';

$mySQLi_connection = @mysqli_connect($mySQLi_host,$mySQLi_user,$mySQLi_pass);
@mysqli_select_db($mySQLi_connection, $mySQLi_db);

//if(!@($connection = mysqli_connect($mySQL_host,$mySQL_user,$mySQL_pass)) || !@mysqli_select_db($mySQL_db)){	
	//die(mysqli_error($connection));
//}
?>