var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PolygonLookup = require('polygon-lookup');
import { polygon } from 'polygon-tools';

import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../utils/pointsUtils';

var getCoordPercentage = function getCoordPercentage(e) {
  return {
    x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
    y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
  };
};

export var TYPE = 'POLYGON';

/* 
 * This function checks if the argument pointToCheck exists on the line created between pointA and pointB.
 * All point arguments are represented as two element arrays (e.g.: [10, 15]).
 */
function isPointOnLine(pointA, pointB, pointToCheck) {
  return Math.hypot(pointToCheck[0] - pointA[0], pointToCheck[1] - pointA[1]) + Math.hypot(pointB[0] - pointToCheck[0], pointB[1] - pointToCheck[1]) === Math.hypot(pointB[0] - pointA[0], pointB[1] - pointA[1]);
}

/* 
 * This function checks if the point [x, y] exists on the edge of the polygon created by points polygonPoints.
 * The argument polygonPoints is an array of objects (e.g.: [{x: 10, y: 15}, ...]).
 */
function isPointOnPolygonEdge(_ref, polygonPoints) {
  var x = _ref.x,
      y = _ref.y;

  if (!polygonPoints || polygonPoints.length < 3 || !x || !y) {
    return false;
  }

  for (var i = 0; i < polygonPoints.length - 1; ++i) {
    if (i === 0) {
      // First point
      if (isPointOnLine(polygonPoints[0], polygonPoints[polygonPoints.length - 1], [x, y])) {
        return true;
      }
    } else {
      if (isPointOnLine(polygonPoints[i], polygonPoints[i + 1], [x, y])) {
        return true;
      }
    }
  }
  return false;
}

export function intersects(_ref2, geometry) {
  var x = _ref2.x,
      y = _ref2.y;

  if (!geometry || !geometry.points || geometry.points.length < 3) return false;

  // Switch to point array format (e.g.: [{x: 10, y: 15}, ...] -> [[10, 15], ...])
  var pointsAsArrays = geometry.points.map(function (point) {
    return [point.x, point.y];
  });

  // Setup GeoJSON json format
  var featureCollection = {
    type: 'FeatureCollection',
    features: [{
      geometry: {
        type: 'Polygon',
        coordinates: [pointsAsArrays]
      }
    }]

    // Determine if point is inside polygon
  };var lookup = new PolygonLookup(featureCollection);
  var poly = lookup.search(x, y);

  // Return whether the point is inside the polygon (poly equals undefined if not) or if the
  // point is on the edge (isPointOnPolygonEdge function call)
  return poly !== undefined || isPointOnPolygonEdge({ x: x, y: y }, pointsAsArrays);
}

export function area(geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return 0;

  return polygon.area(geometry.points.map(function (point) {
    return [point.x, point.y];
  }));
}

export var methods = {
  onSelectionComplete: function onSelectionComplete(annotation) {
    return _extends({}, annotation, {
      selection: _extends({}, annotation.selection, {
        showEditor: true,
        mode: 'EDITING'
      })
    });
  },
  onSelectionClear: function onSelectionClear(annotation) {
    return _extends({}, annotation, {
      geometry: _extends({}, annotation.geometry, {
        points: []
      })
    });
  },
  onSelectionUndo: function onSelectionUndo(annotation) {
    return _extends({}, annotation, {
      geometry: _extends({}, annotation.geometry, {
        points: annotation.geometry.points.slice(0, -1)
      })
    });
  },
  onClick: function onClick(annotation, e) {
    var coordOfClick = getCoordPercentage(e);

    return _extends({}, annotation, {
      geometry: _extends({}, annotation.geometry, {
        type: TYPE,
        points: !annotation.geometry ? [coordOfClick] : [].concat(annotation.geometry.points, [coordOfClick])
      }),
      selection: _extends({}, annotation.selection, {
        mode: 'SELECTING'
      })
    });
  }
};

export default {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods
};