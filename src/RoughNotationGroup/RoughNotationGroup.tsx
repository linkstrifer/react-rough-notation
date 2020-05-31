import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

import { annotationGroup } from "rough-notation/lib/rough-notation";

import {
  RoughNotationGroupProps,
  State,
  Action,
  Dispatch,
  Annotation,
} from "./types";

const GroupContext = createContext<State | null>(null);
const GroupDispatchContext = createContext<Dispatch | null>(null);

const initialState: State = {
  annotations: [],
};

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "ADD":
      return {
        ...state,
        annotations: [...state.annotations, payload],
      };
    default:
      return state;
  }
}

function RoughNotationGroup({ children, show }: RoughNotationGroupProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const group = annotationGroup(
      state.annotations.map(({ current }) => current)
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

export function useGroupContext(annotation: Annotation) {
  const context = useContext(GroupContext);
  const dispatch = useContext(GroupDispatchContext);

  if (!context) {
    return undefined;
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "ADD",
        payload: annotation,
      });
    }
  }, []);

  return;
}

export default RoughNotationGroup;
