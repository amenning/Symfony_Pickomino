angular.module('pickominoGame')

.directive("gameLogin", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-login'})
	};
});	