function compareBasicArrays(array1,array2) {
    var i = 0;
    if(!(array1 && array1 instanceof Array && array2 && array2 instanceof Array)){
        return false;
    }

    if (array1.length != array2.length) {
        return false;
    }
    for (var i = 0; i < array1.length; i++) {
        if(array1[i]!==array2[i]) return false;
    }

    return true;
}

QUnit.module("DataFilter Test");

QUnit.test('Default DataFilter Test',function(assert){
    var defaultDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration());
    assert.ok(defaultDataFilter,"Basic Data filter created");

    var dataList = ['A', 'B', 'C', 'D'];
    
    assert.ok(compareBasicArrays(dataList, defaultDataFilter.getDataList(dataList)),"Passed : Returned same data list");
});

QUnit.test('Basic DataFilter Test',function (assert) {
    var option = {
        data:[
            {
                name:"saif",
                age:24
            },
            {
                name:"sajjad",
                age:24
            },
            {
                name:"bikash",
                age:24
            },
            {
                name:"kaushik",
                age:24
            }
        ],
        getValue:'name'
    };

    var basicDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration(option));

    var expectedArray = ['saif', 'sajjad' , 'bikash' , 'kaushik'];
    
    assert.ok(compareBasicArrays(expectedArray,basicDataFilter.getDataList(option.data)),'Passed : Basic datafilteration')

    var option2 = {
        data:{
            id:5,
            dataList:[
            {
                name:"saif",
                age:24
            },
            {
                name:"sajjad",
                age:24
            },
            {
                name:"bikash",
                age:24
            },
            {
                name:"kaushik",
                age:24
            }
        ]
        },
        getValue:'name',
        listLocation:'dataList'
    };

    var basicDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration(option2));

    assert.ok(compareBasicArrays(expectedArray,basicDataFilter.getDataList(option2.data)));
});

QUnit.test('Advanced DataFilter Test',function (assert) {
    var option = {
        data:{
            id:5,
            dataList:[
            {
                name:"saif",
                age:24
            },
            {
                name:"sajjad",
                age:24
            },
            {
                name:"bikash",
                age:24
            },
            {
                name:"kaushik",
                age:24
            }
        ]
        },
        getValue:function(element){
            return element.name;
        },
        listLocation:function(data){
            return data.dataList
        }
    };

    var basicDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration(option));

    var expectedArray = ['saif', 'sajjad' , 'bikash' , 'kaushik'];
    
    assert.ok(compareBasicArrays(expectedArray,basicDataFilter.getDataList(option.data)),'Passed : Basic datafilteration')

});