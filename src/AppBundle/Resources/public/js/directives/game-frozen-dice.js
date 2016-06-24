angular.module('pickominoGame')		

.directive("gameFrozenDice", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-frozen-dice"
	};
});	