<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQLi_game = 'game';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$player_id = $request->userID;


$query = "SELECT `id` FROM `".$mySQLi_game."` WHERE `player_1_id`='".$player_id."' ORDER BY `id` DESC";
if($query_run = mysqli_query($mySQLi_connection, $query)){
	$rows = mysqli_num_rows($query_run);
	if($rows>0){		
		$query_result = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
		echo $game_id = $query_result[0]['id'];
	}else{
		echo $response = false;
	}
}

?>