# What I've learnt
- Each section is linked to its corresponding commit, so you can click on its title to checkout the commit and have a better look of what's going on.
----------------

## [Render a React App](https://github.com/HelpMe-Pls/bookshelf/commit/fbb0819ac1a6f1828b0866bdf3a2f007b76c7248)
- Render `<App/>` with `react-18`:
```tsx
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```
- Use [`@reach/dialog`](https://reacttraining.com/reach-ui/dialog) to render a modal. [Setting its state](https://github.com/HelpMe-Pls/bookshelf/blob/master/src/App.tsx) with `enum` instead of the primitive `boolean` to embrace SoC design (i.e. if you set its state with `boolean`, you *may* get overlapped state from other components using that state).
- Abstracting away `event.target.value` into a reusable function by destructuring the input fields with `event.currentTarget.elements` and then use `.value` on them. Use TypeScript's `Pick` to [create a new type](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) from an extended interface.

## [Style React Components with `emotion`](https://github.com/HelpMe-Pls/bookshelf/commit/0f3ac0235383343b749b5fc8b2cb8f8630edc547)
- Typing [components](https://stackoverflow.com/a/58123882).
- Typing destructured props ([lines 49 -> 52](https://github.com/HelpMe-Pls/bookshelf/blob/master/src/components/modal.tsx)).
- Typing context ([lines 14, 15, 24](https://github.com/HelpMe-Pls/bookshelf/blob/master/src/components/modal.tsx)).
- A typical use case of `unknown` type: typing an utility function ([lines 8 -> 12](https://github.com/HelpMe-Pls/bookshelf/blob/master/src/components/modal.tsx)).
- Create a simple styled component with `emotion` ([at 1:45](https://epicreact.dev/modules/build-an-epic-react-app/add-styles-solution-01)).
- Use `React.cloneElement` to pass in a component as a prop.
- Enable ([at 2:30](https://epicreact.dev/modules/build-an-epic-react-app/add-styles-solution-03)) `emotion`'s inline styling for JSX elements (with its `css` prop) by adding:
```typescript
/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
```  
- [Labelling](https://epicreact.dev/modules/build-an-epic-react-app/add-styles-extra-credit-solution-01) generated CSS classNames from `emotion` by importing:
```js
import styled from '@emotion/styled/macro'
```
- [SoC and abstraction](https://epicreact.dev/modules/build-an-epic-react-app/add-styles-extra-credit-solution-02) for colors and media queries breakpoints by export them from a module:
```js
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
```
- Make a styled component from a SVG icon by simply passing it as an argument to the `styled` method, e.g:
```tsx
const Spinner = styled(FaSpinner)({/* styles here */})
```
- Use [`keyframe`](https://www.geeksforgeeks.org/css-keyframes-rule/) to define animations.
- The default `aria-label` attribute ([at 2:20](https://epicreact.dev/modules/build-an-epic-react-app/add-styles-extra-credit-solution-03)) is intended for use on interactive elements, or elements made to be interactive via other ARIA declarations, when there is no appropriate text visible in the DOM (i.e. for screen readers) that could be referenced as a label.