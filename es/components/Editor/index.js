var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _templateObject = _taggedTemplateLiteralLoose(
    [
      "\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n",
    ],
    [
      "\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n",
    ]
  ),
  _templateObject2 = _taggedTemplateLiteralLoose(
    [
      "\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  margin-top: 16px;\n  transform-origin: top left;\n  animation: ",
      " 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  overflow: hidden;\n  margin-left: -50%;\n  margin-right: 50%\n",
    ],
    [
      "\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  margin-top: 16px;\n  transform-origin: top left;\n  animation: ",
      " 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  overflow: hidden;\n  margin-left: -50%;\n  margin-right: 50%\n",
    ]
  );

function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}

import React from "react";
import styled, { keyframes } from "styled-components";
import TextEditor from "../TextEditor";
import RadioButtonEditor from "../RadioButtonEditor";
import {
  getHorizontallyCentralPoint,
  getVerticallyLowestPoint,
} from "../../utils/pointsUtils";
import { PolygonSelector } from "../../selectors";

var fadeInScale = keyframes(_templateObject);

var Container = styled.div(_templateObject2, fadeInScale);

function Editor(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return React.createElement(
    "div",
    {
      className: props.className,
      style: _extends(
        {
          position: "absolute",
          left:
            geometry.type === PolygonSelector.TYPE
              ? getHorizontallyCentralPoint(geometry.points) + "%"
              : geometry.x + "%",
          top:
            geometry.type === PolygonSelector.TYPE
              ? getVerticallyLowestPoint(geometry.points) + "%"
              : geometry.y + geometry.height + "%",
          zIndex: 999,
        },
        props.style
      ),
    },
    React.createElement(
      Container,
      null,
      React.createElement(TextEditor, {
        onChange: function onChange(e) {
          return props.onChange(
            _extends({}, props.annotation, {
              data: _extends({}, props.annotation.data, {
                text: e.target.value,
              }),
            })
          );
        },
        onSubmit: props.onSubmit,
        value: props.annotation.data && props.annotation.data.text,
      })
    )
  );
}

Editor.defaultProps = {
  className: "",
  style: {},
};

export default Editor;
