angular.module('pickominoGame')	

.directive("gameActiveDice", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-active-dice"
	};
});	