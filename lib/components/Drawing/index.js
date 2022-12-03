"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Drawing(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 " + geometry.size.width + " " + geometry.size.height, className: props.className, style: { position: 'absolute' } },
    geometry.lines.map(function (l, i) {
      return _react2.default.createElement("polyline", { key: "p-" + i, fill: "none", stroke: 'black', strokeWidth: '4px',
        points: l.map(function (e) {
          return e.x + "," + e.y;
        }).join(' ') });
    }),
    _react2.default.createElement("polyline", { fill: "none", stroke: 'black', strokeWidth: '4px',
      points: geometry.points.map(function (e) {
        return e.x + "," + e.y;
      }).join(' ') })
  );
}

Drawing.defaultProps = {
  className: '',
  style: {}
};

exports.default = Drawing;
module.exports = exports["default"];