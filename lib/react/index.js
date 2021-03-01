import React, { useRef } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

if (!window.__skeleton__x__lib) {
  console.warn('未引入SkeletonX js lib');
}

var SkeletonContainer = function SkeletonContainer(props) {
  if (window.__skeleton__x__lib && props.showSkeleton) {
    var innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, props.moduleId);

    var size = window.__skeleton__x__lib.getModuleSize(undefined, props.moduleId);

    return /*#__PURE__*/React.createElement("div", {
      className: props.className,
      style: _objectSpread2(_objectSpread2({}, props.style), {}, {
        padding: 0
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread2({
        position: 'relative',
        background: '#fff'
      }, size),
      dangerouslySetInnerHTML: {
        __html: innerHtml
      }
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: props.style,
    "skeletonx-module-id": props.moduleId
  }, props.children);
};
var SkeletonSupspense = function SkeletonSupspense(props) {
  var moduleId = props.moduleId,
      style = props.style;
  var rootRef = useRef(null);
  if (!window.__skeleton__x__lib) return null;

  var innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, moduleId);

  var size = window.__skeleton__x__lib.getModuleSize(undefined, moduleId);

  if (!innerHtml) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread2(_objectSpread2({
      position: 'relative'
    }, size), style),
    ref: rootRef,
    dangerouslySetInnerHTML: {
      __html: innerHtml
    }
  });
};

export { SkeletonContainer, SkeletonSupspense };
