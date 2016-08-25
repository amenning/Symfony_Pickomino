
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
  }
};

describe("ActiveDiceFilterServiceTests", function() {
  var ActiveDiceFilter;
  var $filter;
  var ActiveDiceArray;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_ActiveDiceFilter_, _$filter_, _ActiveDiceArray_) {
	  ActiveDiceFilter = _ActiveDiceFilter_;
	  ActiveDiceArray = _ActiveDiceArray_;
	  $filter = _$filter_;
  }));
  
  
  it('should have a working ActiveDiceFilter service', inject(['ActiveDiceFilter', 'ActiveDiceArray', '$filter', function(ActiveDiceFilter, ActiveDiceArray, $filter) { 
	  expect(ActiveDiceFilter).toHaveMethod("count");
   	}
  ]));
  
  it('should count the number of dice with a given value when count() is called', inject(['ActiveDiceFilter', 'ActiveDiceArray', '$filter', function(ActiveDiceFilter, ActiveDiceArray, $filter) {
	  // The ActiveDiceArray initializes with eight dice of face 6
	  diceCountWithFace6 = ActiveDiceFilter.count(6);
	  expect(diceCountWithFace6).toEqual(8);
	  
	  diceCountWithFace1 = ActiveDiceFilter.count(1);
	  expect(diceCountWithFace1).toEqual(0);
  	}
  ]));
});