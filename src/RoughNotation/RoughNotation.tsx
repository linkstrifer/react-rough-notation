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
  rtl = false,
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
  // The group registers this annotation's callbacks once, at mount, so they
  // read the timing props through a ref to always see the latest values.
  const timing = useRef({ animate, animationDelay, animationDuration })
  timing.current = { animate, animationDelay, animationDuration }

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
    const { animationDelay, animationDuration } = timing.current

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
  }, [])

  const hideAnnotation = useCallback(() => {
    annotation.current?.hide?.()
    innerVars.current.playing = false

    clearTimeouts()
  }, [clearTimeouts])

  // How long the group waits before it shows the next annotation. With
  // animate off, rough-notation draws at once, so only the delay counts.
  const getRunTime = useCallback(() => {
    const { animate, animationDelay, animationDuration } = timing.current

    return animationDelay + (animate ? animationDuration : 0)
  }, [])

  useGroupContext(
    {
      getRunTime,
      show: showAnnotation,
      hide: hideAnnotation,
    },
    typeof order === 'string' ? parseInt(order) : order
  )

  // The latest props, read when an annotation is created so a re-created
  // annotation keeps the current color, padding and so on.
  const options = {
    animate,
    animationDuration,
    brackets,
    color,
    getAnnotationObject,
    iterations,
    multiline,
    padding,
    rtl,
    strokeWidth,
    type,
  }
  const latest = useRef(options)
  latest.current = options

  // rough-notation can't change these options on an existing annotation, so a
  // change removes it and annotates again. Arrays are keyed by value so an
  // inline array doesn't re-create the annotation on every render.
  const bracketsKey = Array.isArray(brackets) ? brackets.join(',') : brackets
  const wasShowing = useRef(false)

  useEffect(() => {
    const { getAnnotationObject, ...options } = latest.current
    const current = annotate(element.current!, options)

    annotation.current = current
    getAnnotationObject?.(current)

    if (wasShowing.current) {
      current.show()
    }

    return () => {
      wasShowing.current = current.isShowing()
      current.remove()
    }
  }, [type, bracketsKey, iterations, multiline, rtl])

  useEffect(() => clearTimeouts, [clearTimeouts])

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

  const paddingKey = Array.isArray(padding) ? padding.join(',') : padding

  useEffect(() => {
    if (annotation.current) {
      annotation.current.padding = latest.current.padding
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
