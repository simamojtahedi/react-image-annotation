'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n'], ['\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  margin-top: 16px;\n  transform-origin: top left;\n  animation: ', ' 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  overflow: hidden;\n  margin-left: -50%;\n  margin-right: 50%\n'], ['\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  margin-top: 16px;\n  transform-origin: top left;\n  animation: ', ' 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  overflow: hidden;\n  margin-left: -50%;\n  margin-right: 50%\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _TextEditor = require('../TextEditor');

var _TextEditor2 = _interopRequireDefault(_TextEditor);

var _RadioButtonEditor = require('../RadioButtonEditor');

var _RadioButtonEditor2 = _interopRequireDefault(_RadioButtonEditor);

var _pointsUtils = require('../../utils/pointsUtils');

var _selectors = require('../../selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var fadeInScale = (0, _styledComponents.keyframes)(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2, fadeInScale);

function Editor(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(
    'div',
    {
      className: props.className,
      style: _extends({
        position: 'absolute',
        left: geometry.type === _selectors.PolygonSelector.TYPE ? (0, _pointsUtils.getHorizontallyCentralPoint)(geometry.points) + '%' : geometry.x + '%',
        top: geometry.type === _selectors.PolygonSelector.TYPE ? (0, _pointsUtils.getVerticallyLowestPoint)(geometry.points) + '%' : geometry.y + geometry.height + '%',
        zIndex: 999
      }, props.style)
    },
    _react2.default.createElement(
      Container,
      null,
      geometry.type === _selectors.PolygonSelector.TYPE && _react2.default.createElement(_RadioButtonEditor2.default, {
        onChangeAge: function onChangeAge(e) {
          return props.onChange(_extends({}, props.annotation, {
            data: _extends({}, props.annotation.data, {
              age: e.target.value
            })
          }));
        },
        onChangeRenovationType: function onChangeRenovationType(e) {
          return props.onChange(_extends({}, props.annotation, {
            data: _extends({}, props.annotation.data, {
              renovationType: e.target.value
            })
          }));
        },
        onSubmit: props.onSubmit,
        ageValue: props.annotation.data && props.annotation.data.age,
        renovationTypeValue: props.annotation.data && props.annotation.data.renovationType,
        imageZoomAmount: props.imageZoomAmount
      }),
      geometry.type !== _selectors.PolygonSelector.TYPE && _react2.default.createElement(_TextEditor2.default, {
        onChange: function onChange(e) {
          return props.onChange(_extends({}, props.annotation, {
            data: _extends({}, props.annotation.data, {
              text: e.target.value
            })
          }));
        },
        onSubmit: props.onSubmit,
        value: props.annotation.data && props.annotation.data.text
      })
    )
  );
}

Editor.defaultProps = {
  className: '',
  style: {}
};

exports.default = Editor;
module.exports = exports['default'];