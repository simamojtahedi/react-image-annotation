"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Highlighter(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 " + geometry.size.width + " " + geometry.size.height, className: props.className, style: { position: 'absolute' } },
    _react2.default.createElement("polyline", { fill: "none", stroke: '#ffe000a6', strokeWidth: '24px',
      points: geometry.points.map(function (e) {
        return e.x + "," + e.y;
      }).join(' ') })
  );
}

Highlighter.defaultProps = {
  className: '',
  style: {}
};

exports.default = Highlighter;
module.exports = exports["default"];