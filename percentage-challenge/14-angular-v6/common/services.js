angular.module('myServices', [])
	.service('serviceFormulas', function( ){
		return {
			formula1 : function(a,b){
				return (a/100)*b;
			},
			formula2 : function(a,b){
				return (a/b)*100;
			},
			formula3 : function(a,b){
				return (b-a)/a*100;
			}

		}
	})
