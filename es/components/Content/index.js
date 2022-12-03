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
    "\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  padding: 8px 16px;\n  margin-top: 8px;\n  margin-left: -50%;\n  margin-right: 50%;\n  color: #363636!important;\n",
  ],
  [
    "\n  background: white;\n  border-radius: 2px;\n  box-shadow:\n    0px 1px 5px 0px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 3px 1px -2px rgba(0, 0, 0, 0.12);\n  padding: 8px 16px;\n  margin-top: 8px;\n  margin-left: -50%;\n  margin-right: 50%;\n  color: #363636!important;\n",
  ]
);

function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}

import React from "react";
import styled from "styled-components";
import { PolygonSelector } from "../../selectors";
import {
  getHorizontallyCentralPoint,
  getVerticallyLowestPoint,
} from "../../utils/pointsUtils";

var Container = styled.div(_templateObject);

function Content(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  var zoomBetweenZeroAndOne = Math.abs((props.imageZoomAmount - 1) / 4 - 1);

  return React.createElement(
    "div",
    {
      style: _extends(
        {
          position: "absolute",
          // left: `${props.mouse.x}%`,
          // top: `${props.mouse.y}%`,
          // zIndex: 999,

          left: geometry.type === PolygonSelector.TYPE ? getHorizontallyCentralPoint(geometry.points) + "%" : geometry.x + "%",
          top: geometry.type === PolygonSelector.TYPE ? getVerticallyLowestPoint(geometry.points) + "%" : geometry.y + geometry.height + "%",
          zIndex: 9999,
          pointerEvents: "none",
        },
        props.style
      ),
      className: `my_label ${props.className}`,
      geometry: geometry,
    },
    React.createElement(
      Container,
      {
        style: {
          fontSize: 1 / 5 + zoomBetweenZeroAndOne * (4 / 5) + "rem",
          padding:
            (1 / 5) * 8 +
            (4 / 5) * 8 * zoomBetweenZeroAndOne +
            "px " +
            ((1 / 5) * 16 + (4 / 5) * 16 * zoomBetweenZeroAndOne) +
            "px",
        },
      },
      props.annotation.data && props.annotation.data.text
    )
  );
}

Content.defaultProps = {
  style: {},
  className: "",
};

export default Content;
