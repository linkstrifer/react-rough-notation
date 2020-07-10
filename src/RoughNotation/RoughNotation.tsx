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
      setTimeout(() => {
        annotation.current?.show?.()
      }, animationDelay)
    } else {
      annotation.current?.hide?.()
    }
  }, [annotation, show, animationDelay])

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
