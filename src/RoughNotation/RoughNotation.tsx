import React, { useRef, useEffect, useCallback } from 'react'

import { annotate } from 'rough-notation'

import { useGroupContext } from '../RoughNotationGroup/RoughNotationGroup'

import { RoughNotationProps, Annotation } from './types'

const RoughNotation: React.FunctionComponent<RoughNotationProps> = ({
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
}) => {
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

  const showAnnotation = useCallback(() => {
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
  }, [animationDelay, animationDuration])

  const hideAnnotation = useCallback(() => {
    annotation.current?.hide?.()
    innerVars.current.playing = false

    if (innerVars.current.timeout) {
      clearTimeout(innerVars.current.timeout)
      innerVars.current.timeout = null
    }
  }, [])

  const getAnnotation = useCallback(() => {
    return annotation.current!
  }, [annotation])

  useGroupContext(
    {
      getAnnotation,
      show: showAnnotation,
      hide: hideAnnotation,
    },
    typeof order === 'string' ? parseInt(order) : order
  )

  useEffect(() => {
    const options = initialOptions.current
    const { getAnnotationObject: getAnnotationObjectFromOptions } = options

    annotation.current = annotate(element.current!, options)

    if (getAnnotationObjectFromOptions) {
      getAnnotationObjectFromOptions(annotation.current)
    }

    return () => {
      annotation.current?.remove?.()
    }
  }, [])

  useEffect(() => {
    if (show) {
      showAnnotation()
    } else {
      hideAnnotation()
    }
  }, [
    annotation,
    show,
    animationDelay,
    innerVars,
    animationDuration,
    showAnnotation,
    hideAnnotation,
  ])

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
