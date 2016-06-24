angular.module('pickominoGame')

.directive("commonHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/common-header"
	};
});