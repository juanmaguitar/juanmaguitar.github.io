angular
	.module('collegeServices',[])
	.factory('RemoteStudentService',function( $http ) {

		function getStudent() {
			return $http.get('/students.json'); // returns a promise
		}

		// return Student Service
		return {
			getStudent: getStudent
		};

	});
