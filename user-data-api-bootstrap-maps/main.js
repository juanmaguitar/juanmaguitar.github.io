function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function getFormattedDate ( timestamp ) {
  var date =  new Date ( 1e3*timestamp );

  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDay();
  var year = date.getUTCFullYear();

  return pad(day) + "/" + pad(month) + "/" + pad(year);
}

function getObjectValues(o) {
  var result = [];
  for (var p in o) {
    if( o.hasOwnProperty(p) ) {
      result.push( o[p] )
    }
  }
  return result;
}

function updateDom( data ) {

	var date = new Date();

	$(".now").html(date);

  $(".full-name").html( data.name )
  $(".gender").html( data.gender )
  $(".email").html( data.email )
  $(".profile-image").attr("src", data.imageUrl);
  $(".phone").html("Cell: " + data.cell + "</br>" + "Phone: " + data.phone)
  $(".address").html( data.address.join("</br>"))

  $(".born-date").html( data.bornDate )
  $(".registration-date").html( data.registrationDate )

	$(".nationality span").html( countries[data.nationality] )
	$(".nationality i").attr("class", "flag-icon flag-icon-" + data.nationality.toLowerCase() )

  $(".email")
    .html( data.email )
    .attr("href", "mailto:" + data.email)

}

function getProfile() {

  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data){

    	console.log(data);

      var dataProfile = data.results[0];
      var oName = dataProfile.name;
      var oAddress = dataProfile.location;

      var data = {
      	nationality: dataProfile.nat,
      	gender: dataProfile.gender,
      	phone: dataProfile.phone,
      	email: dataProfile.email,
      	phone: dataProfile.phone,
      	cell: dataProfile.cell,
      	imageUrl: dataProfile.picture.large,
      	bornDate: getFormattedDate( dataProfile.dob ),
      	registrationDate: getFormattedDate( dataProfile.registered ),
      	name: getObjectValues(oName).join(" "),
      	address: [oAddress.street, oAddress.postcode, oAddress.city, oAddress.state]
      }

			updateDom(data);
      updateMap(data.address);

    }
  });

}

getProfile();
$(".get-profile").on("click", getProfile)
