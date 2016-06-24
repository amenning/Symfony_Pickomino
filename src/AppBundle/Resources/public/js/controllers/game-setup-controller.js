angular.module('pickominoGame')		
	
.controller("SetupController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		
		this.setGame = function(type){
			switch(type){
				case "tutorial":
					GameAction.setStatus('tutorial', true);
					GameAction.setStatus('gameSetup', false);
					GameAction.setStatus('playerSetup', true);
					break;
				case "continue":
					GameState.loadGame();
					break;
				case "new":
					GameState.newGame();
					GameAction.setStatus('roll', true);
					GameAction.setStatus('gameSetup', false);
					GameAction.setStatus('playerSetup', true);
					GameAction.setStatus('gameActive', true);
					break;
			};
		};
	}
]);	