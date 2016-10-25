angular.module('myApp', ['ngRoute'])
	.config( function ($routeProvider) {

		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/bikes', {
        templateUrl: 'views/resultsBikes.html',
        controller: 'ResultsBikesCtrl'
      })
      .when('/add-bike', {
        templateUrl: 'views/addBike.html',
        controller: 'AddBikeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

	})
	.controller('SearchCtrl', function($scope, $rootScope, BikesService, $location) {

		$scope.searchItems = function(e) {
			e.preventDefault()

			BikesService.getBikes( $scope.querySearch )
				.then( function(response) {
					$rootScope.recipes = response.data;
				})

			$location.path("/bikes")
		}

	})
	.controller('HomeCtrl', function($scope) {
		$scope.title = "HOME"
	})
	.controller('ResultsBikesCtrl', function($scope, $rootScope, BikesService) {
		$scope.title = "RESULTS BIKES"
		$scope.bikes = BikesService.motorbikes;
	})
	.controller('AddBikeCtrl', function($scope, $rootScope, BikesService, $location) {
		$scope.title = "ADD BIKE"
		$scope.addBike = function(e) {
			e.preventDefault();
			var newBike = {
				brand: $scope.brand,
				model: $scope.model
			}
			BikesService.addBike(newBike);
			$location.path("/bikes")
		}
	})
	.factory("BikesService", function( $http ) {

			var motorbikes = [];
			var lsMotorbikes = localStorage.getItem("motorbikes");
			if ( lsMotorbikes ) {
					motorbikes = JSON.parse(lsMotorbikes)
			}

			function addBike( bike ) {
				var numBikes = motorbikes.length;
				var lastIdAvailable ;

				if (numBikes) {
					lastIdAvailable = motorbikes[numBikes-1].id + 1;
				}
				else {
					lastIdAvailable	= 1;
				}

				bike.id = lastIdAvailable;
				motorbikes.push(bike);
				var jsonBikes = JSON.stringify(motorbikes);
				localStorage.setItem("motorbikes", jsonBikes);
			}
			function removeBike( idBike ) {}

			return {
				motorbikes : motorbikes,
				addBike: addBike,
				removeBike: removeBike
			}

	})
