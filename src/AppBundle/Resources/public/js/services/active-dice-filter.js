angular.module('pickominoGame')				

.factory("ActiveDiceFilter", [
	'$filter', 
	'ActiveDiceArray', 
	function ActiveDiceFilterFactory($filter, ActiveDiceArray){
		return {
			count: function(value){
				var found = $filter('filter')(ActiveDiceArray.array, {value: value}, true);
				return found.length;				
			}
		};
	}
]);