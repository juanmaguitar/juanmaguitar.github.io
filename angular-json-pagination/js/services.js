angular
	.module('myAppServices',[])
	.service('filteredListService', function () {

		function searchUtil( item, toSearch ) {

			var name = item.name.toLowerCase();
			var email = item.email.toLowerCase();
			var id = item._id;
			var searchedValue = toSearch.toLowerCase();

			var isNameFound = (name.indexOf(searchedValue) !== -1);
			var isMailFound = (email.indexOf(searchedValue) !== -1);
			var isIdFound = (id == toSearch);

			/* Search Text in all 3 fields */
			return ( isNameFound || isMailFound || isIdFound );
		}

		this.searched = function ( listElements, toSearch ) {

			function findItems( item ) {
				return searchUtil( item, toSearch); // Search Text in all 3 fields
			};

			return listElements.filter( findItems );

		};

        this.paged = function (valLists, pageSize) {
            console.log (valLists);
    		/* TO-DO: Apply reduce */
            retVal = [];
            for (var i = 0; i < valLists.length; i++) {
                if (i % pageSize === 0) {
                    retVal[Math.floor(i / pageSize)] = [valLists[i]];
                } else {
                    retVal[Math.floor(i / pageSize)].push(valLists[i]);
                }
            }
            return retVal;
        };
    })
