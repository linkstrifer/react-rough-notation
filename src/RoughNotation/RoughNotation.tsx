import React from 'react'
import { useRef, useEffect } from 'react'

import { annotate } from 'rough-notation'

import { useGroupContext } from '../RoughNotationGroup/RoughNotationGroup'

import { RoughNotationProps, Annotation } from './types'

const RoughNotation: React.FunctionComponent = ({
  animate = true,
  animationDelay = 0,
  animationDuration = 800,
  brackets,
  children,
  color,
  customElement = 'span',
  getAnnotationObject,
  iterations = 2,
  multiline = false,
  order,
  padding = 5,
  show = false,
  strokeWidth = 1,
  type = 'underline',
  ...rest
}: RoughNotationProps) => {
  const element = useRef<HTMLElement>(null)
  const annotation = useRef<Annotation>()
  const innerVars = useRef<{
    playing: boolean
    timeout: null | number
  }>({
    playing: false,
    timeout: null,
  })
  const initialOptions = useRef({
    animate,
    animationDuration,
    brackets,
    color,
    getAnnotationObject,
    iterations,
    multiline,
    padding,
    strokeWidth,
    type,
  })

  useGroupContext(
    annotation,
    typeof order === 'string' ? parseInt(order) : order
  )

  useEffect(() => {
    const options = initialOptions.current
    const { getAnnotationObject } = options

    annotation.current = annotate(element.current!, options)

    if (getAnnotationObject) {
      getAnnotationObject(annotation.current)
    }

    return () => {
      annotation.current?.remove?.()
    }
  }, [])

  useEffect(() => {
    if (show) {
      if (!innerVars.current.timeout) {
        innerVars.current.timeout = window.setTimeout(() => {
          innerVars.current.playing = true

          annotation.current?.show?.()

          window.setTimeout(() => {
            innerVars.current.playing = false
            innerVars.current.timeout = null
          }, animationDuration)
        }, animationDelay)
      }
    } else {
      annotation.current?.hide?.()
      innerVars.current.playing = false

      if (innerVars.current.timeout) {
        clearTimeout(innerVars.current.timeout)
        innerVars.current.timeout = null
      }
    }
  }, [annotation, show, animationDelay, innerVars, animationDuration])

  useEffect(() => {
    if (annotation.current) {
      annotation.current.animate = animate
      annotation.current.animationDuration = animationDuration
      annotation.current.color = color
      annotation.current.strokeWidth = strokeWidth
      annotation.current.padding = padding
    }
  }, [annotation, animate, animationDuration, color, strokeWidth, padding])

  return React.createElement(
    customElement,
    {
      ref: element,
      ...rest,
    },
    children
  )
}

export default RoughNotation
