# ngIncludeComponent

ngIncludeComponent is an angular directive that makes it possible to dynamically load other directives based on their names..
The design goal was to try to make the usage similiar to how ngInclude works but instead of giving a Url from where angular injects 
the HTML you provide ngIncludeComponent with the directive name instead. 

## Install

```
bower install ng-include-component --save
```

```
var app = angular.module('app', ['abrisssirba.includeComponent']);
```

## Use Case

One situation where this might be handy is if you have a dashboard where you have many different widgets which are all separate directives.
Say that you have an array that holds information about the different widgets, e.g. which directive the widget should use to render itself, 
and that you would like to render these widgets with a simple ng-repeat.
Without being able to dynamically include directives you would need to have many ng-ifs or ng-switches to render the correct widget directive.
With ngIncludeComponent you instead render each widget with <ng-include-component name="widget.directiveName"></ng-include-component>


## Example

```html
<div ng-repeat="widget in widgets">
    <ng-include-component name="widget.type" params="widget.params" scope="widget"></ng-include-component>
</div>
```

```javascript
var app = angular.module('app', ['abrisssirba.includeComponent']);

app.controller(function($scope){
   $scope.widgets = [{
        id: 1,
        widgetTitle: "Widget A",
        type: "componentA",
        params: ['id', {'title': 'widgetTitle'}]
    },{
        id: 2,
        title: "Widget B",
        type: "componentB",
        params: ['id', 'title']
    },{
        id: 3,
        title: "Widget C",
        type: "componentA",
        params: ['id', 'title']
    }];
});
```

```javascript
angular.module('app')
  .directive('componentA', function () {
	return {
        scope: {
            id: "=",
            title: "="
        },
		template: "<div> Component A - {{title}} <b>{{id}}</b></div>",
		link: function(scope){
		}
	};
  });
  
  angular.module('app')
  .directive('componentB', function () {
	return {
        scope: {
            id: "=",
            title: "="
        },
		template: "<div> Component B - {{title}} <b>{{id}}</b></div>",
		link: function(scope){
		}
	};
  });
```

## API

### name 

Type `String`

The name of the directive that should be created. The name should be in camelCase;

### params

Type `Array`

An array that states which parameters that should be used with the created directive. The items in the array can be either a string or an object with one single key value pair.
If the item is a string, it will assume that the parameter has the same name on the parent scope as the directive. 
An object can be used if the parameter have a different name in the parent scope than the directive. 
In the example the first widget have a widgetTitle property. The directive however wants a title property.
By giving the params array the object {'title': 'widgetTitle'} ngIncludeComponent will map widgetTitle in the parent scope to the title paramter that the directive wants.

### scope

`String`

The name of the scope property that holds the properties that should be used with the directive. In the example this is the widget property inside the ng-repeat. 
Another common use case is when you are using the controllerAs syntax. Not needed if the property is directly on the scope.