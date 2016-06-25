angular.module('pickominoGame')			
		
.factory("SetDiceImage", function SetDiceImageFactory(){
	return {
		imagify: function(diceValue){
			switch(diceValue){
				case 1:
					return 'bundles/app/img/DiceFaceOne.png';
					break;
				case 2:
					return 'bundles/app/img/DiceFaceTwo.png';
					break;
				case 3:
					return 'bundles/app/img/DiceFaceThree.png';
					break;
				case 4:
					return 'bundles/app/img/DiceFaceFour.png';
					break;
				case 5:
					return 'bundles/app/img/DiceFaceFive.png';
					break;
				case 6:
					return 'bundles/app/img/OneWormTile.png';
					break;
			};
		}
	};
});