'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupPlayer = setup.querySelector('.setup-player');

  var onPopupEscPress = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  var onSetupPlayerClick = function (evt) {
    window.changePlayer(evt);
  };

  var onUserNameInputInvalid = function () {
    window.validationForm(userNameInput);
  };

  var onFormSubmit = function (evt) {
    window.backend.uploadData(new FormData(setupForm), closePopup, window.showError);
    evt.preventDefault();
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.style.left = '';
    setup.style.top = '';
    document.addEventListener('keydown', onPopupEscPress);
    userNameInput.addEventListener('invalid', onUserNameInputInvalid);
    setupPlayer.addEventListener('click', onSetupPlayerClick);
    setupForm.addEventListener('submit', onFormSubmit);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userNameInput.removeEventListener('invalid', onUserNameInputInvalid);
    setupPlayer.removeEventListener('click', onSetupPlayerClick);
    setupForm.removeEventListener('submit', onFormSubmit);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });
})();
