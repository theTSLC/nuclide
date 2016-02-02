Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

exports.attachEvent = attachEvent;
exports.observableFromSubscribeFunction = observableFromSubscribeFunction;

var _eventKit = require('event-kit');

var _rx = require('rx');

/**
 * Add an event listener an return a disposable for removing it. Note that this function assumes
 * node EventEmitter semantics: namely, that adding the same combination of eventName and callback
 * adds a second listener.
 */

function attachEvent(emitter, eventName, callback) {
  emitter.addListener(eventName, callback);
  return new _eventKit.Disposable(function () {
    emitter.removeListener(eventName, callback);
  });
}

function observableFromSubscribeFunction(fn) {
  return _rx.Observable.create(function (observer) {
    return fn(observer.onNext.bind(observer));
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozt3QkFheUIsV0FBVzs7a0JBQ1gsSUFBSTs7Ozs7Ozs7QUFPdEIsU0FBUyxXQUFXLENBQUMsT0FBcUIsRUFBRSxTQUFpQixFQUFFLFFBQWtCLEVBQWM7QUFDcEcsU0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDekMsU0FBTyx5QkFBZSxZQUFNO0FBQzFCLFdBQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQzdDLENBQUMsQ0FBQztDQUNKOztBQUtNLFNBQVMsK0JBQStCLENBQUksRUFBd0IsRUFBaUI7QUFDMUYsU0FBTyxlQUFXLE1BQU0sQ0FBQyxVQUFBLFFBQVE7V0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUM7Q0FDMUUiLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQge0Rpc3Bvc2FibGV9IGZyb20gJ2V2ZW50LWtpdCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4JztcblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgYW4gcmV0dXJuIGEgZGlzcG9zYWJsZSBmb3IgcmVtb3ZpbmcgaXQuIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIGFzc3VtZXNcbiAqIG5vZGUgRXZlbnRFbWl0dGVyIHNlbWFudGljczogbmFtZWx5LCB0aGF0IGFkZGluZyB0aGUgc2FtZSBjb21iaW5hdGlvbiBvZiBldmVudE5hbWUgYW5kIGNhbGxiYWNrXG4gKiBhZGRzIGEgc2Vjb25kIGxpc3RlbmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoRXZlbnQoZW1pdHRlcjogRXZlbnRFbWl0dGVyLCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRGlzcG9zYWJsZSB7XG4gIGVtaXR0ZXIuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfSk7XG59XG5cbnR5cGUgU3Vic2NyaWJlQ2FsbGJhY2s8VD4gPSAoaXRlbTogVCkgPT4gbWl4ZWQ7XG50eXBlIFN1YnNjcmliZUZ1bmN0aW9uPFQ+ID0gKGNhbGxiYWNrOiBTdWJzY3JpYmVDYWxsYmFjazxUPikgPT4gSURpc3Bvc2FibGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlRnJvbVN1YnNjcmliZUZ1bmN0aW9uPFQ+KGZuOiBTdWJzY3JpYmVGdW5jdGlvbjxUPik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gZm4ob2JzZXJ2ZXIub25OZXh0LmJpbmQob2JzZXJ2ZXIpKSk7XG59XG4iXX0=