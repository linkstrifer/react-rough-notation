import React from 'react';
import { Annotation } from '../RoughNotation/types';
export interface RoughNotationGroupProps {
    children: React.ReactNode;
    show?: boolean;
}
export declare type State = {
    annotations: Array<Payload>;
};
export declare type Payload = {
    annotation: React.RefObject<Annotation | undefined>;
    order: number | undefined;
};
export declare type Action = {
    type: 'ADD';
    payload: Payload;
};
export declare type Dispatch = (action: Action) => void;
