// defining the app module of the project
angular
	.module('moviesDBApp', [
			'ngRoute',
			'movieDBControllers',
			'movieDBServices']
	)
	.constant("myConfig", {
		"urlApiMovieDb" : "https://api.themoviedb.org/3/",
		"API_KEY": window.API_KEY || ""
	});