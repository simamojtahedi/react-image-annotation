import React from "react";

function Highlighter(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return React.createElement(
    "svg",
    {
      height: "100%",
      width: "100%",
      viewBox: "0 0 " + geometry.size.width + " " + geometry.size.height,
      className: props.className,
      style: { 
        position: "absolute",
        top: 0
      },
    },
    React.createElement("polyline", {
      className: `annotation_label`,
      id: `annotation_label_${props.annotation.data?.id}`,
      fill: "rgba(0,0,0,.1)",
      stroke: "#ffe000a6",
      strokeWidth: "8px",
      points: geometry.points
        .map(function (e) {
          return e.x + "," + e.y;
        })
        .join(" "),
    })
  );
}

Highlighter.defaultProps = {
  className: "",
  style: {},
};

export default Highlighter;
