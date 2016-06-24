angular.module('pickominoGame')			

.factory("SetWormImage", function SetDiceImageFactory(){
	return {
		imagify: function(wormValue){
			switch(wormValue){
				case 21:
				case 22:
				case 23:
				case 24:
					return 'app/assets/img/OneWormTile.png';
					break;
				case 25:
				case 26:
				case 27:
				case 28:
					return 'app/assets/img/TwoWormTile.png';
					break;
				case 29:
				case 30:
				case 31:
				case 32:
					return 'app/assets/img/ThreeWormTile.png';
					break;
				case 33:
				case 34:
				case 35:
				case 36:
					return 'app/assets/img/FourWormTile.png';
					break;
			};
		}
	};
});	