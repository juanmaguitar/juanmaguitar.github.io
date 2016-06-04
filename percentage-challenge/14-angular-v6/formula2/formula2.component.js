angular
  .module('formulaTwo')
  .component('blockFormulaTwo', {
    templateUrl: 'formula2/formula2.template.html',
    controller: function( $scope, serviceFormulas ){
      $scope.getResult = function(){
        $scope.result = serviceFormulas.formula2($scope.a, $scope.b);
      }
    }
  });

