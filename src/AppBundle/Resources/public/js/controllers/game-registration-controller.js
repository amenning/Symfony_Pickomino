angular.module('pickominoGame')		
	
.controller("RegistrationController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		this.gameStatus = GameAction.status;
		
		this.setUser = function(userID){
			GameAction.setStatus('userID', userID);
			GameAction.setStatus('gameRegistration', false);
			GameAction.setStatus('gameSetup', true);
		};
	}
]);	