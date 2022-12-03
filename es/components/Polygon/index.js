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
    "\n  background: #14ff4f;\n  border-radius: 1px;\n  width: 2px;\n  height: 2px;\n  margin-left: -1px;\n  margin-top: -1px;\n  position: absolute;\n",
  ],
  [
    "\n  background: #14ff4f;\n  border-radius: 1px;\n  width: 2px;\n  height: 2px;\n  margin-left: -1px;\n  margin-top: -1px;\n  position: absolute;\n",
  ]
);

function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}

import React from "react";
import LineTo from "react-lineto";
import styled from "styled-components";
import "./index.css";

var PointDot = styled.div(_templateObject);

function edgesFromPoints(points) {
  if (!points || points.length < 3) return [];

  var edges = [];
  for (var i = 0; i < points.length; ++i) {
    if (i + 1 === points.length) {
      edges.push(
        Math.hypot(points[0].x - points[i].x, points[0].y - points[i].y)
      );
    } else {
      edges.push(
        Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y)
      );
    }
  }

  return edges;
}

function Polygon(props) {
  var geometry = props.annotation.geometry;

  if (!geometry || !geometry.points || geometry.points.length === 0)
    return null;

  return React.createElement(
    "div",
    {
      className: "linesContainer " + props.className,
      style: _extends(
        {
          width: "100%",
          height: "100%",
        },
        props.style
      ),
    },
    geometry.points.length >= 3 &&
      geometry.points.map(function (item, i) {
        // Iterate over points to create the edge lines
        var prevItem = void 0;
        if (i === 0) {
          // First point (links from last to first)
          prevItem = geometry.points[geometry.points.length - 1];
        } else {
          prevItem = geometry.points[i - 1];
        }
        return (
          // Note that each LineTo element must have a unique key (unique relative to the connected points)
          React.createElement(LineTo, {
            key:
              i +
              "_" +
              item.x +
              "_" +
              item.y +
              "_" +
              prevItem.x +
              "_" +
              prevItem.y,
            from: "linesContainer",
            fromAnchor: item.x + "% " + item.y + "%",
            to: "linesContainer",
            toAnchor: prevItem.x + "% " + prevItem.y + "%",
            borderColor: "#14ff4f",
            borderStyle: "solid",
            borderWidth: 3,
            className: !props.active
              ? "annotation_label Polygon-LineTo"
              : "annotation_label Polygon-LineToActive",
            id: `annotation_label_${props.annotation.data?.id}`,
          })
        );
      }),
    geometry.points.map(function (item, i) {
      // Iterate over points to points
      return (
        // Note that each LineTo element must have a unique key (unique relative to the point)
        React.createElement(PointDot, {
          key: i + "_" + item.x + "_" + item.y,
          style: {
            left: item.x + "% ",
            top: item.y + "%",
          },
        })
      );
    })
  );
}

Polygon.defaultProps = {
  className: "",
  style: {},
};

export default Polygon;
