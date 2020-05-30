# Rough Notation React (Wrapper)

This is a React wrapper for [RoughNotation](https://roughnotation.com/), a small JavaScript library to create and animate annotations on a web page.

- [Visit website to see it in action](https://roughnotation.com/)
- [Library docs](https://github.com/pshihn/rough-notation)

![Rough Notation logo](https://roughnotation.com/images/social.png)

## Table of contents

<!-- TOC -->

- [Rough Notation React (Wrapper)](#rough-notation-react-wrapper)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
  - [Type values](#type-values)
  - [Playground](#playground)
  - [TODO](#todo)

<!-- /TOC -->

## Installation

You can add rough-notation to your project via npm

```
npm install --save react-rough-notation
```

Then just import the component

```js
import { RoughNotation } from "react-rough-notation";
```

## Usage

```jsx
<RoughNotation type="underline">
  <h1>Hello RoughNotation</h1>
</RoughNotation>
```

## Props

| name                | type     | default                                                        | description                                                                                                                                                               |
| ------------------- | -------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animate             | boolean  | true                                                           | Turn on/off animation when annotating                                                                                                                                     |
| animationDelay      | number   | 0                                                              | Delay in animation in milliseconds                                                                                                                                        |
| animationDuration   | number   | 800                                                            | Duration of the animation in milliseconds                                                                                                                                 |
| color               | string   |                                                                | String value representing the color of the annotation sketch                                                                                                              |
| customElement       | string   | span                                                           | Element wrapper tagName                                                                                                                                                   |
| getAnnotationObject | function | (annotation) => {}                                             | Callback function called after annotation init, it will receive the javascript [annotation object](https://github.com/pshihn/rough-notation#annotation-object) as a param |
| padding             | 5        | number                                                         | Padding between the element and roughly where the annotation is drawn                                                                                                     |
| show                | boolean  | false                                                          | Show/hide the annotation                                                                                                                                                  |
| strokeWidth         | number   | 1                                                              | Width of the annotation strokes                                                                                                                                           |
| type                | enum     | underline, box, circle, highlight, strike-through, crossed-off | This is a mandatory field. It sets the annotation style                                                                                                                   |

## Type values

| value          | description                                             |
| -------------- | ------------------------------------------------------- |
| underline      | Create a sketchy underline below an element             |
| box            | This style draws a box around the element               |
| circle         | Draw a circle around the element                        |
| highlight      | Creates a highlight effect as if maked by a highlighter |
| strike-through | This style draws a box around the element               |
| crossed-off    | This style draws a box around the element               |

## Playground

You can find a [CodeSandbox demo here](https://codesandbox.io/s/react-rough-notation-playground-gvkq2?file=/src/App.js)

## TODO

- [ ] Add annotation group support
- [ ] Auto compile and publish to npm
