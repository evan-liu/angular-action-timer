describe('ng.actionTimer.actionTimer', function () {

  /** @type {ng.actionTimer.actionTimerFactory} */
  var actionTimer;
  /** @type {ng.actionTimer.actionTimer} */
  var timer;

  var $timeout, $q, action;
  beforeEach(module('ng.actionTimer'));
  beforeEach(inject(function (_actionTimer_, _$timeout_, _$q_) {
    actionTimer = _actionTimer_;
    $timeout = _$timeout_;
    $q = _$q_;
    action = jasmine.createSpy('action');
    timer = actionTimer(action);
  }));

  describe('schedule()', function () {
    describe('when delay is not set in factory method', function () {
      describe('when delay is not set', function () {
        it('should invoke action after default delay time', function () {
          timer.schedule();

          $timeout.flush(timer.DEFAULT_DELAY - 1);
          expect(action).not.toHaveBeenCalled();
          $timeout.flush(1);
          expect(action).toHaveBeenCalled();
        });
      });

      describe('when delay is set', function () {
        it('should invoke action after delay time', function () {
          timer.schedule(201);

          $timeout.flush(200);
          expect(action).not.toHaveBeenCalled();
          $timeout.flush(1);
          expect(action).toHaveBeenCalled();
        });
      });
    });

    describe('when delay is set in factory method', function () {
      beforeEach(function () {
        timer = actionTimer(action, 301);
      });

      describe('when delay is not set', function () {
        it('should invoke action after factory delay time', function () {
          timer.schedule();

          $timeout.flush(300);
          expect(action).not.toHaveBeenCalled();
          $timeout.flush(1);
          expect(action).toHaveBeenCalled();
        });
      });

      describe('when delay is set', function () {
        it('should invoke action after delay time', function () {
          timer.schedule(401);

          $timeout.flush(400);
          expect(action).not.toHaveBeenCalled();
          $timeout.flush(1);
          expect(action).toHaveBeenCalled();
        });
      });
    });

  });

  describe('when()', function () {
    var deferral;
    beforeEach(function () {
      deferral = $q.defer();
    });

    describe('when delay is not set', function () {
      it('should invoke action after factory delay time', function () {
        timer.when(deferral.promise);
        deferral.resolve();
        $timeout.flush();

        $timeout.flush(timer.DEFAULT_DELAY - 1);
        expect(action).not.toHaveBeenCalled();
        $timeout.flush(1);
        expect(action).toHaveBeenCalled();
      });
    });

    describe('when delay is set', function () {
      it('should invoke action after delay time', function () {
        timer.when(deferral.promise, 501);
        deferral.resolve();
        $timeout.flush();

        $timeout.flush(500);
        expect(action).not.toHaveBeenCalled();
        $timeout.flush(1);
        expect(action).toHaveBeenCalled();
      });
    });
  });

  describe('after()', function () {
    var deferral;
    beforeEach(function () {
      deferral= $q.defer();
    });

    describe('when delay is not set', function () {
      it('should invoke action after factory delay time', function () {
        timer.after(deferral.promise);
        deferral.resolve();
        $timeout.flush();

        $timeout.flush(timer.DEFAULT_DELAY - 1);
        expect(action).not.toHaveBeenCalled();
        $timeout.flush(1);
        expect(action).toHaveBeenCalled();
      });
    });

    describe('when delay is set', function () {
      it('should invoke action after delay time', function () {
        timer.after(deferral.promise, 501);
        deferral.reject();
        $timeout.flush();

        $timeout.flush(500);
        expect(action).not.toHaveBeenCalled();
        $timeout.flush(1);
        expect(action).toHaveBeenCalled();
      });
    });
  });

  describe('cancel', function () {
    it('should cancel schedule()', function () {
      timer.schedule();
      timer.cancel();

      $timeout.verifyNoPendingTasks();
      expect(action).not.toHaveBeenCalled();
    });

    it('should cancel when() and after()', function () {
      var d1 = $q.defer();
      var d2 = $q.defer();

      timer.when(d1.promise);
      timer.after(d2.promise);
      timer.cancel();

      d1.resolve();
      d2.reject();
      $timeout.flush();
      $timeout.verifyNoPendingTasks();
      expect(action).not.toHaveBeenCalled();
    });

  });
});