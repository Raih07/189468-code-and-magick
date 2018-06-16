'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomElement = function (elements) {
    var index = Math.floor(Math.random() * elements.length);
    return elements[index];
  };

  window.utils = {
    getRandomElement: getRandomElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
}) ();
