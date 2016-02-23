angular.module('routingControllers',[])
.controller('HomeController',function($scope) {
	//put your code here
	$scope.title = 'Home Page';
})
.controller('AboutController',function($scope) {
	//put your code here
	$scope.title = 'About Us';
})
.controller('ContactController',function($scope) {
	$scope.title = 'Contact Us';
})
.controller('DetailsController',function($scope,$routeParams) { //
	$scope.title = 'Details Page';
	$scope.wherefrom = $routeParams.page;
})