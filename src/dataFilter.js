var SmartAutocomplete = (function (scope) {

    scope.DataFilter = function DataFilter(configuration) { 

        this.getDataList = function(data){
            var list = configuration.get('listLocation')(data);
            if(list){
                list = list.map(function(element){
                    return configuration.get('getValue')(element);
                });

                return list;
            }
            return [];
        };

        this.getElementList = function (data) {
            var list = configuration.get('listLocation')(data);
            return list || [];
        }
    };

    return scope;
})(SmartAutocomplete || {});