import React from "react";
import { useRef, useEffect } from "react";

// import { annotate } from "rough-notation";
import { annotate } from "../../node_modules/rough-notation/lib/rough-notation";

type types =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off";

export default function RoughNotation({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  children,
  color,
  getAnnotationObject,
  padding = 5,
  show = false,
  strokeWidth = 1,
  type,
}: {
  animate: boolean;
  animationDelay: number;
  animationDuration: number;
  children: any;
  color?: string;
  getAnnotationObject: Function;
  padding: number;
  show: boolean;
  strokeWidth: number;
  type: types;
}) {
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

  return <span ref={element}>{children}</span>;
}
