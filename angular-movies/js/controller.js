angular
  .module('movieDBControllers',[])
  .controller('MovieListController',function( $scope, MovieListService ) {

    $scope.movieList = [];

    MovieListService.getList()
      .then( function(result){
        $scope.movieList = result.data.results;
      })
      .catch( function(error) {
        console.log('error', error)
      });
  });
