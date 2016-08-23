angular.module('myApp.services')
	.factory('DataLoader', function( $http ) {

		return {
			get: function(url) {
				return $http.json( url );
			},
			getAuth: function(base64, url) {

				// $http.defaults.headers.common['Authorization'] = 'Basic ' + base64;
				 // $http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
  		 //  $http.defaults.headers.common['Authorization'] = 'Basic ' + base64;

  		 // 	$httpProvider.defaults.headers.common = {};
			  // $httpProvider.defaults.headers.post = {};
			  // $httpProvider.defaults.headers.put = {};
			  // $httpProvider.defaults.headers.patch = {};

			  //$http.defaults.headers.common['Authorization'] = 'Basic ' + base64; // jshint ignore:line


				var req = {
					url: url,
					// headers:{
					// 	//'Authorization' : 'Basic ' + base64,
					// 	'Content-Type':'application/x-www-form-urlencoded'
					// 	// 'Access-Control-Allow-Origin': '*',
					// 	// 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					// 	// 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
					// 	// 'X-Random-Shit':'123123123'
					// }

					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					   'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
					   'Authorization' : 'Basic ' + base64,
					   'Access-Control-Allow-Origin': '*'
					}
				}
				console.log(req)
				return $http( req );
			},
	}
	});