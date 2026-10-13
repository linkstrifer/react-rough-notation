import React from 'react'

import { Annotation } from '../RoughNotation/types'

export interface RoughNotationGroupProps {
  children: React.ReactNode
  show?: boolean
}

export type Payload = {
  annotation: {
    getAnnotation: () => Annotation | undefined
    show: () => void
    hide: () => void
  }
  order: number | undefined
}

export type Register = (payload: Payload) => () => void
