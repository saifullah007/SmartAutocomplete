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

        mergeOptions();

        normalizeConfigurationAfterMerge();

        function mergeOptions(){



            function mergeObjects(source, target){
                var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object" || 
								target[propertyName] instanceof Array) {
							mergedObject[propertyName] = target[propertyName];
						} else {
							mergeObjects(source[propertyName], target[propertyName]);
						}
					}
				}
			
				/* If data is an object */
				if (target.data !== undefined && target.data !== null && typeof target.data === "object") {
					mergedObject.data = target.data;
				}

				return mergedObject;
            }
        };

        function normalizeConfigurationAfterMerge() {

            if (defaults.url !== 'required' && typeof defaults.url !== 'function') {
                var defaultsUrl = defaults.url;
                defaults.url = function() {
                    return defaultsUrl;
                }
            }

            if (typeof defaults.listLocation === 'string') {
                var defaultsListLocation = defaults.listLocation;

                defaults.listLocation = function(data) {
                    return data[defaultsListLocation];
                };
            }

            if (typeof defaults.getValue === 'string') {
                var defaultsGetValue = defaults.getValue;
                defaults.getValue = function(element) {
                    return element[defaultsGetValue];
                };
            }
        }
        
    };

    return scope;
})(SmartAutocomplete || {});