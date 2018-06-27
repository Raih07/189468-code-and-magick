'use strict';

(function () {
  var WIZARD_COUNT = 4;

  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizardData) {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizard;
  };

  var renderAllWizards = function (elements) {
    var elementsCount = elements.length > WIZARD_COUNT ? WIZARD_COUNT : elements.length;
    similarList.innerHTML = '';

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < elementsCount; i++) {
      fragment.appendChild(renderWizard(elements[i]));
    }
    similarList.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = renderAllWizards;
})();
