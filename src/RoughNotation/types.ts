export type types =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off";

interface RoughNotationProperties {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  color?: string;
  iterations?: number;
  padding?: number | [number, number, number, number] | [number, number];
  strokeWidth?: number;
}

export interface RoughNotationProps extends RoughNotationProperties {
  children: any;
  customElement?: string;
  getAnnotationObject?: Function;
  show?: boolean;
  type: types;
}

export interface Annotation extends RoughNotationProperties {
  hide?: Function;
  remove?: Function;
  show?: Function;
}
