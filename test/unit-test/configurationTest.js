/**
 * 
 * Utility method to compare value of fields between actual and extected object.
 * 
 * For 1 argument, @param {String} value represents the field to be compared between 
 * assertValue._expected and assertValue._actual objects.
 * 
 * For 2 argument, @param {String} value, @param {String} objectOne represents the field to be compared
 * between {assertValue._expected.objectOne} and {assertValue._actual.objectOne} objects.
 * 
 * For 3 argument, @param {String} value, @param {String} objectOne, @param {String} objectTwo 
 * represents the field to be compared between 
 * {assertValue._expected.objectTwo.objectOne} and {assertValue._actual.objectTwo.objectOne} objects.
 * 
 * This function can be further extend following the pattern above.
 * 
 * @param {String} value 
 * @param {String} objectOne 
 * @param {String} objectTwo 
 */

function assertValue (value, objectOne, objectTwo) {
	
	assert = assertValue._assertMethod;

	if(!assertValue._expected) {
		assertValue._expected = {};	
	} 

	if(!assertValue._actual) {
		assertValue._actual = {};	
	} 

	var length = arguments.length;

	switch(length) {
		case 1:
			if (typeof assertValue._actual.get(value) === "function") {
				assert.ok(assertValue._expected[value].toString() === assertValue._actual.get(value).toString() , "Passed - " + value );
			} else {
				assert.ok(assertValue._expected[value] === assertValue._actual.get(value) , "Passed - " + value );	
			}
			
		break;

		case 2:
			assert.ok(assertValue._expected[objectOne][value] === assertValue._actual.get(objectOne)[value] , "Passed - " + objectOne + " " + value );
		break;

		case 3:
			assert.ok(assertValue._expected[objectTwo][objectOne][value] === assertValue._actual.get(objectTwo)[objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );	
		break;

		default:
		break;
	}
}

QUnit.module("Configuration Test", {
	beforeEach: function(assert) {
		console.log("\n");
		console.log("############### Testing Module Configuration ###############")
	}
});

QUnit.test("Test Defualt Configuration", function (assert) {
    assertValue._assertMethod = assert;
	assertValue._expected = {
		data: 'required',
		url: 'required',
		maxNoOfContent: 10,
		paginated: false
	}

	var actual = new SmartAutocomplete.Configuration({});

	assertValue._actual = actual;

	assertValue('data');
	assertValue('url');
	assertValue('maxNoOfContent');
	assertValue('paginated');
	assert.ok(typeof actual.get("paginationQuery") 		=== 'object', 	"Passed : paginationQuery of type object");
	assert.ok(typeof actual.get("getPaginationQuery") 	=== 'function', "Passed : getPaginationQuery of type function");
	assert.ok(typeof actual.get("listLocation") 		=== 'function', "Passed : listLocation of type function");
	assert.ok(typeof actual.get("getValue") 			=== 'function', "Passed : getValue of type function");
	assert.expect(8);
});