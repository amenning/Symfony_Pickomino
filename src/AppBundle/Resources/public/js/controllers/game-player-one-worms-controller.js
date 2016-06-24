angular.module('pickominoGame')

.controller("PlayerOneWormsController", ['GameAction', 'PlayerWormsArray', 'StealWormAction', function(GameAction, PlayerWormsArray, StealWormAction){
	this.wormValues = PlayerWormsArray.array[0];
	this.status = PlayerWormsArray.status[0];
	
	this.stealWorm = function(wormValue, fromPlayer, index){
		StealWormAction.steal(wormValue, fromPlayer, index);
	};
}]);
	