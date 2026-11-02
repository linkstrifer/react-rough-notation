import React from 'react'

export type types =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

type brackets = 'left' | 'right' | 'top' | 'bottom'

interface RoughNotationProperties {
  animate?: boolean
  animationDelay?: number
  animationDuration?: number
  brackets?: brackets | brackets[]
  color?: string
  iterations?: number
  multiline?: boolean
  order?: number | string
  padding?: number | [number, number, number, number] | [number, number]
  strokeWidth?: number
}

// Unlisted props are passed through to the wrapper element, so accept any
// HTML attribute that doesn't clash with an annotation option.
type WrapperProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof RoughNotationProperties | 'children'
>

export interface RoughNotationProps
  extends RoughNotationProperties,
    WrapperProps {
  children: React.ReactNode
  customElement?: string
  getAnnotationObject?: (annotation: Annotation) => void
  show?: boolean
  type?: types
}

export interface Annotation extends RoughNotationProperties {
  isShowing(): boolean
  show(): void
  hide(): void
  remove(): void
}

export interface Props {
  children: React.ReactNode
}
