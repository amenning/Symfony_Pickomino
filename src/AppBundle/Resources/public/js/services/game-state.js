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
				
				return $http.post(Routing.generate('new_game'), data)
					.success(function(data){
						gameState.gameID = data;
					});
			},
			
			save: function(){				
				return $http.post(Routing.generate('save_game_state'), gameState)
					.success(function(data){
						gameState.gameStateID = data;
					});
			},
			
			loadGame: function(){
				data = {userID: gameState.gameStatus.userID};
				gameStateScope = this;
				
				return $http.post(Routing.generate('load_game'), data)
					.success(function(data){
						if(data!="false"){
							gameState.gameID=data.gameID;
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