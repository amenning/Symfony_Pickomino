angular.module('pickominoGame')				

.factory("CheckValidWormSteal", [
	'$filter', 
	'FrozenDiceArray',
	function CheckValidWormTakeFactory($filter, FrozenDiceArray){
		return {
			validate: function(wormValue){
				var enoughDiceValue = (wormValue === FrozenDiceArray.frozenStatus.sum);
				var foundFrozenWormDie = $filter('filter')(FrozenDiceArray.array, {value: 6}, true);			
				return (enoughDiceValue && foundFrozenWormDie.length > 0);				
			}
		};
	}
]);		