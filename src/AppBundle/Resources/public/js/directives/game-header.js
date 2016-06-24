angular.module('pickominoGame')

.directive("gameHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-header"
	};
});