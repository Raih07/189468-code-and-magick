'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createPlayer = function () {
    var playerFirstName = window.utils.getRandomElement(WIZARD_FIRST_NAMES);
    var playerSecondName = window.utils.getRandomElement(WIZARD_SECOND_NAMES);
    var playerCoatColor = window.utils.getRandomElement(COAT_COLORS);
    var playerEyesColor = window.utils.getRandomElement(EYES_COLORS);

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

  var renderWizard = function (wizardData) {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return wizard;
  };

  var wizards = createArrayPlayer(WIZARD_COUNT);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarList.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');
}) ();
