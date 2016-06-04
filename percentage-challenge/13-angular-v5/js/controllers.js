angular.module('myControllers', ['myServices'])
	.controller('F1Controller', function( $scope, serviceFormulas ){
		$scope.getResult = function(){
			$scope.result = serviceFormulas.formula1($scope.a, $scope.b);
		}
	})
	.controller('F2Controller', function( $scope, serviceFormulas  ){
		$scope.getResult = function(){
			$scope.result = serviceFormulas.formula2($scope.a, $scope.b);
		}
	})
	.controller('F3Controller', function( $scope, serviceFormulas  ){
		$scope.getResult = function(){
			$scope.result = serviceFormulas.formula3($scope.a, $scope.b);
		}
	})