describe("A function sum()", function() {

	it("should be defined", function() {
		expect(sum).toBeDefined();
	});

	it("should return a number", function() {
		var result = sum();
		expect( typeof(result) ).toEqual( "number" );
	});

	it("should be defined with 2 parameters", function() {
		expect( sum.length ).toEqual( 2 );
	});

	it("should return sum(2,3) => 5", function() {
		expect( sum(2,3) ).toEqual( 5 );
	});

	it("should return sum('5',3) => 5", function() {
		//expect( sum('2',3) ).toEqual( 5 );
	});

});