angular.module('pickominoGame')			

.factory("GetWormType", function SetDiceImageFactory(){
	return {
		amount: function(wormValue){
			switch(wormValue){
				case 21:
				case 22:
				case 23:
				case 24:
					return 1;
					break;
				case 25:
				case 26:
				case 27:
				case 28:
					return 2;
					break;
				case 29:
				case 30:
				case 31:
				case 32:
					return 3;
					break;
				case 33:
				case 34:
				case 35:
				case 36:
					return 4;
					break;
			};
		}
	};
});	
	