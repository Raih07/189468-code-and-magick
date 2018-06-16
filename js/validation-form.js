'use strict';

(function () {
  var validationForm = function (inputField) {
    if (inputField.validity.tooShort) {
      inputField.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (inputField.validity.tooLong) {
      inputField.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (inputField.validity.valueMissing) {
      inputField.setCustomValidity('Обязательное поле');
    } else {
      inputField.setCustomValidity('');
    }
  };

  window.validationForm = validationForm;
})();
