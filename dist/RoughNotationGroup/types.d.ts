export interface RoughNotationGroupProps {
    children: any;
    show?: boolean;
}
export declare type Annotation = {
    current: any;
};
export declare type State = {
    annotations: Array<Annotation>;
};
export declare type Action = {
    type: "ADD";
    payload: Annotation;
};
export declare type Dispatch = (action: Action) => void;
