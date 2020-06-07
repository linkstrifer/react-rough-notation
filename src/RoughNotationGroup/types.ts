export interface RoughNotationGroupProps {
  children: any;
  show?: boolean;
}

export type Annotation = {
  current: any;
};

export type State = {
  annotations: Array<Payload>;
};

export type Payload = {
  annotation: Annotation;
  order: number | undefined;
};

export type Action = {
  type: "ADD";
  payload: Payload;
};

export type Dispatch = (action: Action) => void;
