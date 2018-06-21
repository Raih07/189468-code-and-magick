'use strict';

(function () {
  var showError = function (errorMessage) {
    var errorTooltip = document.createElement('div');
    errorTooltip.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorTooltip.style.position = 'absolute';
    errorTooltip.style.left = 0;
    errorTooltip.style.right = 0;
    errorTooltip.style.fontSize = '30px';

    errorTooltip.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorTooltip);
  };

  window.showError = showError;
})();
