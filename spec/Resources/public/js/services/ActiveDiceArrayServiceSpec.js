function newDiceToAdd(value){
	return {
        value: value,
        image: "test" + value + ".png",
        canFreeze: true
	};
};

describe("ActiveDiceArrayServiceTests", function() {
	var ActiveDiceArray;

	//beforeEach(module("pickominoGame"));
	beforeEach(angular.mock.module('pickominoGame'));

	beforeEach(inject(function (_ActiveDiceArray_) {
		ActiveDiceArray = _ActiveDiceArray_;
	}));

	it('should have a working ActiveDiceArray service', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray).toHaveArray("array");
		expect(ActiveDiceArray).toHaveMethod("remove");
		expect(ActiveDiceArray).toHaveMethod("removeHighlight");
		expect(ActiveDiceArray).toHaveMethod("loadState");
		expect(ActiveDiceArray).toHaveMethod("add");
		expect(ActiveDiceArray).toHaveMethod("emptyDice");
	}]));


	it('should have an initial active dice set of eight valid dice of value 6', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray.array.length).toEqual(8);
		
		var numInitialDice = 8;
		for (var i=0; i < numInitialDice; i++){
			expect(ActiveDiceArray.array[i]["image"]).toEqual(jasmine.any(String));
			expect(ActiveDiceArray.array[i]["image"]).not.toBe("");
			expect(ActiveDiceArray.array[i]["canFreeze"]).toBe(false);
			expect(ActiveDiceArray.array[i]["value"]).toEqual(6);
		}
	}]));
	
	it('should remove all dice of a certain value when remove(diceValue) is called', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray.array.length).toEqual(8);
		
		ActiveDiceArray.remove(6);
		
		expect(ActiveDiceArray.array.length).toEqual(0);
	}]));
	
	it('should add a dice when called with add(dice)', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		var diceToAdd = newDiceToAdd(1);
		ActiveDiceArray.add(diceToAdd);
		
		expect(ActiveDiceArray.array.length).toEqual(9);
		expect(ActiveDiceArray.array[8]).toEqual(diceToAdd);
	}]));
	
	it('should change canFreeze for all dice to false when called with removeHighlight', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		var diceToAddWithCanFreezeTrue = newDiceToAdd(1);
		ActiveDiceArray.add(diceToAddWithCanFreezeTrue);
		expect(ActiveDiceArray.array[8]["canFreeze"]).toEqual(true);
		
		ActiveDiceArray.removeHighlight();
		numActiveDice = ActiveDiceArray.array.length;
		for (var i=0; i < numActiveDice; i++){
			expect(ActiveDiceArray.array[i]["canFreeze"]).toEqual(false);
		}
	}]));
	
	it('should empty all dice from array when called with emptyDice()', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray.array.length).toEqual(8);
		
		ActiveDiceArray.emptyDice();
		
		expect(ActiveDiceArray.array.length).toEqual(0);
	}]));
	
	it('should clear all dice and load a dice state when called with loadState(state)', inject(['ActiveDiceArray',function(ActiveDiceArray) {
		expect(ActiveDiceArray.array.length).toEqual(8);
		
		diceOne = newDiceToAdd(1);
		diceTwo = newDiceToAdd(6);
		newState = [diceOne, diceTwo];
		
		ActiveDiceArray.loadState(newState);
		
		expect(ActiveDiceArray.array.length).toEqual(2);
		expect(ActiveDiceArray.array[0]).toEqual(diceOne);
		expect(ActiveDiceArray.array[1]).toEqual(diceTwo);
	}]));
});