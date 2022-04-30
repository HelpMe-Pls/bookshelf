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

