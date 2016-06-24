<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQLi_game_state = 'game_state';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$game_id = $request->gameID;


$query = "SELECT * FROM `".$mySQLi_game_state."` WHERE `gameID`='".$game_id."' ORDER BY `id` DESC";
if($query_run = mysqli_query($mySQLi_connection, $query)){
	$rows = mysqli_num_rows($query_run);
	if($rows>0){
		$gameStateResult = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
		$gameStateID = $gameStateResult[0]['id'];
		$gameStatus = unserialize($gameStateResult[0]['gameStatus']);
		$grillWorms = unserialize($gameStateResult[0]['grillWorms']);
		$deadGrillWorms = unserialize($gameStateResult[0]['deadGrillWorms']);
		$activeDice = unserialize($gameStateResult[0]['activeDice']);
		$frozenDice = unserialize($gameStateResult[0]['frozenDice']);
		$frozenDiceTotal = unserialize($gameStateResult[0]['frozenDiceTotal']);
		$gameStatus = unserialize($gameStateResult[0]['gameStatus']);
		$playerMessage = unserialize($gameStateResult[0]['playerMessage']);
		$playerWorms = unserialize($gameStateResult[0]['playerWorms']);
		$playerWormsTotals = unserialize($gameStateResult[0]['playerWormsTotals']);
		
		echo $response = json_encode(array( 'gameStateID' => $gameStateID,
											'gameStatus' => $gameStatus, 
						  					'grillWorms' => $grillWorms,
						  					'deadGrillWorms' => $deadGrillWorms,
											'activeDice' => $activeDice,
											'frozenDice' => $frozenDice,
											'gameStatus' => $gameStatus,
											'playerMessage' => $playerMessage,
											'playerWorms' => $playerWorms,
											'playerWormsTotals' => $playerWormsTotals));						  
 
	}else{
		echo $response = false;
	}
}

?>

 