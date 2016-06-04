angular.module('myControllers', [])
	.controller('F1Controller', function( $scope ){
		$scope.getResult = function(){
			$scope.result = ($scope.a/100)*$scope.b;
		}
	})
	.controller('F2Controller', function( $scope ){
		$scope.getResult = function(){
			$scope.result=($scope.a/$scope.b)*100;
		}
	})
	.controller('F3Controller', function( $scope ){
		$scope.getResult = function(){
			$scope.result=($scope.b-$scope.a)/$scope.a*100
		}
	})