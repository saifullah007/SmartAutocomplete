var SmartAutocomplete = (function (scope) {

    scope.Template = function Template(templateOptions){

        var templates = {
            basic:{
                type:'basic',
                method:function(element){return element},
                cssClass:''
            },
            custom:{
                type:'custom',
                method:function(element){},
                cssClass:''
            }
        },

        convertTemplateToMethod = function(templateOptions){
            var buildMethod;

            if(templateOptions.type === 'basic'){
                buildMethod = templates.basic.method;
                return buildMethod;
            }else if(templateOptions.type === 'custom'){
                buildMethod = templates.custom.method;
                return buildMethod;
            }

            return templateOptions.basic.method;
        },

        prepareBuildMethod = function(templateOptions){
            if(!templateOptions || !templateOptions.type) return templates.basic.method;

            if (templateOptions.type && templates[templateOptions.type]) {
                return convertTemplateToMethod(templateOptions);
            }else{
                return templates.basic.method;
            }
        };

        this.buildMethod = prepareBuildMethod(templateOptions);
    };

    return scope;
    
})(SmartAutocomplete || {});