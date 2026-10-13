import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Payload, Register, RoughNotationGroupProps } from './types'

// The context value is a stable register function, so registering or
// unregistering an annotation never re-renders the group's children.
const GroupContext = createContext<Register | null>(null)

function byOrder(a: Payload, b: Payload) {
  if (a.order === undefined) return b.order === undefined ? 0 : 1
  if (b.order === undefined) return -1

  return a.order - b.order
}

const RoughNotationGroup: React.FunctionComponent<RoughNotationGroupProps> = ({
  children,
  show,
}) => {
  const annotations = useRef<Payload[]>([])
  const [version, setVersion] = useState(0)

  const register = useCallback<Register>((payload) => {
    annotations.current = [...annotations.current, payload]
    setVersion((current) => current + 1)

    return () => {
      annotations.current = annotations.current.filter(
        (annotation) => annotation !== payload
      )
      setVersion((current) => current + 1)
    }
  }, [])

  useEffect(() => {
    // Array.prototype.sort is stable, so annotations without an order keep
    // their registration order after the ordered ones.
    const sorted = [...annotations.current].sort(byOrder)

    if (!show) {
      sorted.forEach(({ annotation }) => annotation.hide())

      return
    }

    let nextTimeout = 0

    const timeouts = sorted.map(({ annotation }) => {
      const timeout = window.setTimeout(annotation.show, nextTimeout)

      nextTimeout += annotation.getAnnotation()?.animationDuration || 800

      return timeout
    })

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }
  }, [show, version])

  return (
    <GroupContext.Provider value={register}>{children}</GroupContext.Provider>
  )
}

export const useGroupContext = (
  annotation: Payload['annotation'],
  order: Payload['order']
): void => {
  const register = useContext(GroupContext)
  const initialProps = useRef({ annotation, order, register })

  useEffect(() => {
    const {
      annotation: currentAnnotation,
      order: currentOrder,
      register: currentRegister,
    } = initialProps.current

    if (!currentRegister) {
      return
    }

    return currentRegister({
      annotation: currentAnnotation,
      order: currentOrder,
    })
  }, [])
}

export default RoughNotationGroup
