angular.module('pickominoGame')

.directive("gameBody", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-body"
	};
});	