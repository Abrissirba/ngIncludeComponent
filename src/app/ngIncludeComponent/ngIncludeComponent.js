(function(angular){
    'use strict';
    
    angular.module('abrissirba.includeComponent', [])
        .directive('ngIncludeComponent', function ($compile, $parse, $log) { 

            // convert from camelCase to dashed camel-case format
            function denormalize(str) {
                return str.replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
            }
            
            // the params need to be converted to a string so that they can be injected to the element html
            function createParamString(paramDefinitions, scopeProperty) {
                var params = [];
                // add the property on the parent scope that holds the reference to the variables that should be injected to the directive
                scopeProperty = scopeProperty ? scopeProperty + '.' : '';

                paramDefinitions.forEach(function(param) {
                    var paramString = "";
                    // us the param as is on both sides if the param is a string
                    if (angular.isString(param)) {
                        paramString = denormalize(param) + "='" + scopeProperty + param + "'";
                    }
                    // if param is an object it means that we need to map a reference in the parent scope to a directive parameter with a different name
                    else if (angular.isObject(param)) {
                        for(var key in param){
                            if (param.hasOwnProperty(key)){
                                paramString = denormalize(key) + "='" + scopeProperty + param[key] + "'"
                            }
                        }
                    }
                    if (paramString !== "") {
                        params.push(paramString);
                    }
                    else{
                        $log.error("Could not parse parameter: " + param);
                    }
                    
                });
                
                return params.length > 0 ? ' ' + params.join(' ') : params.join(' ');
            }

            return {  
                link: function(scope, element, attrs) {
                    var currentScope;

                    function cleanUp() {
                        if (currentScope) {
                            currentScope.$destroy();
                            currentScope = null;
                        }
                    }

                    function compile(componentName) {
                        if(componentName && componentName.length > 0){
                            // make sure that the scope of the previously included component is destroyed.
                            cleanUp();
                            // convert from camelCase to dashed camel-case format
                            var denormalizedComponentName = denormalize(componentName);

                            // evaluate the param definitaion
                            var paramDefinitions = paramDefinitionGetter(scope);
                            // convert the param definition object to string
                            var paramString = createParamString(paramDefinitions, scopeProperty);
                            
                            // create html tag to include 
                            var html = "<" + denormalizedComponentName + paramString + "></" + denormalizedComponentName + ">";

                            // set the elements inner html
                            element.html(html);

                            // create new scope so that it can be destroyed properly when the watch is triggered
                            currentScope = scope.$new();

                            // compile the directive with the current scope
                            $compile(element.contents())(currentScope);
                        }
                    }

                    var scopeProperty = attrs.scope;

                    var componentNameGetter = $parse(attrs.name);
                    
                    // watch for when the component name is changed
                    scope.$watch(function(){
                        return componentNameGetter(scope);
                    }, compile);
                    
                    var paramDefinitionGetter = $parse(attrs.params);
                    
                    // watch for when the component name is changed
                    // scope.$watch(function() {
                    //     return attrs.name; 
                    // }, compile);
                }
            };
        });
})(angular);