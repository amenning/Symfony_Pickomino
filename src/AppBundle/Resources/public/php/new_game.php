<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQLi_db_table = 'game';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//$gameStatus = $request->gameStatus;
$player_1_id = $request->userID;
$created_at = time();

$query_create_new_game="INSERT INTO `".$mySQLi_db_table."` VALUES('',
																 '".mysqli_real_escape_string($mySQLi_connection, $player_1_id)."',
																 '',	
																 '".mysqli_real_escape_string($mySQLi_connection, $created_at)."')";

if(@$query_create_new_game_run=mysqli_query($mySQLi_connection, $query_create_new_game)){
	$query_game_id="SELECT * FROM `".$mySQLi_db_table."` WHERE `created_at`='".mysqli_real_escape_string($mySQLi_connection, $created_at)."'";
	$query_game_id_run=mysqli_query($mySQLi_connection, $query_game_id);
	$query_game_id_result = mysqli_fetch_all($query_game_id_run, MYSQLI_ASSOC);
	echo $game_id = $query_game_id_result[0]['id'];
	$_SESSION['game_id']=$game_id;
}
?>