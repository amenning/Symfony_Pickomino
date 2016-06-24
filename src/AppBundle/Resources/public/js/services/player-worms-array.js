angular.module('pickominoGame')				

.factory("PlayerWormsArray", ['SetWormImage', 'GetWormType', 'GameAction', function PlayerWromsFactory(SetWormImage, GetWormType, GameAction){
	var playerWormsArray = [[],[]];
	
	var playerStatus = [{total: 0}, {total: 0}];
	
	return {
		array: playerWormsArray,
		
		status: playerStatus,
		
		addWorm: function(wormValue){	
			wormImage = SetWormImage.imagify(wormValue);
			playerWormsArray[GameAction.status.activePlayer].unshift({value: wormValue, image: wormImage});
			playerStatus[GameAction.status.activePlayer].total += GetWormType.amount(wormValue);
		},
		
		removeBunkWorm: function(){
			var wormValue = playerWormsArray[GameAction.status.activePlayer][0].value;
			playerWormsArray[GameAction.status.activePlayer].shift();
			playerStatus[GameAction.status.activePlayer].total -= GetWormType.amount(wormValue);
			return wormValue;
		},
		
		removeStolenWorm: function(){
			var wormValue = playerWormsArray[GameAction.status.nonActivePlayer][0].value;
			playerWormsArray[GameAction.status.nonActivePlayer].shift();
			playerStatus[GameAction.status.nonActivePlayer].total -= GetWormType.amount(wormValue);
			return wormValue;
		},
		
		emptyArray: function(array){
			for(var i=array.length; i>0; i--){
				array.pop();
			}
		},
		
		loadWormsState: function(state){
			for(var x=0; x<state.length; x++){
				if(state[x]!==undefined && state[x].length>0){
					this.emptyArray(playerWormsArray[x]);
					for(var y=0; y<state[x].length; y++){
						playerWormsArray[x].push(state[x][y]);
					}
				}
			}
		},
		
		loadStatusState: function(state){
			if(state!==undefined && state.length>0){
				for(var x=0; x<state.length; x++){
					playerStatus[x].total  = state[x].total;
				}
			}
		}		
		
	};
}]);	