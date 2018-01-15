/**
 * smart-autocomplete
 * @Author Saif
 */
var SmartAutocomplete = (function (scope) {

    scope.Configuration = function Configuration(options) {
        var defaults = {
            data: 'required',
            url: 'required',
            maxNoOfContent: 10,
            paginated: false,
            pagination: {
                query: {
                    offset: 0,
                    length: 10
                },
                next: function(currentPaginationQuery){
                    return currentPaginationQuery;
                },
                prev: function(currentPaginationQuery){
                    return currentPaginationQuery;
                }
            },
            cache:false,
            cacheTime:1000,
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

        this.get = function(propertyName) {
            return defaults[propertyName];
        }

        // var requiredFields = ['data', ''];

        if(!options){
            options = {};
        }
        mergeOptions(options);

        normalizeConfigurationAfterMerge();

        function mergeOptions(options){

            mergeObjects(defaults, options);

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
        

        updatePaginationFunction();

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

    // TODO: Need to find out how to update Configuration.currentPaginationQuery.
    // TODO: Whoever calls this method {getPaginationQuery} must update the {Configuration.currentPaginationQuery}
    // depending on success and failure of its operations.
    
    function updatePaginationFunction(){
        Configuration.currentPaginationQuery = defaults.pagination.query;

        var orignalNextPaginationQuery = defaults.pagination.next;
        defaults.pagination.next = function(){
            return orignalNextPaginationQuery(JSON.parse(JSON.stringify(Configuration.currentPaginationQuery)));
        }

        var orignalPrevPaginationQuery = defaults.pagination.prev;
        defaults.pagination.prev = function(){
            return orignalPrevPaginationQuery(JSON.parse(JSON.stringify(Configuration.currentPaginationQuery)));
        }
    }   
    };

    return scope;
})(SmartAutocomplete || {});


var SmartAutocomplete = (function (scope) {

    scope.Template = function Template(templateOptions){

        var defaultTemplates = {
            basic:{
                type:'basic',
                method:function(element){return element},
                cssClass:''
            },
            date:{
                type:'date',
                format:'dd/MM/yyyy',
                method:function (element) {
                    return element;
                },
                cssClass:''
            },
            label:{
                type:'label',
                method:function (element) {
                    return element;
                },
                cssClass:''
            },
            custom:{
                type:'custom',
                method:function(element){},
                cssClass:''
            }
        },

        convertTemplateToMethod = function(templateOptions){
            var buildMethod,
                fields=templateOptions.fields;

            if(templateOptions.type === 'basic'){
                buildMethod = defaultTemplates.basic.method;
                return buildMethod;
            }
            else if (templateOptions.type === 'date') {
                if (typeof fields.date === "string") {
                    buildMethod = function (value, element) {
                        return value+" <span class='smt-ac-date'>"+formatDate(element[fields.date])+"</span>"
                    }

                }else if (typeof fields.date === 'function') {
                    buildMethod = function (value, element) {
                        return value+" <span class='smt-ac-date'>"+fields.date(element)+"</span>"
                    }
                }
            }else if (templateOptions.type === 'label') {
                if (typeof fields.label === 'string') {
                    buildMethod = function (value, element) {
                        return value+" <span class='smt-ac-label'>"+element[fields.label]+"</span>";
                    }
                }else if (typeof fields.label === 'function'){
                    buildMethod = function (value, element) {
                        return value+" <span class='smt-ac-label'>"+fields.label(element)+"</span>"
                    }
                }
            }
            else if (templateOptions.type === 'custom') {
                buildMethod = defaultTemplates.custom.method;
                return buildMethod;
            }


            return templateOptions.basic.method;

            function formatDate(date) {
            //    TODO : implement logic to format date
            }
        },

        prepareBuildMethod = function(templateOptions){
            if(!templateOptions || !templateOptions.type) return defaultTemplates.basic.method;

            if (templateOptions.type && defaultTemplates[templateOptions.type]) {
                return convertTemplateToMethod(templateOptions);
            }else{
                return defaultTemplates.basic.method;
            }
        };

        this.buildMethod = prepareBuildMethod(templateOptions);
    };

    return scope;
    
})(SmartAutocomplete || {});