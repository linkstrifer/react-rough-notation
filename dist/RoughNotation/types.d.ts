export declare type types = "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket";
declare type brackets = "left" | "right" | "top" | "bottom";
interface RoughNotationProperties {
    animate?: boolean;
    animationDelay?: number;
    animationDuration?: number;
    brackets?: brackets | brackets[];
    color?: string;
    iterations?: number;
    multiline?: boolean;
    order?: number | string;
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
export {};
