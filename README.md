# angular-action-timer

Angular action delay timer. 

[Demo](http://plnkr.co/Lvw8BG)

Delay an action (Function) every time it is scheduled. So action is only invoked once if schedule continually but within the delay time each time.

Useful when some function need to be invoked after user "stop" doing something continually. 
     
## API

### actionTimer(action, delay?)

Create a timer that invoke `action` after scheduled for `delay` (or 100ms if `delay` is omitted). 

#### schedule(delay?)

Schedule timer for `delay` (or default delay if omitted).

#### when(promise, delay?)

Schedule timer for delay (or default delay if omitted) after `promise.then()`.

#### after(promise, delay?)

Schedule timer for delay (or default delay if omitted) after `promise.finally()`.
 
#### cancel()

Cancel scheduled timer.  

