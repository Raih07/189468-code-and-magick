'use strict';

var WIZARD_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarList = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (elements) {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
