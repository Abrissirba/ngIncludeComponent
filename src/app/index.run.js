(function() {
  'use strict';

  angular
    .module('ngIncludeComponent')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
