// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
  	haveWorm = false;
  	if (args[i] == 6) { haveWorm = true }
    func.apply(this, [args[i], haveWorm]);
  }
};

function newFrozenDiceToAdd(value){
	return {
        value: value,
        image: "test" + value + ".png"
	};
};

describe("FrozenDiceArrayServiceTests", function() {
	var FrozenDiceArray;

	//beforeEach(module("pickominoGame"));
	beforeEach(angular.mock.module('pickominoGame'));

	beforeEach(inject(function (_FrozenDiceArray_) {
		FrozenDiceArray = _FrozenDiceArray_;
	}));

	it('should have a working FrozenDiceArray service', inject(['FrozenDiceArray',function(FrozenDiceArray) {
		expect(FrozenDiceArray).toHaveArray("array");
		expect(FrozenDiceArray).toHaveMethod("add");
		expect(FrozenDiceArray).toHaveMethod("emptyDice");
		expect(FrozenDiceArray).toHaveMethod("loadState");
		expect(FrozenDiceArray).toHaveObject("frozenStatus");
	}]));

	it('should have an initial frozen dice set that is empty', inject(['FrozenDiceArray',function(FrozenDiceArray) {
		expect(FrozenDiceArray.array.length).toEqual(0);
		
		expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(0);
		expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(false);
	}]));
	
	using("non-worm and worm dice value", [1, 2, 3, 4, 5, 6], function(value, haveWorm){
		it('should add a dice when called with add(dice) and verify if worm present', inject(['FrozenDiceArray',function(FrozenDiceArray) {
			var diceToAdd = newFrozenDiceToAdd(value);
			FrozenDiceArray.add(diceToAdd);
			
			var expectedSum = value == 6 ? 5 : value;
			
			expect(FrozenDiceArray.array.length).toEqual(1);
			expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(expectedSum);
			expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(haveWorm);
		}]));
	});
	
	it('should empty all dice from array when called with emptyDice()', inject(['FrozenDiceArray',function(FrozenDiceArray) {
		for (var i=1; i <= 6; i++) {
			var diceToAdd = newFrozenDiceToAdd(i);
			FrozenDiceArray.add(diceToAdd);
		}
		expect(FrozenDiceArray.array.length).toEqual(6);
		expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(20);
		expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(true);
		
		FrozenDiceArray.emptyDice();
		
		expect(FrozenDiceArray.array.length).toEqual(0);
		expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(0);
		expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(false);
	}]));
	
	it('should clear all dice and load a dice state when called with loadState(state)', inject(['FrozenDiceArray',function(FrozenDiceArray) {
		for (var i=1; i <= 6; i++) {
			var diceToAdd = newFrozenDiceToAdd(i);
			FrozenDiceArray.add(diceToAdd);
		}
		
		expect(FrozenDiceArray.array.length).toEqual(6);
		expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(20);
		expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(true);
		
		diceOne = newFrozenDiceToAdd(1);
		diceTwo = newFrozenDiceToAdd(4);
		newState = [diceOne, diceTwo];
		
		FrozenDiceArray.loadState(newState);
		
		expect(FrozenDiceArray.array.length).toEqual(2);
		expect(FrozenDiceArray.array[0]).toEqual(diceOne);
		expect(FrozenDiceArray.array[1]).toEqual(diceTwo);
		expect(FrozenDiceArray.frozenStatus["sum"]).toEqual(5);
		expect(FrozenDiceArray.frozenStatus["haveWorm"]).toEqual(false);
	}]));	
});