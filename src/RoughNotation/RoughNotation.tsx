'use client'
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
    playingTimeout: null | number
  }>({
    playing: false,
    timeout: null,
    playingTimeout: null,
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

  const clearTimeouts = useCallback(() => {
    const { timeout, playingTimeout } = innerVars.current

    if (timeout) {
      window.clearTimeout(timeout)
      innerVars.current.timeout = null
    }

    if (playingTimeout) {
      window.clearTimeout(playingTimeout)
      innerVars.current.playingTimeout = null
    }
  }, [])

  const showAnnotation = useCallback(() => {
    if (!innerVars.current.timeout) {
      innerVars.current.timeout = window.setTimeout(() => {
        innerVars.current.playing = true

        annotation.current?.show?.()

        innerVars.current.playingTimeout = window.setTimeout(() => {
          innerVars.current.playing = false
          innerVars.current.timeout = null
          innerVars.current.playingTimeout = null
        }, animationDuration)
      }, animationDelay)
    }
  }, [animationDelay, animationDuration])

  const hideAnnotation = useCallback(() => {
    annotation.current?.hide?.()
    innerVars.current.playing = false

    clearTimeouts()
  }, [clearTimeouts])

  const getAnnotation = useCallback(() => annotation.current, [])

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
      clearTimeouts()
      annotation.current?.remove?.()
    }
  }, [clearTimeouts])

  useEffect(() => {
    if (show) {
      showAnnotation()
    } else {
      hideAnnotation()
    }
  }, [show, showAnnotation, hideAnnotation])

  // rough-notation redraws the SVG whenever color, strokeWidth or padding is
  // assigned a value that isn't `===` to the current one, so each property gets
  // its own effect, and padding is keyed by value so an inline array doesn't
  // trigger a redraw on every render.
  useEffect(() => {
    if (annotation.current) {
      annotation.current.animate = animate
    }
  }, [animate])

  useEffect(() => {
    if (annotation.current) {
      annotation.current.animationDuration = animationDuration
    }
  }, [animationDuration])

  useEffect(() => {
    if (annotation.current) {
      annotation.current.color = color
    }
  }, [color])

  useEffect(() => {
    if (annotation.current) {
      annotation.current.strokeWidth = strokeWidth
    }
  }, [strokeWidth])

  const latestPadding = useRef(padding)
  latestPadding.current = padding
  const paddingKey = Array.isArray(padding) ? padding.join(',') : padding

  useEffect(() => {
    if (annotation.current) {
      annotation.current.padding = latestPadding.current
    }
  }, [paddingKey])

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
