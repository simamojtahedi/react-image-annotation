import React from "react";

import Point from "./Point";
import Editor from "./Editor";
import PolygonControls from "./PolygonControls";
import FancyRectangle from "./FancyRectangle";
import Rectangle from "./Rectangle";
import Oval from "./Oval";
import Polygon from "./Polygon";
import Content from "./Content";
import Overlay from "./Overlay";
import Drawing from "./Drawing";
import Highlighter from "./Highlighter";

import {
  RectangleSelector,
  PointSelector,
  OvalSelector,
  DrawingSelector,
  HighlighterSelector,
  PolygonSelector,
} from "../selectors";

export default {
  innerRef: function innerRef() {},
  onChange: function onChange() {},
  onSubmit: function onSubmit() {},
  type: RectangleSelector.TYPE,
  selectors: [
    RectangleSelector,
    PointSelector,
    OvalSelector,
    DrawingSelector,
    HighlighterSelector,
    PolygonSelector,
  ],
  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,
  imageZoomAmount: 1,
  activeAnnotationComparator: function activeAnnotationComparator(a, b) {
    return a === b;
  },
  renderSelector: function renderSelector(_ref) {
    var annotation = _ref.annotation,
      options = _ref.options;

    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return React.createElement(FancyRectangle, {
          annotation: annotation,
        });
      case PointSelector.TYPE:
        return React.createElement(Point, {
          annotation: annotation,
        });
      case OvalSelector.TYPE:
        return React.createElement(Oval, {
          annotation: annotation,
        });
      case DrawingSelector.TYPE:
        return React.createElement(Drawing, {
          annotation: annotation,
        });
      case HighlighterSelector.TYPE:
        return React.createElement(Highlighter, {
          annotation: annotation,
        });
      case PolygonSelector.TYPE:
        return React.createElement(Polygon, {
          annotation: annotation,
        });
      default:
        return null;
    }
  },
  renderEditor: function renderEditor(_ref2) {
    var annotation = _ref2.annotation,
      onChange = _ref2.onChange,
      onSubmit = _ref2.onSubmit,
      imageZoomAmount = _ref2.imageZoomAmount;
    return React.createElement(Editor, {
      annotation: annotation,
      onChange: onChange,
      onSubmit: onSubmit,
      imageZoomAmount: imageZoomAmount,
    });
  },
  renderPolygonControls: function renderPolygonControls(_ref3) {
    var annotation = _ref3.annotation,
      onSelectionComplete = _ref3.onSelectionComplete,
      onSelectionClear = _ref3.onSelectionClear,
      onSelectionUndo = _ref3.onSelectionUndo,
      imageZoomAmount = _ref3.imageZoomAmount;
    return React.createElement(PolygonControls, {
      annotation: annotation,
      onSelectionComplete: onSelectionComplete,
      onSelectionClear: onSelectionClear,
      onSelectionUndo: onSelectionUndo,
      imageZoomAmount: imageZoomAmount,
    });
  },
  renderHighlight: function renderHighlight(_ref4) {
    var key = _ref4.key,
      annotation = _ref4.annotation,
      active = _ref4.active;

    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return React.createElement(Rectangle, {
          key: key,
          annotation: annotation,
          active: active,
        });
      case PointSelector.TYPE:
        return React.createElement(Point, {
          key: key,
          annotation: annotation,
          active: active,
        });
      case OvalSelector.TYPE:
        return React.createElement(Oval, {
          key: key,
          annotation: annotation,
          active: active,
        });
      case DrawingSelector.TYPE:
        return React.createElement(Drawing, {
          key: key,
          annotation: annotation,
          active: active,
        });
      case HighlighterSelector.TYPE:
        return React.createElement(Highlighter, {
          key: key,
          annotation: annotation,
          active: active,
        });
      case PolygonSelector.TYPE:
        return React.createElement(Polygon, {
          key: key,
          annotation: annotation,
          active: active,
        });
      default:
        return null;
    }
  },
  renderContent: function renderContent(_ref5) {
    var key = _ref5.key,
      annotation = _ref5.annotation,
      mouse = _ref5.mouse,
      positionX = _ref5.positionX,
      positionY = _ref5.positionY,
      scale = _ref5.scale,
      imageZoomAmount = _ref5.imageZoomAmount;
    return React.createElement(Content, {
      key: key,
      annotation: annotation,
      mouse: mouse,
      positionX: positionX,
      positionY: positionY,
      scale: scale,
      imageZoomAmount: imageZoomAmount,
    });
  },
  renderOverlay: function renderOverlay(_ref6) {
    var type = _ref6.type,
      annotation = _ref6.annotation;

    switch (type) {
      case PointSelector.TYPE:
        return React.createElement(Overlay, null, "");
      case PolygonSelector.TYPE:
        return React.createElement(Overlay, null, "");
      default:
        return React.createElement(Overlay, null, "");
    }
  },
};
