import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

import { annotationGroup } from "rough-notation";

import {
  Action,
  Annotation,
  Dispatch,
  Payload,
  RoughNotationGroupProps,
  State,
} from "./types";

const GroupContext = createContext<State | null>(null);
const GroupDispatchContext = createContext<Dispatch | null>(null);

const initialState: State = {
  annotations: [],
};

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "ADD":
      let annotations = [...state.annotations, payload];

      const annotationsToSort = annotations.reduce(
        (toSort, annotation) => {
          const newAnnotations: {
            withOrder: Payload[];
            withoutOrder: Payload[];
          } = {
            ...toSort,
          };

          if (typeof annotation.order === "number") {
            newAnnotations.withOrder = [
              ...newAnnotations.withOrder,
              annotation,
            ].sort((a, b) => a.order! - b.order!);
          } else {
            newAnnotations.withoutOrder = [
              ...newAnnotations.withoutOrder,
              annotation,
            ];
          }

          return newAnnotations;
        },
        {
          withOrder: [],
          withoutOrder: [],
        }
      );

      return {
        ...state,
        annotations: [
          ...annotationsToSort.withOrder,
          ...annotationsToSort.withoutOrder,
        ],
      };
    default:
      return state;
  }
}

function RoughNotationGroup({ children, show }: RoughNotationGroupProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const group = annotationGroup(
      state.annotations.map(({ annotation }) => annotation.current)
    );

    if (show) {
      group.show();
    } else {
      group.hide();
    }
  }, [show, state]);

  return (
    <GroupContext.Provider value={state}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupContext.Provider>
  );
}

export function useGroupContext(
  annotation: Annotation,
  order: number | undefined
) {
  const context = useContext(GroupContext);
  const dispatch = useContext(GroupDispatchContext);

  if (!context) {
    return undefined;
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "ADD",
        payload: { annotation, order },
      });
    }
  }, []);

  return;
}

export default RoughNotationGroup;
