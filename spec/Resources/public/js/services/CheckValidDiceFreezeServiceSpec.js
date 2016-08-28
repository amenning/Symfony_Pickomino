
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
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
  
  it('should count the number of dice with a given value when count() is called', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
	  // Need to seed FrozenDiceArray with dice that contains a worm
	  for (var i = 1; i <= 6; i++) {
	  	var diceToAdd = newFrozenDiceToAdd(i);
		FrozenDiceArray.add(diceToAdd);
	  }
	  
	  expect(CheckValidDiceFreeze.validate(1)).toEqual(false);
	  // Need to seed FrozenDiceArray with dice and with worm
	  
  	}
  ]));
});