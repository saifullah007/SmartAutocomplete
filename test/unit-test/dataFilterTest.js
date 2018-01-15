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
    
    assert.ok(compareBasicArrays(expectedArray,basicDataFilter.getDataList(option.data)),'Passed : Basic data filtration');

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

    basicDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration(option2));

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
    
    assert.ok(compareBasicArrays(expectedArray,basicDataFilter.getDataList(option.data)),'Passed : Advanced data filtration')

});

QUnit.test("Test Element list",function (assert) {
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

    var expectedElementList = option.data.dataList;

    var basicDataFilter = new SmartAutocomplete.DataFilter(new SmartAutocomplete.Configuration(option));
    assert.ok(compareObjectsArrays(expectedElementList,basicDataFilter.getElementList(option.data)),"Passed : Element List");
});
