angular.module('pickominoGame')

.controller("GrillWormsController", ['GrillWormsArray', 'TakeWormAction', function(GrillWormsArray, TakeWormAction){
	this.grillWormsValues = GrillWormsArray.array;
	this.deadGrillWormsValues = GrillWormsArray.deadArray;
	
	this.takeWorm = function(wormValue){
		TakeWormAction.take(wormValue);
	}
}]);
