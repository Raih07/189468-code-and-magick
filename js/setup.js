'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupPlayer = setup.querySelector('.setup-player');
var dialogHandler = setup.querySelector('.upload');

var userNameInput = setup.querySelector('.setup-user-name');
var coatColorInput = setup.querySelector('input[name="coat-color"]');
var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
var fireballColorInput = setup.querySelector('input[name="fireball-color"]');

var similarList = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (elements) {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name')) {
    closePopup();
  }
};

var onUserNameInputInvalid = function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var setColorWizard = function (element, elementField, colors, flag) {
  var color = getRandomElement(colors);
  elementField.value = color;

  if (!flag) {
    element.style.fill = color;
  } else {
    element.style.backgroundColor = color;
  }
};

var onSetupPlayerClick = function (evt) {
  var target = evt.target;

  if (target.classList.contains('wizard-coat')) {
    setColorWizard(target, coatColorInput, COAT_COLORS);
  } else if (target.classList.contains('wizard-eyes')) {
    setColorWizard(target, eyesColorInput, EYES_COLORS);
  } else if (target.classList.contains('setup-fireball')) {
    setColorWizard(target.parentElement, fireballColorInput, FIREBALL_COLORS, true);
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  setup.style.left = '';
  setup.style.top = '';
  document.addEventListener('keydown', onPopupEscPress);
  userNameInput.addEventListener('invalid', onUserNameInputInvalid);
  setupPlayer.addEventListener('click', onSetupPlayerClick);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userNameInput.removeEventListener('invalid', onUserNameInputInvalid);
  setupPlayer.removeEventListener('click', onSetupPlayerClick);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.left = (setup.offsetLeft + shift.x) + 'px';
    setup.style.top = (setup.offsetTop + shift.y) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onDialogHandlerClick = function (e) {
        e.preventDefault();
        dialogHandler.removeEventListener('click', onDialogHandlerClick);
      };
      dialogHandler.addEventListener('click', onDialogHandlerClick);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.target.appendChild(draggedItem);
});


artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});

var createPlayer = function () {
  var playerFirstName = getRandomElement(WIZARD_FIRST_NAMES);
  var playerSecondName = getRandomElement(WIZARD_SECOND_NAMES);
  var playerCoatColor = getRandomElement(COAT_COLORS);
  var playerEyesColor = getRandomElement(EYES_COLORS);

  return {
    name: playerFirstName + ' ' + playerSecondName,
    coatColor: playerCoatColor,
    eyesColor: playerEyesColor
  };
};

var createArrayPlayer = function (count) {
  var players = [];

  for (var i = 0; i < count; i++) {
    players.push(createPlayer());
  }

  return players;
};

var renderWizard = function (wizard) {
  var wizardTemplate = similarWizardTemplate.cloneNode(true);

  wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardTemplate;
};

var wizards = createArrayPlayer(WIZARD_COUNT);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarList.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
