'use strict';

angular.module('ngIncludeComponent')
  .directive('componentB', function () {
	return {
        scope: {
            id: "=",
            title: "="
        },
		template: "<div> Component B - {{title}} <b>{{id}}</b></div>",
		link: function(){

		}
	};
  });
