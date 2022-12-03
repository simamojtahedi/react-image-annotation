'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  padding: 8px 16px;\n  color: #363636!important;\n'], ['\n  padding: 8px 16px;\n  color: #363636!important;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  background: whitesmoke;\n  border: 0;\n  box-sizing: border-box;\n  color: #363636;\n  cursor: pointer;\n  font-size: 1rem;\n  margin: 0;\n  outline: 0;\n  padding: 8px 16px;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0,0,0,0.1);\n  width: 100%;\n\n  transition: background 0.21s ease-in-out;\n\n  &:focus, &:hover {\n    background: #eeeeee;\n  }\n'], ['\n  background: whitesmoke;\n  border: 0;\n  box-sizing: border-box;\n  color: #363636;\n  cursor: pointer;\n  font-size: 1rem;\n  margin: 0;\n  outline: 0;\n  padding: 8px 16px;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0,0,0,0.1);\n  width: 100%;\n\n  transition: background 0.21s ease-in-out;\n\n  &:focus, &:hover {\n    background: #eeeeee;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Inner = _styledComponents2.default.div(_templateObject);

var Button = _styledComponents2.default.div(_templateObject2);

function RadioButtonEditor(props) {
  var zoomBetweenZeroAndOne = Math.abs((props.imageZoomAmount - 1) / 4 - 1);

  var fontSize = 1 / 5 + zoomBetweenZeroAndOne * (4 / 5);

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      Inner,
      { style: { fontSize: fontSize + 'rem', padding: 1 / 5 * 8 + 4 / 5 * 8 * zoomBetweenZeroAndOne + 'px ' + (1 / 5 * 16 + 4 / 5 * 16 * zoomBetweenZeroAndOne) + 'px' } },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h6',
          { style: { margin: '0px 0px', textAlign: 'center', fontSize: fontSize + 'rem' } },
          ' - Coffee Age - '
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', { type: 'radio',
            name: 'age',
            value: 'young',
            checked: props.ageValue === 'young',
            onChange: props.onChangeAge
          }),
          ' Young'
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', { type: 'radio',
            name: 'age',
            value: 'mature',
            checked: props.ageValue === 'mature',
            onChange: props.onChangeAge
          }),
          ' Mature'
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h6',
          { style: { margin: '0px 0px', textAlign: 'center', fontSize: fontSize + 'rem' } },
          ' - Renovation Type - '
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', { type: 'radio',
            name: 'renovationType',
            value: 'esqueletomento',
            checked: props.renovationTypeValue === 'esqueletomento',
            onChange: props.onChangeRenovationType
          }),
          ' Esquele.'
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', { type: 'radio',
            name: 'renovationType',
            value: 'recepa',
            checked: props.renovationTypeValue === 'recepa',
            onChange: props.onChangeRenovationType
          }),
          ' Recepa'
        )
      )
    ),
    props.ageValue && props.ageValue.length > 0 && props.renovationTypeValue && props.renovationTypeValue.length > 0 && _react2.default.createElement(
      Button,
      {
        onClick: props.onSubmit,
        style: { fontSize: fontSize + 'rem', padding: 1 / 5 * 8 + 4 / 5 * 8 * zoomBetweenZeroAndOne + 'px ' + (1 / 5 * 16 + 4 / 5 * 16 * zoomBetweenZeroAndOne) + 'px' }
      },
      'Submit'
    )
  );
}

exports.default = RadioButtonEditor;
module.exports = exports['default'];