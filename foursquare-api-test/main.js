$( document ).ready(function() {

	var urlApiSearchVenues = "https://api.foursquare.com/v2/venues/search";
	var urlApiDetailVenue = "https://api.foursquare.com/v2/venues/<%ID%>/photos";
    var oVenues;

    $( "button" ).click(function(e) {

        e.preventDefault();

        if ( clientId || clientSecret ) {
            alert("please insert your Foursquare API data");
            return false;
        }

        // Foursquare API Data
        var clientId = $("#client_id").val();
        var clientSecret = $("#client_secret").val();
        var dateUpdate = "20131016";

        var oConfigRequest = {
            client_id : clientId,
            client_secret: clientSecret,
            v: dateUpdate
        }

        var location = $("#location").val();
        var aCategories = $("#categories").val();
        var query = $("#musicGenre").val();
        var limit = $("#limit").val() || 100;
        var page = $("#page").val() || 1;

		var oQuery = {
			near: location,
			query: query,
            categoryId: aCategories.join(","),
            limit: limit,
            offset: page
		}

        console.log (oConfigRequest);
        console.log (oQuery);

        $.ajax({
            url: urlApiSearchVenues,
            data : $.extend( oConfigRequest, oQuery ),
            success : function (oData) {
                console.log (oData);
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
            sListItem += sLiCategories.replace("<% CATEGORIES %>", categories.join(" | ") );
        }
        sListItem += "</ul>";
        sContentList += "<li>" + sListItem + "</li>";

        $("#results")
            .append(sContentList);

    }


});