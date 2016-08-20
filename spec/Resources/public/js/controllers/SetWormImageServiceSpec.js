/*
describe('PasswordController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});
*/
/*
"use strict";

describe("SetWormImage service", function () {
  var SetWormImage;

  beforeEach(module("pickominoGame"));

  beforeEach(inject(function (_SetWormImage_) {
	  SetWormImage = _SetWormImage_;
  }));

  it("should return a filename", function () {
    var response;
	response = SetWormImage.imagify(21);
	expect(response).not.toBe(null);
  });

});
*/

function using(name, values, func){
  for (var i = 0, count = values.length; i < count; i++) {
    if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
        values[i] = [values[i]];
    }
    func.apply(this, values[i]);
    //jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + values[i].join(', ') + ')';
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
      expect(SetWormImage.imagify).not.toBe(null);
  	}
  ]));
  
  using("valid one worm tile values", [21, 22, 23, 24], function(value){
	  it('should return a one worm tile image filename with value ' + value, inject(['SetWormImage',
	   function(SetWormImage) { 
		 var response;
	     response = SetWormImage.imagify(value); 
		 expect(response).not.toBe(null);
		 expect(response).toEqual("web/bundles/app/img/OneWormTile.png");
	   }
	  ]));
  });
  
  using("valid two worm tile values", [25, 26, 27, 28], function(value){
	  it('should return a two worm tile image filename with value ' + value, inject(['SetWormImage',
	   function(SetWormImage) { 
		 var response;
	     response = SetWormImage.imagify(value); 
		 expect(response).not.toBe(null);
		 expect(response).toEqual("web/bundles/app/img/TwoWormTile.png");
	   }
	  ]));
  }); 
  
  using("valid three worm tile values", [29, 30, 31, 32], function(value){
	  it('should return a three worm tile image filename with value ' + value, inject(['SetWormImage',
	   function(SetWormImage) { 
		 var response;
	     response = SetWormImage.imagify(value); 
		 expect(response).not.toBe(null);
		 expect(response).toEqual("web/bundles/app/img/ThreeWormTile.png");
	   }
	  ]));
  }); 
  
  using("valid four worm tile values", [33, 34, 35, 36], function(value){
	  it('should return a four worm tile image filename with value ' + value, inject(['SetWormImage',
	   function(SetWormImage) { 
		 var response;
	     response = SetWormImage.imagify(value); 
		 expect(response).not.toBe(null);
		 expect(response).toEqual("web/bundles/app/img/FourWormTile.png");
	   }
	  ]));
  }); 
});