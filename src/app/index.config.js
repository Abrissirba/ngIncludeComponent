(function() {
  'use strict';

  angular
    .module('ngIncludeComponent')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
