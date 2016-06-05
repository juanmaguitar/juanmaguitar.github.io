describe("getResult function", function() {

	it("should exist", function() {
		expect( getResult ).toBeDefined();
	});

	it("should return a number", function() {
		var result = getResult();
		var typeResult = typeof(result);
		expect( typeResult ).toEqual("number");
	});

	it("should accept either numbers or strings containing numbers", function() {
		var result = getResult('f1','50','500');
		expect( result ).toEqual(250);
	});

	it("should return -1 in case of non existing formula", function() {
		var result = getResult('myFormula',50,500);
		expect( result ).toEqual(-1);
	});

	describe("should return proper result for formula 1 => a/100*b", function() {

    it("should return 250 when getResult('f1',50,500)", function() {
      var result = getResult('f1',50,500);
			expect( result ).toEqual(250);
    });

    it("should return 20 when getResult('f1',20,100)", function() {
      var result = getResult('f1',20,100);
			expect( result ).toEqual(20);
    });

    it("should return 1000 when getResult('f1',10,10000)", function() {
      var result = getResult('f1',10,10000);
			expect( result ).toEqual(1000);
    });

	});

	describe("should return proper result for formula 2 => a/b*100", function() {

    it("should return 10 when getResult('f2',50,500)", function() {
      var result = getResult('f2',50,500);
			expect( result ).toEqual(10);
    });

    it("should return 20 when getResult('f2',100,500)", function() {
      var result = getResult('f2',100,500);
			expect( result ).toEqual(20);
    });

	});

	describe("should return proper result for formula 3 => (b-a)/a*100", function() {

    it("should return 50 when getResult('f3',20,30)", function() {
      var result = getResult('f3',20,30);
			expect( result ).toEqual(50);
    });

    it("should return 100 when getResult('f3',20,40)", function() {
      var result = getResult('f3',20,40);
			expect( result ).toEqual(100);
    });

	});

});
