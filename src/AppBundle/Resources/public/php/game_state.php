<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQLi_db_table = 'game_state';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$grillWorms = $request->grillWorms;
$deadGrillWorms = $request->deadGrillWorms;
$activeDice = $request->activeDice;
$frozenDice = $request->frozenDice;
$frozenDiceTotal = $request->frozenDiceTotal;
$gameStatus = $request->gameStatus;
$playerMessage = $request->playerMessage;
$playerWorms = $request->playerWorms;
$playerWormsTotals = $request->playerWormsTotals;
$gameID = $request->gameID;
$created_at = time();

if(isset($grillWorms) && isset($activeDice) && isset($frozenDice)){
	$query_save_game_state="INSERT INTO `".$mySQLi_db_table."` VALUES('',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($grillWorms))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($deadGrillWorms))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($activeDice))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($frozenDice))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($frozenDiceTotal))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($gameStatus))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($playerMessage))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($playerWorms))."',
		'".mysqli_real_escape_string($mySQLi_connection, serialize($playerWormsTotals))."',
		'".mysqli_real_escape_string($mySQLi_connection, $gameID)."',
		'".mysqli_real_escape_string($mySQLi_connection, $created_at)."')";
	if(@$query_save_game_state_run=mysqli_query($mySQLi_connection, $query_save_game_state)){
		$query_game_state_id="SELECT * FROM `".$mySQLi_db_table."` WHERE `created_at`='".mysqli_real_escape_string($mySQLi_connection, $created_at)."'";
		$query_game_state_id_run=mysqli_query($mySQLi_connection, $query_game_state_id);
		$query_result = mysqli_fetch_all($query_game_state_id_run, MYSQLI_ASSOC);
		echo $game_state_id = $query_result[0]['id'];
		$_SESSION['game_state_id']=$game_state_id;
	}
}
?>