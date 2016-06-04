angular
	.module('myAppFactories',[])
	.factory('remotePeopleFactory',function( $http ) {

		function getPeople() {
			return $http.get('people.json'); // returns a promise
		}

		// return Student Service
		return {
			getPeople: getPeople
		};

	});