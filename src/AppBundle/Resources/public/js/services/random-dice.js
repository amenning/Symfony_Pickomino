angular.module('pickominoGame')				

.factory("RandomDice", [
	'ActiveDiceArray', 
	'FrozenDiceArray', 
	'SetDiceImage',
	function RandomDiceFactory(ActiveDiceArray, FrozenDiceArray, SetDiceImage){
		return 	{	
		
			roll:	function(){
						for(var x=0; x<ActiveDiceArray.array.length; x++){
							// Returns a random integer between min (included) and max (excluded)
							// Using Math.round() will give you a non-uniform distribution!
							ActiveDiceArray.array[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
							ActiveDiceArray.array[x].image=SetDiceImage.imagify(ActiveDiceArray.array[x].value);
						}
					},

			resetDice:	function(){
							for(var i=ActiveDiceArray.array.length; i>0; i--){
								ActiveDiceArray.array.pop();
							}
							for(var x=0, diceValue, diceImage; x<8; x++){
								diceValue=6;
								diceImage=SetDiceImage.imagify(diceValue);
								ActiveDiceArray.array.push({value: diceValue, image: diceImage, canFreeze: false});
							}
							FrozenDiceArray.emptyDice();
						}						
		};
	}
]);	