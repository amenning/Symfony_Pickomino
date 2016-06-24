angular.module('pickominoGame')				

.factory("CheckValidDiceFreeze", [
	'$filter', 
	'FrozenDiceArray',
	function CheckValidDiceFreezeFactory($filter, FrozenDiceArray){
		return {
			validate: function(freezeValue){
				var found = $filter('filter')(FrozenDiceArray.array, {value: freezeValue}, true);
				return (found.length===0);				
			}
		};
	}
]);