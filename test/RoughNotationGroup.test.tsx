import React from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot, Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { RoughNotation, RoughNotationGroup } from '../src'

// Each entry is [annotation text, ms since the test started] for a draw.
// Times are rounded to 10ms, because fake timers run a 0ms timeout after 1ms.
let shown: [string, number][] = []
let start = 0

vi.mock('rough-notation', () => ({
  annotate: (element: HTMLElement) => ({
    show: () =>
      shown.push([
        element.textContent ?? '',
        Math.round((Date.now() - start) / 10) * 10,
      ]),
    hide: () => undefined,
    remove: () => undefined,
  }),
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

beforeEach(() => {
  vi.useFakeTimers()
  shown = []
  start = Date.now()
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.useRealTimers()
})

describe('RoughNotationGroup timing', () => {
  it('waits for the default duration between annotations', () => {
    render(
      <RoughNotationGroup show>
        <RoughNotation>a</RoughNotation>
        <RoughNotation>b</RoughNotation>
      </RoughNotationGroup>
    )
    advance(5000)

    expect(shown).toEqual([
      ['a', 0],
      ['b', 800],
    ])
  })

  it('pushes later annotations back by an annotation delay', () => {
    render(
      <RoughNotationGroup show>
        <RoughNotation animationDelay={1000} animationDuration={800}>
          a
        </RoughNotation>
        <RoughNotation animationDuration={500}>b</RoughNotation>
        <RoughNotation>c</RoughNotation>
      </RoughNotationGroup>
    )
    advance(5000)

    expect(shown).toEqual([
      ['a', 1000],
      ['b', 1800],
      ['c', 2300],
    ])
  })

  it('does not wait for an annotation with animate off', () => {
    render(
      <RoughNotationGroup show>
        <RoughNotation animate={false}>a</RoughNotation>
        <RoughNotation>b</RoughNotation>
      </RoughNotationGroup>
    )
    advance(5000)

    expect(shown).toEqual([
      ['a', 0],
      ['b', 0],
    ])
  })

  it('uses timing props that changed after mount', () => {
    const group = (show: boolean) => (
      <RoughNotationGroup show={show}>
        <RoughNotation animationDelay={show ? 500 : 0} animationDuration={300}>
          a
        </RoughNotation>
        <RoughNotation>b</RoughNotation>
      </RoughNotationGroup>
    )

    render(group(false))
    render(group(true))
    advance(5000)

    expect(shown).toEqual([
      ['a', 500],
      ['b', 800],
    ])
  })
})
