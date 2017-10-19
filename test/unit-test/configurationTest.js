/**
 * 
 * Utility method to compare value of fields between actual and extected object.
 * 
 * For 1 argument, @param {String} value represents the field to be compared between 
 * assertValue._expected and assertValue._actual Object
 * 
 * For 2 argument, @param {String} value, @param {String} objectOne represents the field to be compared
 * between {assertValue._expected.objectOne} and {assertValue._actual.objectOne}
 * 
 * For 3 argument, @param {String} value, @param {String} objectOne, @param {String} objectTwo 
 * represents the field to be compared between 
 * {assertValue._expected.objectTwo.objectOne} and {assertValue._actual.objectTwo.objectOne}
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

QUnit.test("A demo test", function (assert) {
    assert.equal("Test", "Test", "Demo Test")
});