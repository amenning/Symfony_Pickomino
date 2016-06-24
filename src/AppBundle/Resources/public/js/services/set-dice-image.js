angular.module('pickominoGame')			
		
.factory("SetDiceImage", function SetDiceImageFactory(){
	return {
		imagify: function(diceValue){
			switch(diceValue){
				case 1:
					return 'app/assets/img/DiceFaceOne.png';
					break;
				case 2:
					return 'app/assets/img/DiceFaceTwo.png';
					break;
				case 3:
					return 'app/assets/img/DiceFaceThree.png';
					break;
				case 4:
					return 'app/assets/img/DiceFaceFour.png';
					break;
				case 5:
					return 'app/assets/img/DiceFaceFive.png';
					break;
				case 6:
					return 'app/assets/img/OneWormTile.png';
					break;
			};
		}
	};
});