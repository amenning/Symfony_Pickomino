angular.module('pickominoGame')				

.factory("ActiveDiceArray", ['$filter', 'SetDiceImage', function ActiveDiceFactory($filter, SetDiceImage, $scope){
	
	var activeDiceArray = [ ];
	
	for(var x=0, diceValue, diceImage; x<8; x++){
		diceValue=6;
		diceImage=SetDiceImage.imagify(diceValue);
		activeDiceArray.push({value: diceValue, image: diceImage, canFreeze: false});
	}
	
	return {
		array: activeDiceArray,
		
		remove: function(diceValue){	
			for(var x=activeDiceArray.length-1; x>=0; x--){
				if(activeDiceArray[x].value === diceValue){
					activeDiceArray.splice(x, 1);
				}
			}
		},
		
		removeHighlight: function(){
			for(var x=activeDiceArray.length-1; x>=0; x--){
				activeDiceArray[x].canFreeze = false;
			}
		},
		
		loadState: function(state){
			this.emptyDice();
			for(x=0; x<state.length; x++){
				this.add({canFreeze: state[x].canFreeze, value: state[x].value, image: state[x].image});
			}
		},

		add: function(dice){
			activeDiceArray.push(dice);			
		},
		
		emptyDice: function(){
			for(var i=activeDiceArray.length; i>0; i--){
				activeDiceArray.pop();
			};
		}
	};
}]);