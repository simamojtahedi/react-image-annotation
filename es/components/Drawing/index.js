import React from "react";

function Drawing(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return React.createElement(
    "svg",
    {
      height: "100%",
      width: "100%",
      viewBox: "0 0 " + geometry.size.width + " " + geometry.size.height,
      className: props.className,
      style: { position: "absolute" },
    },
    geometry.lines.map(function (l, i) {
      return React.createElement("polyline", {
        key: "p-" + i,
        fill: "none",
        stroke: "black",
        strokeWidth: "4px",
        className: `annotation_label`,
        points: l
          .map(function (e) {
            return e.x + "," + e.y;
          })
          .join(" "),
      });
    }),
    React.createElement("polyline", {
      fill: "none",
      stroke: "black",
      strokeWidth: "4px",
      points: geometry.points
        .map(function (e) {
          return e.x + "," + e.y;
        })
        .join(" "),
    })
  );
}

Drawing.defaultProps = {
  className: "",
  style: {},
};

export default Drawing;
