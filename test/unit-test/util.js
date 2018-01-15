function compareBasicArrays(array1,array2) {
    var i = 0;
    if(!(array1 && array1 instanceof Array && array2 && array2 instanceof Array)){
        return false;
    }

    if (array1.length != array2.length) {
        return false;
    }
    for (i = 0; i < array1.length; i++) {
        if(array1[i]!==array2[i]) return false;
    }

    return true;
}

function compareObjectsArrays(array1,array2) {
    var i = 0;
    if(!(array1 && array1 instanceof Array && array2 && array2 instanceof Array)){
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }
    for (i = 0; i < array1.length; i++) {
        if(!compareObjects(array1[i],array2[i])) return false;
    }

    return true;
}

function compareObjects(object1, object2) {

    if (objectKeyCount(object1) !== objectKeyCount(object2)) return false;
    for (prop in object1){
        if (object1.hasOwnProperty(prop) && object2.hasOwnProperty(prop)) {
            if (object1[prop] instanceof Object && object2[prop] instanceof Object){
                if (!compareObjects(object1[prop],object2[prop])) {
                    return false;
                }
            }
            else if (object1[prop] instanceof Array && object2[prop] instanceof Array
                && object1[prop][0] instanceof Object && object2[prop][0] instanceof Object){

                if (!compareObjectsArrays(object1[prop],object2[prop])){
                    return false;
                }
            }
            else if(object1[prop] !== object2[prop]){
                return false;
            }
        }else return false;
    }

    return true;

    function objectKeyCount(object) {
        var count = 0;
        for (key in object)
            if(object.hasOwnProperty(key))
                count++;

        return count;
    }
}