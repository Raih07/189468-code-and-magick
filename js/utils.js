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

  var getRandomSortElements = function (elements) {
    return elements.slice().sort(function () {
      return Math.random() > 0.5 ? 1 : -1;
    });
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomSortElements: getRandomSortElements,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
