angular.module('pickominoGame')

.controller("PlayerTwoWormsController", ['PlayerWormsArray', 'StealWormAction', function(PlayerWormsArray, StealWormAction){
	this.wormValues = PlayerWormsArray.array[1];
	this.status = PlayerWormsArray.status[1];
	
	this.stealWorm = function(wormValue, fromPlayer, index){
		StealWormAction.steal(wormValue, fromPlayer, index);
	};
}]);	