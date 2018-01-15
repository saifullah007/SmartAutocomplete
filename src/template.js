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