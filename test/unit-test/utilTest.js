QUnit.module("Utility Test");

QUnit.test("Compare Basic array test",function (assert) {
    var array = ["saif","sajjad","mayank"],
        array2 = ["saif","sajjad","mayank"];

    assert.ok(compareBasicArrays(array,array2));
    assert.ok(compareBasicArrays(array2,array));

    array = ["saif","sajjad","mayank"];
    array2 = ["saif","sajjad","pandit"];
    assert.ok(!compareBasicArrays(array,array2));

    array = [1,2,3];
    array2 = [1,2,3];
    assert.ok(compareBasicArrays(array,array2));

    array = [1,2,3];
    array2 = [1,2,"3"];
    assert.ok(!compareBasicArrays(array,array2));

});


QUnit.test("Compare Objects Test",function (assert) {
    var obj = {
        name:"saif",
        age:24
    };

    var obj2 = {
        age:24,
        name:"saif"
    };

    assert.ok(compareObjects(obj,obj2));

    obj.age = 25;

    assert.ok(!compareObjects(obj,obj2))
});

QUnit.test("Compare Nested Objects Test",function (assert) {
    var nestedObject = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };
    var nestedObject2 = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };

    assert.ok(compareObjects(nestedObject,nestedObject2));

    nestedObject = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };
    nestedObject2 = {
        name:"saif",
        age:24,
        sex:"male",
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };

    assert.ok(!compareObjects(nestedObject,nestedObject2));

    nestedObject = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };
    nestedObject2 = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineering"
        }
    };

    assert.ok(!compareObjects(nestedObject,nestedObject2));

    nestedObject = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer"
        }
    };
    nestedObject2 = {
        name:"saif",
        age:24,
        address:{
            city:"kolkata",
            profession:"Software Engineer",
            pincode:700039
        }
    };

    assert.ok(!compareObjects(nestedObject,nestedObject2));


});

QUnit.test("Array of Objects Test",function (assert) {
    var objectsArray = [
        {
            name:"saif",
            age:24
        },
        {
            name:"sajjad",
            age:24
        }
    ];
    var objectsArray2 = [
        {
            name:"saif",
            age:24
        },
        {
            name:"sajjad",
            age:24
        }
    ];

    assert.ok(compareObjectsArrays(objectsArray,objectsArray2));

    objectsArray = [
        {
            name:"saif",
            age:24
        },
        {
            name:"sajjad",
            age:24
        }
    ];
    objectsArray2 = [
        {
            name:"sajjad",
            age:24
        },
        {
            name:"saif",
            age:24
        }
    ];

    assert.ok(!compareObjectsArrays(objectsArray,objectsArray2));

    objectsArray = [
        {
            name:"saif",
            age:24
        },
        {
            name:"sajjad",
            age:24
        }
    ];
    objectsArray2 = [
        {
            name:"saif",
            age:24,
            sex:"male"
        },
        {
            name:"sajjad",
            age:24
        }
    ];

    assert.ok(!compareObjectsArrays(objectsArray,objectsArray2));
});