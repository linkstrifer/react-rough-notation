import React from "react";
import { useRef, useEffect } from "react";

import { annotate } from "rough-notation/lib/rough-notation";

export type types =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off";

export interface RoughNotationProps {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  children: any;
  color?: string;
  customElement?: string;
  getAnnotationObject?: Function;
  padding?: number;
  show?: boolean;
  strokeWidth?: number;
  type: types;
}

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
  const configuration = {
    animate,
    animationDelay,
    animationDuration,
    color,
    padding,
    strokeWidth,
    type,
  };

  useEffect(() => {
    annotation.current = annotate(element.current, configuration);

    if (getAnnotationObject) {
      getAnnotationObject(annotation.current);
    }

    return () => {
      annotation.current.remove();
    };
  }, [configuration, getAnnotationObject]);

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
