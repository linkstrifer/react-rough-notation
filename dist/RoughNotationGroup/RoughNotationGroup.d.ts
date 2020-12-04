import React from 'react';
import { RoughNotationGroupProps } from './types';
import { Annotation } from '../RoughNotation/types';
declare const RoughNotationGroup: React.FunctionComponent<RoughNotationGroupProps>;
export declare const useGroupContext: (annotation: React.RefObject<Annotation | undefined>, order: number | undefined) => void;
export default RoughNotationGroup;
