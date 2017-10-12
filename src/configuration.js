var SmartAutocomplete = (function (scope) {

    scope.Configuration = function Configuration(options) {
        var defaults = {
            data: 'required',
            url: 'required',
            maxNoOfContent: 10,
            paginated: false,
            paginationQuery: {},
            getPaginationQuery: function(prevPaginationQuery){
                return prevPaginationQuery;
            },
            listLocation: function(data){
                return data;
            },
            getValue: function(element){
                return element;
            },

            onClickEvent: function(e) {},
            onSelectEvent: function(e) {},
            onLoadEvent: function(e) {},
            onKeyEnterEvent: function(e) {},
            onShowListEvent: function(e) {},
            onHideListEvent: function(e) {}
        };

        // var requiredFields = ['data', ''];

        overideDefaultWithOptions(defaults, options);
        
        function overideDefaultsWithOption(options){};
    };

    return scope;
})(SmartAutocomplete || {});