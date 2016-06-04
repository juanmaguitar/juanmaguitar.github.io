angular
	.module('myAppFactories',[])
	.factory('remotePeopleFactory',function( $http ) {

		function getPeople() {
			return $http.get('json/people.json'); // returns a promise
		}

		// return Student Service
		return {
			getPeople: getPeople
		};

	});