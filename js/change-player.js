'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var coatColorInput = setup.querySelector('input[name="coat-color"]');
  var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setup.querySelector('input[name="fireball-color"]');

  var setColorWizard = function (element, elementField, colors, flag) {
    var color = window.utils.getRandomElement(colors);
    elementField.value = color;

    if (!flag) {
      element.style.fill = color;
    } else {
      element.style.backgroundColor = color;
    }
  };

  var changePlayer = function (evt) {
    var target = evt.target;

    if (target.classList.contains('wizard-coat')) {
      setColorWizard(target, coatColorInput, COAT_COLORS);
    } else if (target.classList.contains('wizard-eyes')) {
      setColorWizard(target, eyesColorInput, EYES_COLORS);
    } else if (target.classList.contains('setup-fireball')) {
      setColorWizard(target.parentElement, fireballColorInput, FIREBALL_COLORS, true);
    }
  };

  window.changePlayer = changePlayer;
})();
