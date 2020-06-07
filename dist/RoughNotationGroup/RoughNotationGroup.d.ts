/// <reference types="react" />
import { Annotation, RoughNotationGroupProps } from "./types";
declare function RoughNotationGroup({ children, show }: RoughNotationGroupProps): JSX.Element;
export declare function useGroupContext(annotation: Annotation, order: number | undefined): undefined;
export default RoughNotationGroup;
