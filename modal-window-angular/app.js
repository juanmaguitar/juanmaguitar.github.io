// Code goes here

var app = angular.module('myApp',['ui.bootstrap']);

app.controller('ModalDemoCtrl', function ($scope, $modal) {
	console.log ('ModalDemoCtrl');
  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl:'myModalContent.html',
      windowTemplateUrl: 'customModal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
					params: function(){
						return {
							title: 'Custom title 2'
						};
					}
				}
    });
  };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, params) {

	console.log ('ModalInstanceCtrl');
	console.log (params)

  //$scope.title = 'My Modal Window TITLE';


  $scope.ok = function () {
    $modalInstance.close('ok');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});