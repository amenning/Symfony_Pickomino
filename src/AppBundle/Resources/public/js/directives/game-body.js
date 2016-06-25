angular.module('pickominoGame')

.directive("gameBody", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-body'})
	};
});	