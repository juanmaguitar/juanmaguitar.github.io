angular.module('myApp.controllers')
  // Make sure to inject our services for DataLoader and Base64
  .controller('myCtrl', function($scope, DataLoader, Base64 ) {

    var username = 'ce6a08f744ab4d1db3761a3c8f2dc1c0';
    var password = 'e8hFf5kmoJ1PYQmq2IoKri1l7xQVFwvhoaR8A30hz5x5U+yWI7';

    // use our Base64 service to encode the user/pass
    var base64 = Base64.encode( username + ':' + password );
    // Some endpoint that needs auth
    var dataURL = 'https://api.infojobs.net/api/1/offer';

      DataLoader.getAuth( base64, dataURL )
        .then(function(response) {
            $scope.data = response.data;
          }, function(response) {
            console.log('Error');
        });

  });
