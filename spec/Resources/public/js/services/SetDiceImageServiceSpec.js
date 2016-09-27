
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1][i]]);
  }
};

describe("SetDiceImageServiceTests", function() {
  var SetDiceImage;
  
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_SetDiceImage_) {
	  SetDiceImage = _SetDiceImage_;
  }));
  
  it('should have a working SetDiceImage service', inject(['SetDiceImage',
    function(SetDiceImage) {
      expect(SetDiceImage).toHaveMethod("imagify");
  	}
  ]));
  
  
  var diceValues = [1, 2, 3, 4, 5, 6];
  var diceImageName = [
    "DiceFaceOne", 
    "DiceFaceTwo", 
    "DiceFaceThree", 
    "DiceFaceFour", 
    "DiceFaceFive", 
    "OneWormTile"
  ];
  
  // Check that each group of tile values corresponds to a certain dice image filename and path
  // Uses dataProvider function above
  using("valid dice values", [diceValues, diceImageName], function(value, imageName){
	  it("should return a " + imageName + " image filename as a string with value " + value, inject(['SetDiceImage',
	   function(SetDiceImage) { 
		 var response;
	     response = SetDiceImage.imagify(value);
	     
	     expect(response).not.toBe(null);
	     expect(response).toEqual(jasmine.any(String));
	     expect(response).toEqual("web/bundles/app/img/" + imageName + ".png");
	   }
	  ]));
  });
});