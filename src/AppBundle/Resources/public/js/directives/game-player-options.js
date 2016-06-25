angular.module('pickominoGame')

.directive("gamePlayerOptions", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-player-options'})
	};
});	