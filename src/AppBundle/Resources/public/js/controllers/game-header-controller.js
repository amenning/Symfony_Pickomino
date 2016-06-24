angular.module('pickominoGame')

.controller("GameHeaderController", ['GameAction', function(GameAction){
	this.name = GameAction.status;
}]);