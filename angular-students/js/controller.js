angular
	.module('collegeControllers',[])
	.controller('RemoteStudentController', function( $scope, RemoteStudentService ) {

		$scope.student = {};

		RemoteStudentService.getStudent()
			.then( function(result) {
				//promise complete
				$scope.student = result.data;
			})
			.catch( function(error) {
				console.log('error', error)
			});

		$scope.greeting = function() {
			return "Greetings " + $scope.student.firstName + " " + $scope.student.lastName;
		}

		$scope.showResults = function(){
			return ($scope.results ? $scope.results = false : $scope.results = true)
		}
		$scope.aGradeFilter = function (subject) {
			return (subject.marks > 74);
		}


	});