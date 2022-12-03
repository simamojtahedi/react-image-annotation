'use strict';

exports.__esModule = true;
var getRealCoordinates = exports.getRealCoordinates = function getRealCoordinates(e) {
  var rect = e.currentTarget.getBoundingClientRect();

  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      isTouchMoveEvent(e) && e.preventDefault();
      var touch = e.targetTouches[0];
      var offsetX = touch.clientX - rect.x;
      var offsetY = touch.clientY - rect.y;

      return {
        x: offsetX,
        y: offsetY,
        width: rect.width,
        height: rect.height
      };
    } else {
      return {
        x: 0,
        y: 0,
        width: rect.width,
        height: rect.height
      };
    }
  } else {
    var _offsetX = e.clientX - rect.x;
    var _offsetY = e.clientY - rect.y;

    return {
      x: _offsetX,
      y: _offsetY,
      width: rect.width,
      height: rect.height
    };
  }
};

var getMouseRelativeCoordinates = exports.getMouseRelativeCoordinates = function getMouseRelativeCoordinates(e) {
  // nativeEvent.offsetX gives inconsistent results when dragging
  // up and to the left rather than the more natural down and to the
  // right. The reason could be browser implementation (it is still experimental)
  // or it could be that nativeEvent offsets are based on target rather than
  // currentTarget.
  // To keep consistent behavior of the selector use the bounding client rect.
  var rect = e.currentTarget.getBoundingClientRect();
  var offsetX = e.clientX - rect.x;
  var offsetY = e.clientY - rect.y;

  return {
    x: offsetX / rect.width * 100,
    y: offsetY / rect.height * 100
  };
};

var clamp = function clamp(a, b, i) {
  return Math.max(a, Math.min(b, i));
};
var getTouchRelativeCoordinates = function getTouchRelativeCoordinates(e) {
  var touch = e.targetTouches[0];

  var boundingRect = e.currentTarget.getBoundingClientRect();
  // https://idiallo.com/javascript/element-postion
  // https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
  var offsetX = touch.clientX - boundingRect.left;
  var offsetY = touch.clientY - (boundingRect.top + window.scrollY);

  return {
    x: clamp(0, 100, offsetX / boundingRect.width * 100),
    y: clamp(0, 100, offsetY / boundingRect.height * 100)
  };
};

var getCoordPercentage = function getCoordPercentage(e) {
  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      isTouchMoveEvent(e) && e.preventDefault();
      return getTouchRelativeCoordinates(e);
    } else {
      return {
        x: null
      };
    }
  } else {
    return getMouseRelativeCoordinates(e);
  }
};

var isTouchEvent = function isTouchEvent(e) {
  return e.targetTouches !== undefined;
};
var isValidTouchEvent = function isValidTouchEvent(e) {
  return e.targetTouches.length === 1;
};
var isTouchMoveEvent = function isTouchMoveEvent(e) {
  return e.type === 'touchmove';
};

exports.getOffsetCoordPercentage = getMouseRelativeCoordinates;
exports.getCoordPercentage = getCoordPercentage;