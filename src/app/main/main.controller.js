(function() {
    'use strict';

    angular
        .module('ngIncludeComponent')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController() {
        var vm = this;
               
        vm.id = -1;
        vm.title = "Test"
        
        vm.componentParams = [
            'id',
            'title'
        ]
        
        vm.widgets = [{
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
        }]
    }
})();
