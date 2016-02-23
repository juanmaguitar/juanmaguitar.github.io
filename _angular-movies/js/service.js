angular
	.module('movieDBServices',[])
	.factory('MovieListService',function($http, myConfig) {

    // set scope with first and last names
    var url = myConfig.urlApiMovieDb + "movie/popular";
    url += "?api_key=" + myConfig.API_KEY;

		myServiceObj = {
			name: 'Movie Service',
			createdBy: 'Sean',
			getList: function(){
				return $http.get(url);
			}
		}
		return myServiceObj;

	});