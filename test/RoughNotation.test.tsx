import React from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot, Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { RoughNotation } from '../src'
import { Annotation } from '../src/RoughNotation/types'

type FakeAnnotation = Annotation & {
  config: Record<string, unknown>
  showing: boolean
  removed: boolean
  shows: number
  assigned: string[]
}

// Every annotation the component creates, oldest first.
let created: FakeAnnotation[] = []

vi.mock('rough-notation', () => ({
  annotate: (_element: HTMLElement, config: Record<string, unknown>) => {
    const fake = {
      config,
      showing: false,
      removed: false,
      shows: 0,
      assigned: [] as string[],
      isShowing: () => fake.showing,
      show: () => {
        fake.showing = true
        fake.shows++
      },
      hide: () => {
        fake.showing = false
      },
      remove: () => {
        fake.removed = true
      },
    }

    // Record which options the component assigns after creation.
    const annotation = new Proxy(fake, {
      set(target, key, value) {
        target.assigned.push(String(key))
        ;(target as Record<string | symbol, unknown>)[key] = value
        return true
      },
    })
    created.push(annotation as unknown as FakeAnnotation)

    return annotation
  },
}))

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLElement
let root: Root

function render(element: React.ReactElement) {
  act(() => root.render(element))
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

const last = () => created[created.length - 1]

beforeEach(() => {
  vi.useFakeTimers()
  created = []
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.useRealTimers()
})

describe('RoughNotation', () => {
  it('passes the annotation options, including rtl, to rough-notation', () => {
    render(
      <RoughNotation type="box" rtl multiline color="red" padding={[1, 2]}>
        text
      </RoughNotation>
    )

    expect(created).toHaveLength(1)
    expect(last().config).toMatchObject({
      type: 'box',
      rtl: true,
      multiline: true,
      color: 'red',
      padding: [1, 2],
    })
    expect(last().config).not.toHaveProperty('getAnnotationObject')
  })

  it('renders the wrapper element with unlisted props', () => {
    render(
      <RoughNotation customElement="mark" className="note">
        text
      </RoughNotation>
    )

    const mark = container.querySelector('mark.note')
    expect(mark?.textContent).toBe('text')
  })

  it('shows after animationDelay and hides when show turns off', () => {
    render(
      <RoughNotation show animationDelay={300}>
        text
      </RoughNotation>
    )

    advance(299)
    expect(last().showing).toBe(false)
    advance(1)
    expect(last().showing).toBe(true)

    render(<RoughNotation animationDelay={300}>text</RoughNotation>)
    expect(last().showing).toBe(false)
  })

  it('cancels a pending show when show turns off', () => {
    render(
      <RoughNotation show animationDelay={300}>
        text
      </RoughNotation>
    )
    render(<RoughNotation animationDelay={300}>text</RoughNotation>)

    advance(1000)
    expect(last().shows).toBe(0)
  })

  it('updates style options on the existing annotation', () => {
    render(
      <RoughNotation color="red" strokeWidth={1} padding={[1, 2]}>
        text
      </RoughNotation>
    )
    last().assigned = []

    render(
      <RoughNotation color="blue" strokeWidth={3} padding={[3, 4]}>
        text
      </RoughNotation>
    )

    expect(created).toHaveLength(1)
    expect(last().color).toBe('blue')
    expect(last().strokeWidth).toBe(3)
    expect(last().padding).toEqual([3, 4])
  })

  it('does not reassign an inline padding array with the same values', () => {
    render(<RoughNotation padding={[1, 2]}>text</RoughNotation>)
    last().assigned = []

    render(<RoughNotation padding={[1, 2]}>text</RoughNotation>)

    expect(last().assigned).not.toContain('padding')
  })

  it.each([
    ['type', { type: 'underline' }, { type: 'circle' }],
    ['brackets', { brackets: ['left'] }, { brackets: ['left', 'right'] }],
    ['iterations', { iterations: 2 }, { iterations: 4 }],
    ['multiline', { multiline: false }, { multiline: true }],
    ['rtl', { rtl: false }, { rtl: true }],
  ] as const)(
    're-creates the annotation when %s changes',
    (key, before, after) => {
      render(<RoughNotation {...before}>text</RoughNotation>)
      const first = last()

      render(<RoughNotation {...after}>text</RoughNotation>)

      expect(created).toHaveLength(2)
      expect(first.removed).toBe(true)
      expect(last().config[key]).toEqual(after[key])
    }
  )

  it('keeps the current style options when it re-creates the annotation', () => {
    render(
      <RoughNotation type="box" color="red">
        text
      </RoughNotation>
    )
    render(
      <RoughNotation type="box" color="blue">
        text
      </RoughNotation>
    )
    render(
      <RoughNotation type="circle" color="blue">
        text
      </RoughNotation>
    )

    expect(last().config).toMatchObject({ type: 'circle', color: 'blue' })
  })

  it('does not re-create for an inline brackets array with the same values', () => {
    render(<RoughNotation brackets={['left', 'right']}>text</RoughNotation>)
    render(<RoughNotation brackets={['left', 'right']}>text</RoughNotation>)

    expect(created).toHaveLength(1)
  })

  it('shows the new annotation if the old one was showing', () => {
    render(
      <RoughNotation show type="box">
        text
      </RoughNotation>
    )
    advance(0)
    expect(last().showing).toBe(true)

    render(
      <RoughNotation show type="circle">
        text
      </RoughNotation>
    )

    expect(last().config.type).toBe('circle')
    expect(last().showing).toBe(true)
  })

  it('does not show the new annotation if the old one was hidden', () => {
    render(<RoughNotation type="box">text</RoughNotation>)
    render(<RoughNotation type="circle">text</RoughNotation>)

    expect(last().showing).toBe(false)
  })

  it('passes each new annotation to getAnnotationObject', () => {
    const getAnnotationObject = vi.fn()

    render(
      <RoughNotation type="box" getAnnotationObject={getAnnotationObject}>
        text
      </RoughNotation>
    )
    render(
      <RoughNotation type="circle" getAnnotationObject={getAnnotationObject}>
        text
      </RoughNotation>
    )

    expect(getAnnotationObject).toHaveBeenCalledTimes(2)
    expect(getAnnotationObject).toHaveBeenLastCalledWith(last())
  })

  it('removes the annotation and cancels a pending show on unmount', () => {
    render(
      <RoughNotation show animationDelay={300}>
        text
      </RoughNotation>
    )
    const annotation = last()

    act(() => root.unmount())
    root = createRoot(container)
    advance(1000)

    expect(annotation.removed).toBe(true)
    expect(annotation.shows).toBe(0)
  })
})
