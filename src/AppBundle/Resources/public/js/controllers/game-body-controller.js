angular.module('pickominoGame')		
	
.controller("GameBodyController", [
	'GameAction',
	function(GameAction){
		this.gameStatus = GameAction.status;
	}
]);	