angular.module('pickominoGame')

.directive("gamePlayerOptions", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-player-options"
	};
});	