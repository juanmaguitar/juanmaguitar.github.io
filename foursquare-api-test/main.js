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

    var aCategories = [
        "4bf58dd8d48988d1e5931735", // Music Venue
        "4bf58dd8d48988d1e7931735", // Jazz Club
        "4bf58dd8d48988d1e8931735", // Piano Bar
        "4bf58dd8d48988d1e9931735"  // Rock Club
    ]
    var oVenues;

    $( "button" ).click(function(e) {

        e.preventDefault();

        var location = $("#location").val();
        var query = $("#musicGenre").val();
        var limit = $("#limit").val();
        var page = $("#page").val();

		var oQuery = {
			near: location,
			query: query,
            categoryId: aCategories.join(","),
            limit: limit,
            offset: page
		}

        $.ajax({
            url: urlApiSearchVenues,
            data : $.extend( oConfigRequest, oQuery ),
            success : function (oData) {

                oVenues = oData.response.venues;
                $("#results").html("");

                $.each(oVenues, function(index, oVenue) {
                	var urlDetailsVenue = urlApiDetailVenue.replace("<%ID%>", oVenue.id );

                    function createObject (oData) {
                        $.extend( oVenue, oData.response );
                    }

        			$.ajax({
        				url: urlDetailsVenue,
            			data : oConfigRequest,
            			success: function(oData) {
                            createObject(oData);
                            appendToDom (oVenue);
                        }
        			})
                })

            }
        })

    });

    function appendToDom( oData ) {

        var sContentList = "";

        var sLiName = "<li><strong>name: </strong><% NAME %></li>";
        var sLiUrl = "<li><strong>url: </strong><% URL %></li>";
        var sLiAdress = "<li><strong>adress: </strong><% ADRESS %></li>";
        var sLiCategories = "<li><strong>categories: </strong><% CATEGORIES %></li>";

        var image;

        if (oData.photos.items.length) {
            image = oData.photos.items[2].prefix + "100x100"+oData.photos.items[2].suffix;
        }

        var categories, sListItem = "";

        sListItem += image ? '<div><img src="' + image + '"></div>' : "";
        sListItem += "<ul>";
        sListItem += sLiName.replace("<% NAME %>", oData.name);
        sListItem += sLiUrl.replace("<% URL %>", oData.url);
        sListItem += sLiAdress.replace("<% ADRESS %>", oData.location.formattedAddress.join(", ") );

        if ( oData.categories ) {
            categories = oData.categories.reduce(function (acc, oCategory, index ){
                acc.push(oCategory.name);
                return acc;
            },[])
            console.log (categories);
            sListItem += sLiCategories.replace("<% CATEGORIES %>", categories.join(" | ") );
        }
        sListItem += "</ul>";
        sContentList += "<li>" + sListItem + "</li>";

        $("#results")
            .append(sContentList);

    }


});