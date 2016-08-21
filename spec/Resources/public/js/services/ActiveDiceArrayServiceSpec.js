
//Dataprovider Function 
function using(name, args, func){
	for (var i = 0, count = args[0].length; i < count; i++) {
		func.apply(this, [args[0][i], args[1][i]]);
	}
};

describe("ActiveDiceArrayServiceTests", function() {
	var ActiveDiceArray;

	//beforeEach(module("pickominoGame"));
	beforeEach(angular.mock.module('pickominoGame'));

	beforeEach(inject(function (_ActiveDiceArray_) {
		ActiveDiceArray = _ActiveDiceArray_;
	}));

	it('should have a working ActiveDiceArray service', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray.array).not.toBe(null);
		expect(ActiveDiceArray.remove).not.toBe(null);
		expect(ActiveDiceArray.removeHighlight).not.toBe(null);
		expect(ActiveDiceArray.loadState).not.toBe(null);
		expect(ActiveDiceArray.add).not.toBe(null);
		expect(ActiveDiceArray.emptyDice).not.toBe(null);
	}]));


	it('should have an initial active dice set of eight valid dice', inject(['ActiveDiceArray',function(ActiveDiceArray) {
			expect(ActiveDiceArray.array.length).toEqual(8);
			
			var numInitialDice = 8;
			for (var i=0; i < numInitialDice; i++){
				expect(ActiveDiceArray.array[i]["image"]).toEqual(jasmine.any(String));
				expect(ActiveDiceArray.array[i]["image"]).not.toBe("");
				expect(ActiveDiceArray.array[i]["canFreeze"]).toBe(false);
				expect(ActiveDiceArray.array[i]["value"]).toBeWithinRange(1, 6);
			}
	}]));
});