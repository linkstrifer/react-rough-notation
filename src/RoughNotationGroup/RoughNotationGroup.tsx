import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'

import {
  Action,
  Dispatch,
  Payload,
  RoughNotationGroupProps,
  State,
} from './types'

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
    let nextTimeout = 0

    state.annotations.forEach(({ annotation }) => {
      if (show) {
        setTimeout(() => {
          annotation.show()
        }, nextTimeout)

        nextTimeout += annotation.getAnnotation().animationDuration || 0
      } else {
        annotation.hide()
      }
    })
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
  annotation: Payload['annotation'],
  order: Payload['order']
): void => {
  const context = useContext(GroupContext)
  const dispatch = useContext(GroupDispatchContext)
  const initialProps = useRef({ annotation, context, dispatch, order })

  useEffect(() => {
    const {
      annotation: currentAnnotation,
      context: currentContext,
      dispatch: currentDispatch,
      order: currentOrder,
    } = initialProps.current

    if (!currentContext) {
      return
    }

    if (currentDispatch) {
      return currentDispatch({
        type: 'ADD',
        payload: { annotation: currentAnnotation, order: currentOrder },
      })
    }
  }, [])
}

export default RoughNotationGroup
