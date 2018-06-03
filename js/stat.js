'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INDENT = 50;
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var PLAYERS_COLOR = '0, 128, 255';
var BAR_OPACITY_MIN = 0.4;
var BAR_OPACITY_MAX = 1;
var BAR_X_START = 140;
var BAR_Y_START = 85;
var FONT_HEIGHT = 20;

var renderCloud = function (ctx, x, y, color, strokeColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }
};

var getMaxElement = function (elements) {
  var maxElement = elements[0];

  for (var i = 1; i < elements.length; i++) {
    if (elements[i] > maxElement) {
      maxElement = elements[i];
    }
  }

  return Math.round(maxElement);
};

var getColor = function () {
  var opacity = Math.random() * (BAR_OPACITY_MAX - BAR_OPACITY_MIN) + BAR_OPACITY_MIN;
  return 'rgba(' + PLAYERS_COLOR + ', ' + opacity + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', 'black');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff', 'black');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + GAP + FONT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + GAP + 2 * FONT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? USER_COLOR : getColor();
    var barHeight = (Math.round(times[i]) * BAR_HEIGHT) / maxTime;
    ctx.fillRect(BAR_X_START + (BAR_INDENT + BAR_WIDTH) * i, BAR_Y_START + BAR_HEIGHT - barHeight + FONT_HEIGHT / 2, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), BAR_X_START + (BAR_INDENT + BAR_WIDTH) * i, BAR_Y_START + BAR_HEIGHT - barHeight);
    ctx.fillText(names[i], BAR_X_START + (BAR_INDENT + BAR_WIDTH) * i, BAR_Y_START + BAR_HEIGHT + FONT_HEIGHT * 1.5);
  }
};
