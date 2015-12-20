(function () {
  "use strict";

  angular
    .module('ng.actionTimer', ['ng'])
    .factory('actionTimer', actionTimer);

  /**
   * @param {ng.ITimeoutService} $timeout
   */
  function actionTimer($timeout) {
    return actionTimerFactory;

    /**
     * @callback ng.actionTimer.actionTimerFactory
     *
     * @param {function} action
     * @param {number} [delay=100]
     *
     * @return {ng.actionTimer.ActionTimer}
     */
    function actionTimerFactory(action, delay) {

      /** @namespace ng.actionTimer.ActionTimer */
      var timer = {
        DEFAULT_DELAY: 100,

        schedule: schedule,
        when: when,
        after: after,
        cancel: cancel
      };

      var actionDelay = delay > 0 ? delay : timer.DEFAULT_DELAY;
      var timerPromise;

      var afterPromises = [];
      var whenPromises = [];

      return timer;

      function schedule(delay) {
        cancel();
        timerPromise = $timeout(action, delay > 0 ? delay : actionDelay);
      }

      /**
       * Schedule timer when promise is resolved.
       *
       * @param {ng.IPromise} promise
       * @param {number=} delay
       */
      function when(promise, delay) {
        if (whenPromises.indexOf(promise) > -1) {
          return;
        }
        whenPromises.push(promise);

        promise.then(function () {
          var index = whenPromises.indexOf(promise);
          if (index == -1) {
            return;
          }
          whenPromises.splice(index, 1);
          schedule(delay);
        });
      }

      /**
       * Schedule timer after `promise.finally()`
       *
       * @param {ng.IPromise} promise
       * @param {number=} delay
       */
      function after(promise, delay) {
        if (afterPromises.indexOf(promise) > -1) {
          return;
        }
        afterPromises.push(promise);

        promise.finally(function () {
          var index = afterPromises.indexOf(promise);
          if (index == -1) {
            return;
          }
          afterPromises.splice(index, 1);
          schedule(delay);
        });
      }

      function cancel() {
        if (timerPromise) {
          $timeout.cancel(timerPromise);
          timerPromise = null;
        }
        whenPromises = [];
        afterPromises = [];
      }
    }
  }

  actionTimer.$inject = ['$timeout'];
})();