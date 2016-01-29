'use strict';

angular.module('abrissirba.includeComponent', [])
    .directive('ngIncludeComponent', function ($compile, $parse) { //$parse

        // convert from camelCase to dashed camel-case format
		function denormalize(str) {
			return str.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        }
        
        function createParamString(paramDefinition){
            var params = [];
            for(var key in paramDefinition){
                if (paramDefinition.hasOwnProperty(key)){
                    params.push(denormalize(key) + "='" + paramDefinition[key] + "'");
                }
            }
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

                        var paramDefinition = paramDefinitionGetter(scope);
                        var paramString = createParamString(paramDefinition);
                        
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
