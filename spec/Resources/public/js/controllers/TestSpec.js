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
describe("Unit Testing Examples", function() {
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
});