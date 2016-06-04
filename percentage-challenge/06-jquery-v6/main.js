/* getResult: return the result according to the specified formula name */
function getResult( formula, a, b ) {
	switch (formula) {
		case "f1":
			return a/100*b;
		case "f2":
			return a/b*100;
		case "f3":
			return (b-a)/a*100;
		default:
			return -1;
	}
}

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