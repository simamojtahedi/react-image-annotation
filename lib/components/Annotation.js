'use strict';

exports.__esModule = true;

var _class, _temp2;

var _templateObject = _taggedTemplateLiteralLoose(['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n  touch-action: ', ';\n'], ['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n  touch-action: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: block;\n  width: 100%;\n  height: 100%;\n'], ['\n  display: block;\n  width: 100%;\n  height: 100%;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactZoomPanPinch = require('react-zoom-pan-pinch');

var _compose = require('../utils/compose');

var _compose2 = _interopRequireDefault(_compose);

var _isMouseHovering = require('../utils/isMouseHovering');

var _isMouseHovering2 = _interopRequireDefault(_isMouseHovering);

var _withRelativeMousePos = require('../utils/withRelativeMousePos');

var _withRelativeMousePos2 = _interopRequireDefault(_withRelativeMousePos);

var _selectors = require('../selectors');

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.div(_templateObject, _Overlay2.default, function (props) {
  return props.allowTouch ? "pinch-zoom" : "auto";
});

var Img = _styledComponents2.default.img(_templateObject2);

var Items = _styledComponents2.default.div(_templateObject3);

var Target = Items;

exports.default = (0, _compose2.default)((0, _isMouseHovering2.default)(), (0, _withRelativeMousePos2.default)())((_temp2 = _class = function (_Component) {
  _inherits(Annotation, _Component);

  function Annotation() {
    var _temp, _this, _ret;

    _classCallCheck(this, Annotation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.targetRef = _react2.default.createRef(), _this.addTargetTouchEventListeners = function () {
      // Safari does not recognize touch-action CSS property,
      // so we need to call preventDefault ourselves to stop touch from scrolling
      // Event handlers must be set via ref to enable e.preventDefault()
      // https://github.com/facebook/react/issues/9809

      _this.targetRef.current.ontouchstart = _this.onTouchStart;
      _this.targetRef.current.ontouchend = _this.onTouchEnd;
      _this.targetRef.current.ontouchmove = _this.onTargetTouchMove;
      _this.targetRef.current.ontouchcancel = _this.onTargetTouchLeave;
    }, _this.removeTargetTouchEventListeners = function () {
      _this.targetRef.current.ontouchstart = undefined;
      _this.targetRef.current.ontouchend = undefined;
      _this.targetRef.current.ontouchmove = undefined;
      _this.targetRef.current.ontouchcancel = undefined;
    }, _this.componentWillUnmount = function () {
      window.removeEventListener("resize", _this.forceUpdateComponent);
    }, _this.forceUpdateComponent = function () {
      _this.forceUpdate();
    }, _this.setInnerRef = function (el) {
      _this.container = el;
      _this.props.relativeMousePos.innerRef(el);
      _this.props.innerRef(el);
    }, _this.getSelectorByType = function (type) {
      return _this.props.selectors.find(function (s) {
        return s.TYPE === type;
      });
    }, _this.getTopAnnotationAt = function (x, y) {
      var annotations = _this.props.annotations;
      var _this2 = _this,
          container = _this2.container,
          getSelectorByType = _this2.getSelectorByType;


      if (!container) return;

      var intersections = annotations.map(function (annotation) {
        var geometry = annotation.geometry;

        var selector = getSelectorByType(geometry.type);

        return selector.intersects({ x: x, y: y }, geometry, container) ? annotation : false;
      }).filter(function (a) {
        return !!a;
      }).sort(function (a, b) {
        var aSelector = getSelectorByType(a.geometry.type);
        var bSelector = getSelectorByType(b.geometry.type);

        return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container);
      });

      return intersections[0];
    }, _this.onTargetMouseMove = function (e) {
      _this.props.relativeMousePos.onMouseMove(e);
      _this.onMouseMove(e);
    }, _this.onTargetTouchMove = function (e) {
      _this.props.relativeMousePos.onTouchMove(e);
      _this.onTouchMove(e);
    }, _this.onTargetMouseLeave = function (e) {
      _this.props.relativeMousePos.onMouseLeave(e);
    }, _this.onTargetTouchLeave = function (e) {
      _this.props.relativeMousePos.onTouchLeave(e);
    }, _this.onMouseUp = function (e) {
      return _this.callSelectorMethod('onMouseUp', e);
    }, _this.onMouseDown = function (e) {
      return _this.callSelectorMethod('onMouseDown', e);
    }, _this.onMouseMove = function (e) {
      return _this.callSelectorMethod('onMouseMove', e);
    }, _this.onTouchStart = function (e) {
      return _this.callSelectorMethod("onTouchStart", e);
    }, _this.onTouchEnd = function (e) {
      return _this.callSelectorMethod("onTouchEnd", e);
    }, _this.onTouchMove = function (e) {
      return _this.callSelectorMethod("onTouchMove", e);
    }, _this.onClick = function (e) {
      var onClickCheckFunc = _this.props.onClickCheckFunc;


      if (!onClickCheckFunc || onClickCheckFunc(e)) {
        return _this.callSelectorMethod('onClick', e);
      }
      return;
    }, _this.onSelectionComplete = function () {
      return _this.callSelectorMethod('onSelectionComplete');
    }, _this.onSelectionClear = function () {
      return _this.callSelectorMethod('onSelectionClear');
    }, _this.onSelectionUndo = function () {
      return _this.callSelectorMethod('onSelectionUndo');
    }, _this.onSubmit = function () {
      _this.props.onSubmit(_this.props.value);
    }, _this.callSelectorMethod = function (methodName, e) {
      if (_this.props.disableAnnotation || _this.props.movingMode) {
        return;
      }

      if (!!_this.props[methodName]) {
        _this.props[methodName](e);
      } else {
        var selector = _this.getSelectorByType(_this.props.type);
        if (selector && selector.methods[methodName]) {
          var value = selector.methods[methodName](_this.props.value, e);

          if (typeof value === 'undefined') {
            if (process.env.NODE_ENV !== 'production') {
              console.error('\n              ' + methodName + ' of selector type ' + _this.props.type + ' returned undefined.\n              Make sure to explicitly return the previous state\n            ');
            }
          } else {
            _this.props.onChange(value);
          }
        }
      }
    }, _this.shouldAnnotationBeActive = function (annotation, top) {
      if (_this.props.activeAnnotations) {
        var isActive = !!_this.props.activeAnnotations.find(function (active) {
          return _this.props.activeAnnotationComparator(annotation, active);
        });

        return isActive || top === annotation;
      } else {
        return top === annotation;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Annotation.prototype.componentDidMount = function componentDidMount() {
    if (this.props.allowTouch) {
      this.addTargetTouchEventListeners();
    }
    window.addEventListener("resize", this.forceUpdateComponent);
  };

  Annotation.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.allowTouch !== prevProps.allowTouch) {
      if (this.props.allowTouch) {
        this.addTargetTouchEventListeners();
      } else {
        this.removeTargetTouchEventListeners();
      }
    }

    if (prevProps.imageZoomAmount !== this.props.imageZoomAmount) {
      this.forceUpdateComponent();
    }
  };

  Annotation.prototype.render = function render() {
    var _this3 = this;

    var props = this.props;
    var isMouseHovering = props.isMouseHovering,
        disableZoom = props.disableZoom,
        movingMode = props.movingMode,
        renderHighlight = props.renderHighlight,
        renderContent = props.renderContent,
        renderSelector = props.renderSelector,
        renderEditor = props.renderEditor,
        renderOverlay = props.renderOverlay,
        allowTouch = props.allowTouch,
        renderPolygonControls = props.renderPolygonControls;


    var topAnnotationAtMouse = this.getTopAnnotationAt(this.props.relativeMousePos.x, this.props.relativeMousePos.y);

    return _react2.default.createElement(
      _reactZoomPanPinch.TransformWrapper,
      {
        defaultScale: 1,
        defaultPositionX: 200,
        defaultPositionY: 100,
        options: {
          disabled: disableZoom
        },
        pan: { lockAxisX: !movingMode, lockAxisY: !movingMode }
      },
      function (_ref) {
        var scale = _ref.scale,
            positionX = _ref.positionX,
            positionY = _ref.positionY,
            setPositionX = _ref.setPositionX,
            setPositionY = _ref.setPositionY,
            rest = _objectWithoutProperties(_ref, ['scale', 'positionX', 'positionY', 'setPositionX', 'setPositionY']);

        var pointerEventNone = scale === 1 && (positionX !== 0 || positionY !== 0);
        if (pointerEventNone) {
          setPositionX(0, 0);
          setPositionY(0, 0);
        }

        return _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(
            Container,
            {
              style: props.style,
              innerRef: isMouseHovering.innerRef,
              onMouseLeave: _this3.onTargetMouseLeave,
              onTouchCancel: _this3.onTargetTouchLeave,
              allowTouch: allowTouch
            },
            _react2.default.createElement(
              _reactZoomPanPinch.TransformComponent,
              null,
              _react2.default.createElement(Img, {
                className: props.className,
                style: props.style,
                alt: props.alt,
                src: props.src,
                draggable: false,
                innerRef: _this3.setInnerRef
              }),
              _react2.default.createElement(
                Items,
                null,
                props.annotations.map(function (annotation) {
                  return renderHighlight({
                    key: annotation.data.id,
                    annotation: annotation,
                    active: _this3.shouldAnnotationBeActive(annotation, topAnnotationAtMouse)
                  });
                }),
                !props.disableSelector && props.value && props.value.geometry && renderSelector({
                  annotation: props.value
                })
              ),
              _react2.default.createElement(Target, {
                innerRef: _this3.targetRef,
                onClick: _this3.onClick,
                onMouseUp: _this3.onMouseUp,
                onMouseDown: _this3.onMouseDown,
                onMouseMove: _this3.onTargetMouseMove
              })
            ),
            !props.disableOverlay && renderOverlay({
              type: props.type,
              annotation: props.value
            }),
            _react2.default.createElement(
              'div',
              { style: { width: scale * 100 + '%', height: scale * 100 + '%', pointerEvents: 'none', position: 'absolute', left: positionX, top: positionY } },
              _react2.default.createElement(
                'div',
                { style: { pointerEvents: 'all' } },
                props.annotations.map(function (annotation) {
                  return _this3.shouldAnnotationBeActive(annotation, topAnnotationAtMouse) && renderContent({
                    key: annotation.data.id,
                    annotation: annotation,
                    mouse: _this3.props.relativeMousePos,
                    positionX: positionX, positionY: positionY, scale: scale
                  });
                }),
                !props.disableEditor && props.value && props.value.selection && props.value.selection.showEditor && renderEditor({
                  annotation: props.value,
                  onChange: props.onChange,
                  onSubmit: _this3.onSubmit
                }),
                props.value && props.value.geometry && _selectors.PolygonSelector.TYPE === props.value.geometry.type && (!props.value.selection || !props.value.selection.showEditor) && renderPolygonControls({
                  annotation: props.value,
                  onSelectionComplete: _this3.onSelectionComplete,
                  onSelectionClear: _this3.onSelectionClear,
                  onSelectionUndo: _this3.onSelectionUndo,
                  imageZoomAmount: props.imageZoomAmount
                })
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              props.children
            )
          )
        );
      }
    );
  };

  return Annotation;
}(_react.Component), _class.propTypes = {
  innerRef: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.object,
  movingMode: _propTypes2.default.bool,
  // This prop represents how zoom the image is (default: 1)
  imageZoomAmount: _propTypes2.default.number,
  // This function is run before the onClick callback is executed (onClick
  // is only called if onClickCheckFunc resolve to true or doesn't exist)
  onClickCheckFunc: _propTypes2.default.func,
  // For Polygon Selector
  onSelectionComplete: _propTypes2.default.func,
  onSelectionClear: _propTypes2.default.func,
  onSelectionUndo: _propTypes2.default.func,

  annotations: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    type: _propTypes2.default.string
  })).isRequired,
  type: _propTypes2.default.string,
  selectors: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    TYPE: _propTypes2.default.string,
    intersects: _propTypes2.default.func.isRequired,
    area: _propTypes2.default.func.isRequired,
    methods: _propTypes2.default.object.isRequired
  })).isRequired,

  value: _propTypes2.default.shape({
    selection: _propTypes2.default.object,
    geometry: _propTypes2.default.shape({
      type: _propTypes2.default.string.isRequired
    }),
    data: _propTypes2.default.object
  }),
  onChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,

  activeAnnotationComparator: _propTypes2.default.func,
  activeAnnotations: _propTypes2.default.arrayOf(_propTypes2.default.any),

  disableAnnotation: _propTypes2.default.bool,
  disableSelector: _propTypes2.default.bool,
  renderSelector: _propTypes2.default.func,
  disableEditor: _propTypes2.default.bool,
  renderEditor: _propTypes2.default.func,

  renderHighlight: _propTypes2.default.func.isRequired,
  renderContent: _propTypes2.default.func.isRequired,

  disableZoom: _propTypes2.default.bool,
  disableOverlay: _propTypes2.default.bool,
  renderOverlay: _propTypes2.default.func.isRequired,
  allowTouch: _propTypes2.default.bool,
  renderPolygonControls: _propTypes2.default.func.isRequired
}, _class.defaultProps = _defaultProps2.default, _temp2));
module.exports = exports['default'];