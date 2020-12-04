import React from 'react'
import { createContext, useContext, useEffect, useReducer, useRef } from 'react'

import { annotationGroup } from 'rough-notation'

import {
  Action,
  Dispatch,
  Payload,
  RoughNotationGroupProps,
  State,
} from './types'

import { Annotation } from '../RoughNotation/types'

const GroupContext = createContext<State | null>(null)
const GroupDispatchContext = createContext<Dispatch | null>(null)

const initialState: State = {
  annotations: [],
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case 'ADD': {
      const annotations = [...state.annotations, payload]

      const annotationsToSort = annotations.reduce(
        (toSort, annotation) => {
          const newAnnotations: {
            withOrder: Payload[]
            withoutOrder: Payload[]
          } = {
            ...toSort,
          }

          if (typeof annotation.order === 'number') {
            newAnnotations.withOrder = [
              ...newAnnotations.withOrder,
              annotation,
            ].sort((a, b) => a.order! - b.order!)
          } else {
            newAnnotations.withoutOrder = [
              ...newAnnotations.withoutOrder,
              annotation,
            ]
          }

          return newAnnotations
        },
        {
          withOrder: [],
          withoutOrder: [],
        }
      )

      return {
        ...state,
        annotations: [
          ...annotationsToSort.withOrder,
          ...annotationsToSort.withoutOrder,
        ],
      }
    }
    default:
      return state
  }
}

const RoughNotationGroup: React.FunctionComponent<RoughNotationGroupProps> = ({
  children,
  show,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const group = annotationGroup(
      state.annotations.map(({ annotation }): Annotation => annotation.current!)
    )

    if (show) {
      group.show()
    } else {
      group.hide()
    }
  }, [show, state])

  return (
    <GroupContext.Provider value={state}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupContext.Provider>
  )
}

export const useGroupContext = (
  annotation: React.RefObject<Annotation | undefined>,
  order: number | undefined
): void => {
  const context = useContext(GroupContext)
  const dispatch = useContext(GroupDispatchContext)
  const initialProps = useRef({ annotation, context, dispatch, order })

  useEffect(() => {
    const { annotation, context, dispatch, order } = initialProps.current

    if (!context) {
      return undefined
    }

    if (dispatch) {
      dispatch({
        type: 'ADD',
        payload: { annotation, order },
      })
    }

    return
  }, [])
}

export default RoughNotationGroup
