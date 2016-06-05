angular
  .module('formulaThree')
  .component('blockFormulaThree', {
    templateUrl: 'formula3/formula3.template.html',
    controller: function( $scope, serviceFormulas ){
      $scope.getResult = function(){
        $scope.result = serviceFormulas.formula3($scope.a, $scope.b);
      }
    }
  });

