import React from 'react'

import { Annotation } from '../RoughNotation/types'

export interface RoughNotationGroupProps {
  children: React.ReactNode
  show?: boolean
}

export type State = {
  annotations: Array<Payload>
}

export type Payload = {
  annotation: React.RefObject<Annotation | undefined>
  order: number | undefined
}

export type Action = {
  type: 'ADD'
  payload: Payload
}

export type Dispatch = (action: Action) => void
