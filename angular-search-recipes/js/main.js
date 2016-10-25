angular.module('myApp', ['ngRoute'])
	.config( function ($routeProvider) {

		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/recipes', {
        templateUrl: 'views/resultsRecipes.html',
        controller: 'ResultsRecipesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

	})
	.controller('SearchCtrl', function($scope, $rootScope, RecipesService, $location) {

		$scope.searchItems = function(e) {
			e.preventDefault()

			RecipesService.getRecipes( $scope.querySearch )
				.then( function(response) {
					$rootScope.recipes = response.data;
				})

			$location.path("/recipes")
		}

	})
	.controller('HomeCtrl', function($scope) {
		$scope.title = "HOME"
	})
	.controller('ResultsRecipesCtrl', function($scope, $rootScope) {
		$scope.title = "RESULTS"
	})
	.factory("RecipesService", function( $http ) {

			function getRecipes( query ) {
				url = 'https://powerful-inlet-75906.herokuapp.com/recipe?q=' + query;
				return $http.get( url )
			}

			return {
				getRecipes : getRecipes
			}

	})
