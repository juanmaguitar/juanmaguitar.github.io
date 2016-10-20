
function updateMap (address) {

    var mapGoogle = new google.maps.Geocoder();
    mapGoogle.geocode( { 'address': address.join(",") }, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {

        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        var mapImgUrl = 'http://maps.google.com/maps/api/staticmap?center='+ latitude +','+ longitude + '&zoom=15&size=800x600&sensor=false&markers='+latitude+','+longitude;

        $(".map-image img").attr("src", mapImgUrl)
        $(".map-image p").hide();

      }
    })

}
