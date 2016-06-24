angular.module('pickominoGame')

.directive("gameSetup", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-setup"
	};
});	