$( document ).ready(function() {

	var clientId = "SVDR1ABESWSG1XSDO3AREN5PJDGO2PYEUXSCVOAZJIVLZV1U";
	var clientSecret = "CFMUBOOBR5AFXTEXWKXTLOCP4UPWL0FEICEAQFSOCD4PG24X";
	var urlApiSearchVenues = "https://api.foursquare.com/v2/venues/search";
	var urlApiDetailVenue = "https://api.foursquare.com/v2/venues/<%ID%>/photos";

	var dateUpdate = "20131016";
	var oConfigRequest = {
		client_id : clientId,
		client_secret: clientSecret,
		v: dateUpdate
	}

    var oVenues;

    //https://api.foursquare.com/v2/venues/search?client_id=SVDR1ABESWSG1XSDO3AREN5PJDGO2PYEUXSCVOAZJIVLZV1U&client_secret=CFMUBOOBR5AFXTEXWKXTLOCP4UPWL0FEICEAQFSOCD4PG24X&v=20131016&query=rock

    $( "button" ).click(function(e) {

        e.preventDefault();

        var location = $("#location").val();
        var query = $("#musicGenre").val();

		var oQuery = {
			near: location,
			query: query
		}

        $.ajax({
            url: urlApiSearchVenues,
            data : $.extend( oConfigRequest, oQuery ),
            success : function (oData) {
                oVenues = oData.response.venues;
                window.oPhotos = {};
                $.each(oVenues, function(index, oVenue) {
                	var urlDetailsVenue = urlApiDetailVenue.replace("<%ID%>", oVenue.id );

                    function createObject (oData) {
                        $.extend( oVenue, oData ),
                        console.log (oVenue)

                    }

        			$.ajax({
        				url: urlDetailsVenue,
            			data : oConfigRequest,
            			success: function(oData) {
                            createObject(oData);
                        }
        			})
                })

            }
        })

    });

    function appendToDom( oData ) {

        var sContentList = "";

        var sLiName = "<li><strong>name: </strong><% NAME %></li>";
        var sLiPhone = "<li><strong>phone: </strong><% PHONE %></li>";
        var sLiDescription = "<li><strong>description: </strong><% DESCRIPTION %></li>";
        var sLiCategories = "<li><strong>categories: </strong><% CATEGORIES %></li>";

        // var aPlaces = oData.businesses;

/*
        $.each(aPlaces, function (index, oPlace ) {
            var categories, sListItem = "";
            sListItem += oPlace.image_url ? '<div><img src="' + oPlace.image_url + '"></div>' : "<div></div>";
            sListItem += "<ul>";
            sListItem += oPlace.name ? sLiName.replace("<% NAME %>", oPlace.name) : "";
            sListItem += oPlace.display_phone ? sLiPhone.replace("<% PHONE %>", oPlace.display_phone) : "";
            sListItem += oPlace.snippet_text ? sLiDescription.replace("<% DESCRIPTION %>", oPlace.snippet_text) : "";
            if ( oPlace.categories ) {
                categories = oPlace.categories.reduce(function (acc, aLabels, index ){
                    acc.push(aLabels[0]);
                    return acc;
                },[])
                sListItem += sLiCategories.replace("<% CATEGORIES %>", categories.join(" | ") );
            }
            sListItem += "</ul>";
            sContentList += "<li>" + sListItem + "</li>";
        })
        $("#results").html(sContentList);
*/

    }


});