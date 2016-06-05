angular
  .module('formulaOne')
  .component('blockFormulaOne', {
    templateUrl: 'formula1/formula1.template.html',
    controller: function( $scope, serviceFormulas ){
      $scope.getResult = function(){
        $scope.result = serviceFormulas.formula1($scope.a, $scope.b);
      }
    }
  });

