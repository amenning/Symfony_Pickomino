
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
  }
};

describe("SetWormImageServiceTests", function() {
  var SetWormImage;
  
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_SetWormImage_) {
	  SetWormImage = _SetWormImage_;
  }));
  
  it('should have a working SetWormImage service', inject(['SetWormImage',
    function(SetWormImage) {
      expect(SetWormImage).toHaveMethod("imagify");
  	}
  ]));
  
  
  var tileValues = [
                    [21, 22, 23, 24], 
                    [25, 26, 27, 28], 
                    [29, 30, 31, 32], 
                    [33, 34, 35, 36]
                   ];
  var tileValueCount = ["One", "Two", "Three", "Four"];
  
  // Check that each group of tile values corresponds to a certain tile image filename and path
  // Uses dataProvider function above
  for (var j = 0; j < tileValues.length; j++) {
	  using("valid " + tileValueCount[j] + " worm tile values", [tileValues[j], tileValueCount[j]], function(value, wormCount){
		  it("should return a " + wormCount + " worm tile image filename as a string with value " + value, inject(['SetWormImage',
		   function(SetWormImage) { 
			 var response;
		     response = SetWormImage.imagify(value);
		     
		     expect(response).not.toBe(null);
		     expect(response).toEqual(jasmine.any(String));
		     expect(response).toEqual("web/bundles/app/img/" + wormCount + "WormTile.png");
		   }
		  ]));
	  });
  }
});