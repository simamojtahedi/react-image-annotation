var _templateObject = _taggedTemplateLiteralLoose(
  [
    "\n  border: solid 3px #14ff4f;\n  border-radius: 50%;\n  box-sizing: border-box;\n  box-shadow:\n    0 0 0 1px rgba(0,0,0,0.3),\n    0 0 0 2px rgba(0,0,0,0.2),\n    0 5px 4px rgba(0,0,0,0.4);\n  height: 16px;\n  position: absolute;\n  transform: translate3d(-50%, -50%, 0);\n  width: 16px;\n",
  ],
  [
    "\n  border: solid 3px #14ff4f;\n  border-radius: 50%;\n  box-sizing: border-box;\n  box-shadow:\n    0 0 0 1px rgba(0,0,0,0.3),\n    0 0 0 2px rgba(0,0,0,0.2),\n    0 5px 4px rgba(0,0,0,0.4);\n  height: 16px;\n  position: absolute;\n  transform: translate3d(-50%, -50%, 0);\n  width: 16px;\n",
  ]
);

function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}

import React from "react";
import styled from "styled-components";

var Container = styled.div(_templateObject);

function Point(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return React.createElement(Container, {
    className: `${props.className} annotation_label`,
    id: `annotation_label_${props.annotation.data?.id}`,
    style: {
      top: geometry.y + "%",
      left: geometry.x + "%",
    },
  });
}

export default Point;
