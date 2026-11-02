import React from 'react'

export interface RoughNotationGroupProps {
  children: React.ReactNode
  show?: boolean
}

export type Payload = {
  annotation: {
    // Delay plus draw time, in ms. The group waits this long before it shows
    // the next annotation.
    getRunTime: () => number
    show: () => void
    hide: () => void
  }
  order: number | undefined
}

export type Register = (payload: Payload) => () => void
