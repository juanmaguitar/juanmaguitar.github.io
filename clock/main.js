function sortZones(zoneA, zoneB) {
	if (zoneA.zoneName > zoneB.zoneName) {
		return 1;
	}
	if (zoneA.zoneName < zoneB.zoneName) {
		return -1;
	}
	  // a must be equal to b
	  return 0;
}

$.ajax({
	url: 'http://api.timezonedb.com/v2/list-time-zone?key=ZANARFIMQIIL&format=json'
})
.done(function( data ) {
	var timezoneList = ""
	var zones = data.zones.sort( sortZones );
	$.each(zones, function(index, zone) {
		timezoneList += '<option value="countryCode">' + zone.zoneName + '</option>'
	})
	$("select")
		.append(timezoneList)
		.selectpicker('refresh');
	// console.log(data);
})

$("select").on('change', function() {
	var momentTime = moment( currentTime );
	// console.log ( currentTime );
	// console.log ( momentTime );
	var selectedTimeZone = $(this).find(":selected").text();
	//console.log ( selectedTimeZone );

	//	console.log ( momentTime.tz.guess() )
	var selectedTimeZone_Time = momentTime.tz(selectedTimeZone).format('YYYY-MM-DD HH:mm:ss');

	console.log ( momentTime.tz(selectedTimeZone) );

	hour =  momentTime.tz(selectedTimeZone).get('hour') ;
	minute =  momentTime.tz(selectedTimeZone).get('minute') ;
	second = momentTime.tz(selectedTimeZone).get('second') ;

	displayTime( hour, minute, second );
	$("p.timezone").html(selectedTimeZone)

	clearInterval(interval);
	interval = setInterval (updateTime, 1000);

	console.log (selectedTimeZone_Time);

	console.log ( "Time in " + selectedTimeZone + " is " + selectedTimeZone_Time)

});
