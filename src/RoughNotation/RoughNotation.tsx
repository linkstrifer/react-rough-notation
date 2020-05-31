import React from "react";
import { useRef, useEffect } from "react";

import { annotate } from "rough-notation/lib/rough-notation";

import { useGroupContext } from "../RoughNotationGroup/RoughNotationGroup";

import { RoughNotationProps } from "./types";

function RoughNotation({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  children,
  color,
  customElement = "span",
  getAnnotationObject,
  padding = 5,
  show = false,
  strokeWidth = 1,
  type,
  ...rest
}: RoughNotationProps) {
  const element = useRef<HTMLElement>(document.createElement("span"));
  const annotation = useRef({
    remove: () => {},
    show: () => {},
    hide: () => {},
  });

  useGroupContext(annotation);

  useEffect(() => {
    annotation.current = annotate(element.current, {
      animate,
      animationDelay,
      animationDuration,
      color,
      padding,
      strokeWidth,
      type,
    });

    if (getAnnotationObject) {
      getAnnotationObject(annotation.current);
    }

    return () => {
      annotation.current.remove();
    };
  }, [
    animate,
    animationDelay,
    animationDuration,
    color,
    padding,
    strokeWidth,
    type,
    getAnnotationObject,
  ]);

  useEffect(() => {
    if (show) {
      annotation.current.show();
    } else {
      annotation.current.hide();
    }
  }, [show, annotation]);

  return React.createElement(
    customElement,
    {
      ref: element,
      ...rest,
    },
    children
  );
}

export default RoughNotation;
