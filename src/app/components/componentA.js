'use strict';

angular.module('ngIncludeComponent')
  .directive('componentA', function () {
	return {
        scope: {
            id: "=",
            title: "="
        },
		template: "<div> Component A - {{title}} <b>{{id}}</b></div>",
		link: function(){
		}
	};
  });
