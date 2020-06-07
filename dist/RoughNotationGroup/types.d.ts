export interface RoughNotationGroupProps {
    children: any;
    show?: boolean;
}
export declare type Annotation = {
    current: any;
};
export declare type State = {
    annotations: Array<Payload>;
};
export declare type Payload = {
    annotation: Annotation;
    order: number | undefined;
};
export declare type Action = {
    type: "ADD";
    payload: Payload;
};
export declare type Dispatch = (action: Action) => void;
