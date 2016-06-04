$(document).ready(function($) { // it will be executed when the DOM is fully loaded

	$('form').on('submit', function(event) {
		event.preventDefault();
		var idFormula = $(this).attr("id"); // "f1", "f2" or "f3"
		var preId = "#" + idFormula;
		// Operands & Formula
		var a = $( preId + "-a").val();
		var b = $( preId + "-b").val();
		var result = getResult(idFormula, a, b)
		// Write Result in proper input
		$( preId + "-result").val( result )
	});

});