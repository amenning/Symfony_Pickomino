
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
    func.apply(this, [args[i]]);
  }
};

function newFrozenDiceToAdd(value){
	return {
        value: value,
        image: "test" + value + ".png"
	};
};

describe("CheckValidDiceFreezeFilterServiceTests", function() {
  var CheckValidDiceFreeze;
  var $filter;
  var FrozenDiceArray;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_CheckValidDiceFreeze_, _$filter_, _FrozenDiceArray_) {
	  CheckValidDiceFreeze = _CheckValidDiceFreeze_;
	  FrozenDiceArray = _FrozenDiceArray_;
	  $filter = _$filter_;
  }));
  
  
  it('should have a working CheckValidDiceFreeze service', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) { 
	  expect(CheckValidDiceFreeze).toHaveMethod("validate");
   	}
  ]));
  
  it('should validate that a dice number cannot be taken if it is present in FrozenDiceArray', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
	  // Need to seed FrozenDiceArray with dice that contains a worm
	  for (var i = 1; i <= 6; i++) {
	  	var diceToAdd = newFrozenDiceToAdd(i);
		FrozenDiceArray.add(diceToAdd);
	  }
	  
	  expect(CheckValidDiceFreeze.validate(1)).toEqual(false);
  	}
  ]));
  
  it('should validate that a dice number can be taken if it isn\'t present in FrozenDiceArray', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
	  // Need to seed FrozenDiceArray with dice that contains a worm
	  for (var i = 1; i <= 5; i++) {
	  	var diceToAdd = newFrozenDiceToAdd(6);
		FrozenDiceArray.add(diceToAdd);
	  }
	  
	  expect(CheckValidDiceFreeze.validate(1)).toEqual(true);
  	}
  ]));  
  
	using("different values", [1, 2, 3, 4, 5, 6], function(value){
	  it('should validate that a dice with value ' + value + ' cannot be taken if ' + value + ' is already present in FrozenDiceArray', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
		  // Seed FrozenDiceArray with all numbers, including the value we wish to freeze
		  for (var i = 1; i <= 6; i++) {
		  	var diceToAdd = newFrozenDiceToAdd(i);
			FrozenDiceArray.add(diceToAdd);
		  }
		  
		  expect(CheckValidDiceFreeze.validate(value)).toEqual(false);
	  	}
	  ]));
	});
	
	using("different values", [1, 2, 3, 4, 5, 6], function(value){
		  it('should validate that a dice with value ' + value + ' can be taken if ' + value + ' is not already present in FrozenDiceArray', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
			  // Seed FrozenDiceArray with all numbers but the value we wish to freeze
			  for (var i = 1; i <= 6; i++) {
			  	if ( i != value ) {
			  		var diceToAdd = newFrozenDiceToAdd(i);
			  		FrozenDiceArray.add(diceToAdd);
			  	}
			  }
			  
			  expect(CheckValidDiceFreeze.validate(value)).toEqual(true);
		  	}
		  ]));
		});	
});