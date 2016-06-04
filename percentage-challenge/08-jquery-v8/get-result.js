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