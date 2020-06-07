import React from "react";
import { useRef, useEffect } from "react";

import { annotate } from "rough-notation";

import { useGroupContext } from "../RoughNotationGroup/RoughNotationGroup";

import { RoughNotationProps, Annotation } from "./types";

function RoughNotation({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  children,
  color,
  customElement = "span",
  getAnnotationObject,
  iterations = 2,
  order,
  padding = 5,
  show = false,
  strokeWidth = 1,
  type,
  ...rest
}: RoughNotationProps) {
  const element = useRef<HTMLElement>(document.createElement("span"));
  const annotation = useRef<Annotation>();

  useGroupContext(
    annotation,
    typeof order === "string" ? parseInt(order) : order
  );

  useEffect(() => {
    annotation.current = annotate(element.current, {
      animate,
      animationDelay,
      animationDuration,
      color,
      iterations,
      padding,
      strokeWidth,
      type,
    });

    if (getAnnotationObject) {
      getAnnotationObject(annotation.current);
    }

    return () => {
      annotation.current?.remove?.();
    };
  }, []);

  useEffect(() => {
    if (show) {
      annotation.current?.show?.();
    } else {
      annotation.current?.hide?.();
    }
  }, [annotation, show]);

  useEffect(() => {
    if (annotation.current) {
      annotation.current.animate = animate;
      annotation.current.animationDuration = animationDuration;
      annotation.current.color = color;
      annotation.current.strokeWidth = strokeWidth;
      annotation.current.padding = padding;
    }
  }, [
    annotation,
    animate,
    animationDelay,
    animationDuration,
    color,
    strokeWidth,
    padding,
  ]);

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
