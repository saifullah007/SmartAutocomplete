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

/*QUnit.module("Configuration Test", {
	beforeEach: function(assert) {
		console.log("\n");
		console.log("############### Testing Module Configuration ###############")
	}
});*/

QUnit.test("Test Configuration for undefined/no options",function(assert) {
	assertValue._assertMethod = assert;
	assertValue._expected = {
		data: 'required',
		url: 'required',
		maxNoOfContent: 10,
		paginated: false
	}

	var actual = new SmartAutocomplete.Configuration();

	assert.ok(actual, "Passed : Configuration created succesfully for no options");

	assertValue._actual = actual;
	assertValue('data');
	assertValue('url');
	assertValue('maxNoOfContent');
	assertValue('paginated');
	assert.ok(typeof actual.get("listLocation") === 'function', "Passed : listLocation of type function");
	assert.ok(typeof actual.get("getValue") 	=== 'function', "Passed : getValue of type function");

	assert.expect(7);
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
	assert.ok(typeof actual.get("listLocation") === 'function', "Passed : listLocation of type function");
	assert.ok(typeof actual.get("getValue") 	=== 'function', "Passed : getValue of type function");
	assert.expect(6);
});

QUnit.test("Basic Configuration Test", function (assert) {

	assertValue._assertMethod = assert;

	var options = {
		data: ['A', 'B', 'C'],
		maxNoOfContent: 20,
		paginated: true,
		paginationQuery: {
			offset: 0,
			length: 10
		},
		url: function (phrase) {
			return 'url?'+phrase;
		},
		getValue: function (element) {
			return element;
		},
		listLocation: function(data) {
			return data;
		},
		getPaginationQuery: function(prevPaginationQuery){
			return prevPaginationQuery;
		}
	};
	var actual = new SmartAutocomplete.Configuration(options);

	assertValue._expected = options;
	assertValue._actual = actual;

	assertValue('data');
	assertValue('url');
	assertValue('getValue');
	assertValue('listLocation');
	assertValue('maxNoOfContent');
	assertValue('paginated');

});

QUnit.test("getValue Test", function(assert) {
	
	var options = {
		getValue: 'name'
	}

	var testData = {
			name: ['A', 'B', 'C', 'D', 'E'],
			name2: ['A', 'B', 'C', 'D'],
			length: 5
		};

	var actual = new SmartAutocomplete.Configuration(options);

	assert.ok(testData.name === actual.get('getValue')(testData), 
	"Passed: fieldName assigned to getValue");

	options = {
		getValue: function(data) {
			return data.fruits.dataList;
		}
	};

	testData = {
		fruits: {
			dataList:['apple', 'orange', 'grapes']
		}
	}

	actual = new SmartAutocomplete.Configuration(options);

	assert.ok(testData.fruits.dataList === actual.get('getValue')(testData), 
	"Passed: function assigned to getValue for complicated data");
});

QUnit.test("pagination Configuration Test", function(assert) {

	var options = {
		pagination:{
			query: {
				offset: 1,
				length: 20
			},
			next: function (currentPaginationQuery) {
				return currentPaginationQuery;
			},
			prev: function (currentPaginationQuery) {
				return currentPaginationQuery;
			}
		}
	}

	var actual = new SmartAutocomplete.Configuration(options);

	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actual;

	assertValue('offset', 'query', 'pagination');
	assertValue('length', 'query', 'pagination');
	assert.ok(typeof actual.get('pagination').next === 'function', 
	"Passed: pagination.next is of type function");

	assert.ok(typeof actual.get('pagination').prev === 'function', 
	"Passed: pagination.prev is of type function");

	assert.ok(options.pagination.query.offset === actual.get('pagination').next().offset);
	assert.ok(options.pagination.query.length === actual.get('pagination').next().length);
	assert.ok(options.pagination.query.offset === actual.get('pagination').prev().offset);
	assert.ok(options.pagination.query.length === actual.get('pagination').prev().length);

	options.pagination.next = function(currentPaginationQuery){
		currentPaginationQuery.offset = currentPaginationQuery.offset+currentPaginationQuery.length;
		return currentPaginationQuery;
	}

	options.pagination.prev = function(currentPaginationQuery){
		currentPaginationQuery.offset = currentPaginationQuery.offset-currentPaginationQuery.length;
		return currentPaginationQuery;
	}

	actual = new SmartAutocomplete.Configuration(options);

	assert.ok((options.pagination.query.offset+options.pagination.query.length) === actual.get('pagination').next().offset);
	assert.ok(options.pagination.query.length === actual.get('pagination').next().length);
	assert.ok((options.pagination.query.offset-options.pagination.query.length) === actual.get('pagination').prev().offset);
	assert.ok(options.pagination.query.length === actual.get('pagination').prev().length);

	// Checking if original pagination query is not modified
	assert.ok(options.pagination.query.length === SmartAutocomplete.Configuration.currentPaginationQuery.length)
	assert.ok(options.pagination.query.offset === SmartAutocomplete.Configuration.currentPaginationQuery.offset)

});