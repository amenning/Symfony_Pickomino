angular.module('pickominoGame')			
		
.factory("PlayerNumber", [
    'GameAction',
    'GameState',
    function PlayerNumberFactory(GameAction, GameState){
	return {
		set: function(numPlayers){
			GameAction.setStatus('numPlayers', numPlayers);
			GameAction.setStatus('playerSetup', false);
			GameAction.setStatus('roll', true);
			GameAction.setStatus('gameSetup', false);
			GameState.newGame();
			GameState.save();
		}
	};
}]);