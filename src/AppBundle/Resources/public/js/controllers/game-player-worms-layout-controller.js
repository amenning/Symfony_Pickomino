angular.module('pickominoGame')

.controller("PlayerWormsLayoutController", ['GameAction', function(GameAction){
	this.gameStatus = GameAction.status;
}]);
	