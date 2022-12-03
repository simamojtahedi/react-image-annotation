var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { getCoordPercentage, getRealCoordinates } from '../utils/offsetCoordinates';

var MARGIN = 6;

var marginToPercentage = function marginToPercentage(container) {
  return {
    marginX: MARGIN / container.width * 100,
    marginY: MARGIN / container.height * 100
  };
};

export var TYPE = 'DRAWING';

export function intersects(_ref, geometry, container) {
  var x = _ref.x,
      y = _ref.y;

  if (geometry.points.some(function (e) {
    if (x * geometry.size.width / 100 < e.x - MARGIN) return false;
    if (y * geometry.size.height / 100 < e.y - MARGIN) return false;
    if (x * geometry.size.width / 100 > e.x + MARGIN) return false;
    if (y * geometry.size.height / 100 > e.y + MARGIN) return false;
    return true;
  })) {
    return true;
  }
  if (geometry.lines.some(function (e) {
    return e.some(function (e) {
      if (x * geometry.size.width / 100 < e.x - MARGIN) return false;
      if (y * geometry.size.height / 100 < e.y - MARGIN) return false;
      if (x * geometry.size.width / 100 > e.x + MARGIN) return false;
      if (y * geometry.size.height / 100 > e.y + MARGIN) return false;
      return true;
    });
  })) {
    return true;
  }

  return false;
}

export function area(geometry, container) {
  var _marginToPercentage = marginToPercentage(container),
      marginX = _marginToPercentage.marginX,
      marginY = _marginToPercentage.marginY;

  return MARGIN * MARGIN;
}

export var methods = {
  onTouchStart: function onTouchStart(annotation, e) {
    return pointerDown(annotation, e);
  },
  onTouchEnd: function onTouchEnd(annotation, e) {
    return pointerUp(annotation, e);
  },
  onTouchMove: function onTouchMove(annotation, e) {
    return pointerMove(annotation, e);
  },
  onMouseDown: function onMouseDown(annotation, e) {
    return pointerDown(annotation, e);
  },
  onMouseUp: function onMouseUp(annotation, e) {
    return pointerUp(annotation, e);
  },
  onMouseMove: function onMouseMove(annotation, e) {
    return pointerMove(annotation, e);
  }
};

function pointerDown(annotation, e) {
  var _getRealCoordinates = getRealCoordinates(e),
      x = _getRealCoordinates.x,
      y = _getRealCoordinates.y,
      width = _getRealCoordinates.width,
      height = _getRealCoordinates.height;

  return _extends({}, annotation, {
    geometry: _extends({}, annotation.geometry || {}, {
      lines: [].concat(annotation.geometry && annotation.geometry.lines || [], [annotation.geometry && annotation.geometry.points || []]),
      points: [{ x: x, y: y }],
      size: annotation.geometry && annotation.geometry.size || { width: width, height: height }
    }),
    selection: _extends({}, annotation.selection, {
      showEditor: false,
      mode: 'SELECTING'
    })
  });
}

function pointerUp(annotation, e) {
  if (annotation.selection) {
    var selection = annotation.selection,
        geometry = annotation.geometry;

    if (!geometry) {
      return {};
    }
    switch (annotation.selection.mode) {
      case 'SELECTING':
        var lastPoint = getCoordPercentage(e);
        return _extends({}, annotation, {
          geometry: _extends({}, annotation.geometry, {
            x: lastPoint.x,
            y: lastPoint.y + 10,
            height: 0
          }),
          selection: _extends({}, annotation.selection, {
            showEditor: true,
            mode: 'EDITING'
          })
        });
      default:
        break;
    }
  }
  return annotation;
}

function pointerMove(annotation, e) {
  if (annotation.selection && annotation.selection.mode === 'SELECTING') {
    var _getRealCoordinates2 = getRealCoordinates(e),
        x = _getRealCoordinates2.x,
        y = _getRealCoordinates2.y;

    return _extends({}, annotation, {
      geometry: _extends({}, annotation.geometry, {
        type: TYPE,
        points: [].concat(annotation.geometry.points || [], [{ x: x, y: y }])
      })
    });
  }
  return annotation;
}

export default {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods
};