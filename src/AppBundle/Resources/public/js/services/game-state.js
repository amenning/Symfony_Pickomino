angular.module('pickominoGame')				

.factory("GameState", [
	'FrozenDiceArray', 
	'ActiveDiceArray', 
	'GrillWormsArray',
	'GameAction',
	'PlayerNotification',
	'PlayerWormsArray',
	'$http',
	function GameStateFactory(FrozenDiceArray, ActiveDiceArray, GrillWormsArray, GameAction, PlayerNotification, PlayerWormsArray, $http){
	
		var gameState = { 
							gameID: null,
							gameStateID: null,
							gameStatus: GameAction.status,
							grillWorms: GrillWormsArray.array,
							deadGrillWorms: GrillWormsArray.deadArray,
							playerMessage: PlayerNotification.message,
						    activeDice: ActiveDiceArray.array,
						    frozenDice: FrozenDiceArray.array,
						    frozenDiceTotal: FrozenDiceArray.frozenStatus,
						    playerWorms: PlayerWormsArray.array,
						    playerWormsTotals: PlayerWormsArray.status
		   				};
		
		return {
			newGame: function(){
				data = {userID: gameState.gameStatus.userID};
				
				return $http.post("app/assets/php/new_game.php", data)
					.success(function(data){
						gameState.gameID = data;
					});
			},
			
			save: function(){				
				return $http.post("app/assets/php/game_state.php", gameState)
					.success(function(data){
						gameState.gameStateID = data;
					});
			},
			
			loadGame: function(){
				data = {userID: gameState.gameStatus.userID};
				gameStateScope = this;
				
				return $http.post("app/assets/php/load_game.php", data)
					.success(function(data){
						if(data!=false){
							gameState.gameID=data;
							gameStateScope.loadGameState();
						}
					});
			},
			
			loadGameState: function(){
				data = {gameID: gameState.gameID};
				
				return $http.post("app/assets/php/load_game_state.php", data)
					.success(function(data){
						if(data!=false){
							gameState.gameStateID = data.gameStateID;
							GameAction.loadState(data.gameStatus);
							GrillWormsArray.loadGrillWormsState(data.grillWorms);
							GrillWormsArray.loadDeadGrillWormsState(data.deadGrillWorms);
							PlayerNotification.setMessage(data.playerMessage.info);
							ActiveDiceArray.loadState(data.activeDice);
							FrozenDiceArray.loadState(data.frozenDice);
							PlayerWormsArray.loadStatusState(data.playerWormsTotals);
							PlayerWormsArray.loadWormsState(data.playerWorms);					
						}
					});
			},
			
			clear: function(){
				
			}
		};
}]);		