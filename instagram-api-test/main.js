
var currentUrl = location.href;
var token, sUrlRecentPhotos;
var sCardTemplate = $("#card-instagram").html();
var sClientId;

sClientId = localStorage.getItem("instagramClientId");
sClientId ? $("#client_id").val(sClientId) : "";

if ( currentUrl.indexOf("#access_token=") != -1 ) {
	token = currentUrl.split("#access_token=")[1]
}

var sUrlApiInstgram = "https://api.instagram.com/oauth/authorize/";
sUrlApiInstgram += "?client_id=<%CLIENT-ID%>";
sUrlApiInstgram += "&redirect_uri=<%REDIRECT-URL%>"
sUrlApiInstgram += "&response_type=token";

console.log (sClientId)
console.log (currentUrl)

if (token) {

	sUrlRecentPhotos = "https://api.instagram.com/v1/users/2094276/media/recent";
	sUrlRecentPhotos += "?access_token=" + token

	$.ajax({
		url: sUrlRecentPhotos,
		dataType: "jsonp",
		success: function(oData) {
			var aPhotos = oData.data;
			var sHtmlTotal = "", sHtmlCard;

			localStorage.setItem("instagramClientId",sClientId);

			$.each(aPhotos, function(index, oPhoto) {
				oPhoto.caption ? null : $.extend(oPhoto, { caption : { text : "" } } );
				sHtmlCard = sCardTemplate;
				sHtmlCard = sHtmlCard.replace(/\{\{id\}\}/g, oPhoto.id);
				sHtmlCard = sHtmlCard.replace(/\{\{link\}\}/g, oPhoto.link);
				sHtmlCard = sHtmlCard.replace(/\{\{caption\}\}/g, oPhoto.caption.text);
				sHtmlCard = sHtmlCard.replace(/\{\{image\}\}/g, oPhoto.images.standard_resolution.url);
				sHtmlCard = sHtmlCard.replace(/\{\{comments\}\}/g, oPhoto.comments.count);
				sHtmlCard = sHtmlCard.replace(/\{\{likes\}\}/g, oPhoto.likes.count);
				sHtmlCard = sHtmlCard.replace(/\{\{username\}\}/g, oPhoto.user.username);
				sHtmlCard = sHtmlCard.replace(/\{\{username_profile_picture\}\}/g, oPhoto.user.profile_picture);
				sHtmlCard = sHtmlCard.replace(/\{\{user_full-name\}\}/g, oPhoto.user.full_name);
				sHtmlCard = sHtmlCard.replace(/\@\{\{model\.user\.full_name\}\}/g, oPhoto.user.full_name);
				console.log (oPhoto);
				sHtmlTotal += sHtmlCard;
			})
			$("#my-photos").html(sHtmlTotal);
		}
	});

}
else {

	$("#connect")

		.on("click", function(e) {

			e.preventDefault();

			var sClientId = $("#client_id").val();

			if (sClientId=="") {
				alert("Please, write a valid SoundCloud API KEY");
				return false;
			}
			else {
				localStorage.setItem("instagramClientId",sClientId);
			}

			sUrlApiInstgram = sUrlApiInstgram.replace("<%CLIENT-ID%>", sClientId );
			sUrlApiInstgram = sUrlApiInstgram.replace("<%REDIRECT-URL%>", currentUrl );

			window.location.replace(sUrlApiInstgram);
		})
		.removeClass("hidden");

}