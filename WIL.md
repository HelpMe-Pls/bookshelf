# What I've learnt
- Each section is linked to its corresponding commit, so you can click on its title to checkout the commit and have a better look of what's going on.
----------------

## [Render a React App](https://github.com/HelpMe-Pls/bookshelf/commit/fbb0819ac1a6f1828b0866bdf3a2f007b76c7248)
- Render `<App/>` with `react-18`:
```tsx
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```
- Use [`@reach/dialog`](https://reacttraining.com/reach-ui/dialog) to render a modal. [Setting its state](https://github.com/HelpMe-Pls/bookshelf/blob/fbb0819ac1a6f1828b0866bdf3a2f007b76c7248/src/App.tsx) with `enum` instead of the primitive `boolean` to embrace SoC design (i.e. if you set its state with `boolean`, you *may* get overlapped state from other components using that state).
- Abstracting away `event.target.value` into a reusable function by destructuring the input fields with `event.currentTarget.elements` and then use `.value` on them. Use TypeScript's `Pick` to [create a new type](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) from an extended interface.

## [Style React Components with `emotion`](https://github.com/HelpMe-Pls/bookshelf/commit/0f3ac0235383343b749b5fc8b2cb8f8630edc547)
- Typing [components](https://stackoverflow.com/a/58123882).
- Typing destructured props ([lines 49 -> 51](https://github.com/HelpMe-Pls/bookshelf/blob/0f3ac0235383343b749b5fc8b2cb8f8630edc547/src/components/modal.tsx)).
- Typing context ([lines 14, 15, 24](https://github.com/HelpMe-Pls/bookshelf/blob/0f3ac0235383343b749b5fc8b2cb8f8630edc547/src/components/modal.tsx)).
- A typical use case of `unknown` type: typing an utility function ([lines 8 -> 12](https://github.com/HelpMe-Pls/bookshelf/blob/0f3ac0235383343b749b5fc8b2cb8f8630edc547/src/components/modal.tsx)).
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

## [Make HTTP Requests](https://github.com/HelpMe-Pls/bookshelf/commit/ba65f455fd5b801a804722c090dc29cd344aca3d)
- It is highly recommended to treat types like functions (i.e. [start with the *small* things first](https://github.com/HelpMe-Pls/bookshelf/blob/ba65f455fd5b801a804722c090dc29cd344aca3d/src/types.d.ts), then build up bigger things from those, rather than building a composed type right from the start).
- Use `[number]` to get an element's type in an array, e.g:
```ts
interface BooksData {
    books: {
        id: string;
        title: string;
        author: string;
        coverImageUrl: string;
        pageCount: number;
        publisher: string;
        synopsis: string;
    }[];
    error?: {
        message: string;
        status: number;
    };
}
type BookData = BooksData["books"][number];
```
- Use parentheses ([at line 87](https://github.com/HelpMe-Pls/bookshelf/blob/ba65f455fd5b801a804722c090dc29cd344aca3d/src/discover.tsx)) to type guard a "possibly null" object when accessing its properties.
- Usage of `event.target.elements` ([at 1:20](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-solution-01)) and `encodeURIComponent` (at 2:15).
- Control *when* to run `useEffect`'s callback ([at 3:00](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-solution-01)).
- **When** to [abstract](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-solution-02) a piece of functionality into a reusable module.
- A caveat of `window.fetch` is that it won't reject your promise unless the network request is failed ([at 0:43](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-extra-credit-solution-01)).
- Senior stuff/team work: using [their abstractions](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-extra-credit-solution-02) to clean up your code.

## [Authentication](https://github.com/HelpMe-Pls/bookshelf/commit/1347cc0ff81398c2ee5c775e2252fa7edba081dc)
- The user doesn't want to submit their password every time they need to
make a request for data. They want to be able to log into the application and
then the application can continuously authenticate requests for them automatically. A common solution to this problem is to have a special limited use "**token**" which represents the user's *current session*. 
- In order to authenticate the user, this token (which can be *anything* that **uniquely** identifies the user, but a common standard is to use a [JSON Web Token](https://jwt.io) (JWT)) *must be included* with every request the client makes. That way the token can be **invalidated** (in the case that it's lost or stolen) and the user doesn't have to change their password. They simply *re-authenticate* to get a fresh token.
- The easiest way to manage displaying the right content to the user based on
whether they've logged in, is to *split your app into two parts*: **Authenticated**,
and **Unauthenticated**. Then you choose which to render based on whether you have
the user's information.
- When the app loads in the first place, you'll call your auth provider's API
to retrieve a token if the user is already logged in. If they are, then you can
show a loading screen while you request the user's data before rendering
anything else. If they aren't, then you know you can render the login screen
right away. 
- A common way to get the token is to use a third-party authentication services (or something similar provided by your back-end):
```ts
// Call some API to retrieve a token
const token = await authProvider.getToken()

// If there's a token, then send it along with the requests you make
const headers = {
  Authorization: token ? `Bearer ${token}` : undefined,
}
window.fetch('http://example.com/api', {headers})
```
- Make your types *optional* if you're going to set a default for them ([line 6-10](https://github.com/HelpMe-Pls/bookshelf/blob/1347cc0ff81398c2ee5c775e2252fa7edba081dc/src/utils/api-client.ts) and [line 132](https://github.com/HelpMe-Pls/bookshelf/blob/1347cc0ff81398c2ee5c775e2252fa7edba081dc/src/components/lib.tsx)). Use `Partial` to set the type for `...props` in case you set that argument to be an empty object:
```ts
type Props = {
	key_1: boolean,
	key_2: Date
}
function Sample(param_1: string, { param_2, ...props }: {param_2?: number} & Partial<Props> = {}) { // If you didn't set a default then it's just ` & Props`
	// Do something...
}
```
- How to merge params ([at 1:30](https://epicreact.dev/modules/build-an-epic-react-app/authentication-extra-credit-solution-01)).
- It's a good practice to extract `async` logics into an independent function then call it in inside the `useEffect` rather than defining it from within ([line 14-24 and 39](https://github.com/HelpMe-Pls/bookshelf/blob/1347cc0ff81398c2ee5c775e2252fa7edba081dc/src/App.tsx)).
- For better maintainability, it's highly recommended to use early `return`s instead of one big `return` with multiple ternary statements in it or all of the `return`'s are conditional ([line 62-85](https://github.com/HelpMe-Pls/bookshelf/blob/1347cc0ff81398c2ee5c775e2252fa7edba081dc/src/App.tsx)).
- How to handle [401 response](https://epicreact.dev/modules/build-an-epic-react-app/authentication-extra-credit-solution-03).
- Build a `Promise` utility function which handles both [POST and GET requests](https://epicreact.dev/modules/build-an-epic-react-app/authentication-extra-credit-solution-04).

## [Routing](https://github.com/HelpMe-Pls/bookshelf/commit/ef1ee6c79ac39d64710e4dfec7bf7b42e05b506a)
- Embracing Single-page App: you can change the URL when the user performs an action (like clicking a link or submitting a form). This all happens client-side and does **not** reload the browser by using `react-router`. Key takeaways: differences between `BrowserRouter`, `Routes`, `Route` and `Link` ([at 6:50](https://epicreact.dev/modules/build-an-epic-react-app/routing-solution)). 
- How to handle [URL redirects](https://epicreact.dev/modules/build-an-epic-react-app/routing-extra-credit-solution-01). Prioritize [server-side redirects](https://kentcdodds.com/blog/stop-using-client-side-route-redirects) over client-side.
- `useMatch` to [highlight](https://epicreact.dev/modules/build-an-epic-react-app/routing-extra-credit-solution-02) the active nav item.
- Use template literal to perform `string` interpolation in case of building a forced `string` type expression ([at line 100](https://github.com/HelpMe-Pls/bookshelf/blob/ef1ee6c79ac39d64710e4dfec7bf7b42e05b506a/src/discover.tsx)).  

## [Cache management with `react-query`](https://github.com/HelpMe-Pls/bookshelf/commit/fb248d107e63d3035473555cd9091955bbeebb16)
- An app's state can be separated into two types:
1. UI state: Modal is open, item is highlighted, etc.
2. Server cache: User data, tweets, contacts, etc.
We can drastically simplify our UI state management if we split out the server
cache into something separate.
- Why use TypeScript:
```ts
	const refetchBookSearchQuery = useRefetchBookSearchQuery(user)  // This is a promise

    // The "cleanup" function's return type is `void`,
	React.useEffect(() => {
        // TS will catch this error, but JS allows it: 
		return () => refetchBookSearchQuery()  
        
        // So the right way to do this is to wrap the promise with an IIFE:
        return () =>
			(function cleanUp() {
				refetchBookSearchQuery()
			})()
	}, [refetchBookSearchQuery])
```
- Explicitly type guard the `unknown` params by casting their type with the `as` keyword([at line 17](https://github.com/HelpMe-Pls/bookshelf/blob/fb248d107e63d3035473555cd9091955bbeebb16/src/index.tsx)).
- Setting a default value to a variable if it's `undefined` ([at 1:00](https://epicreact.dev/modules/build-an-epic-react-app/cache-management-solution-08)).
- Use nullish coalescing operator `??` with run-time array traversing methods ([at line 25](https://github.com/HelpMe-Pls/bookshelf/blob/fb248d107e63d3035473555cd9091955bbeebb16/src/utils/list-items.ts)).
- Perform CRUD operations with `react-query`.
- If your `queryFn` depends on a variable, include it in your `queryKey` array. How to [optimize query keys](https://tkdodo.eu/blog/effective-react-query-keys). 
- Invalidate query with `onSettled` option from the `useMutation` hook ([at 2:35](https://epicreact.dev/modules/build-an-epic-react-app/cache-management-solution-02)).
- Clear the cache (e.g. when the user logs out or they make a `401` request) by using `queryCache.clear()`.
- Refactor hooks from `react-query` into custom hooks to abstract implementation details and avoid the risk of syntax errors from duplicating the same piece of code over and over again ([at 2:30](https://epicreact.dev/modules/build-an-epic-react-app/cache-management-extra-credit-solution-01-03)).
- Set the `useErrorBoundary` option from the `useMutation` hook to `true` to get mutation errors [to be thrown in the render phase](https://youtu.be/umJqHUcOaUo?t=1178) and propagate to the nearest error boundary. 
- Prefetch with [`queryClient.prefetchQuery`](https://react-query.tanstack.com/reference/QueryClient#queryclientprefetchquery) and [`queryClient.removeQueries`](https://react-query.tanstack.com/reference/QueryClient#queryclientremovequeries).
- Persist cache with `useQuery`'s [`onSuccess` option](https://youtu.be/umJqHUcOaUo?t=1480) using `queryClient.setQueryData`.
- Perform optimistic updates (i.e. assuming the request is going to succeed and make
the UI appear as if it had) with `useMutation`'s `onMutate` option ([at 1:20](https://epicreact.dev/modules/build-an-epic-react-app/cache-management-extra-credit-solution-07)). You can rollback optimistic updates in case of a mutation failure by using the `onError` and `onSettled` options ([at 3:20](https://epicreact.dev/modules/build-an-epic-react-app/cache-management-extra-credit-solution-07)).

## [Context](https://github.com/HelpMe-Pls/bookshelf/commit/6a64f83803a569aa3b3e4aa566d00dd6d46eaf6f)
- The common cases for `Context` (to eliminate prop-drilling) are application "toast" notifications, user authentication state, or modal and focus management. 
- [When](https://epicreact.dev/modules/build-an-epic-react-app/context-solution-04) to convert a function into a custom hook (also a notice on how hooks are used). A tip for when you have a function which needs to access the context's value ([at 02:18](https://epicreact.dev/modules/build-an-epic-react-app/context-solution-04)).
- The most practical use case of `useCallback` ([at 1:20](https://epicreact.dev/modules/build-an-epic-react-app/context-solution-04)): when your function will be likely added to a dependency list.
- Improve maintainability by SoC: create a component as a wrapper, whose sole purpose is to *manage and provide* the context. A standard `context` file should [look like this](https://github.com/HelpMe-Pls/bookshelf-forked/blob/exercises/07-context/src/context/auth-context.extra-2.js). 
- It is recommmended to move all the contexts into a [global context module](https://github.com/HelpMe-Pls/bookshelf/blob/6a64f83803a569aa3b3e4aa566d00dd6d46eaf6f/src/context/index.tsx) (`index` file in the `context` folder) for easier testing.
- Nested destructuring ([at 0:25](https://epicreact.dev/modules/build-an-epic-react-app/context-extra-credit-solution-04), it's just another way of writing `useAuth().user.token`).

## [Compound components](https://github.com/HelpMe-Pls/bookshelf/commit/e61eb14942e37cf389854581fc7fbbcaa82e377f)
- Not all reusable components are _actually_ reusable. Lots of the time what it turns into is a mess of props. Those end upbeing enormously difficult to use and maintain. They're also riddled with performance problems and actual bugs.
- A recommended approach is to refactor your code by [creating compound components](https://epicreact.dev/modules/build-an-epic-react-app/compound-components-solution) which are structurally flexible (i.e. we don't want to control the structure of the components), but we still want to have implicitly shared state between them. Utilizing `context` ([at 07:45](https://epicreact.dev/modules/build-an-epic-react-app/compound-components-solution)) will help us with that. 
- Create a generic utility function ([at 01:50](https://epicreact.dev/modules/build-an-epic-react-app/compound-components-extra-credit-solution-01)) which calls many functions at once.
- Create a HOC (to embrace immutability) from a base component ([at 01:45](https://epicreact.dev/modules/build-an-epic-react-app/compound-components-extra-credit-solution-02)) to further customize an existing component.

## [Performance](https://github.com/HelpMe-Pls/bookshelf/commit/c08eab858173b0b0201ad3ff1af7190513d1cbad)
- Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost. Therefore, optimize responsibly and make sure to measure your refactor to see if it's worth it.
- Consider a [suitable approach](https://github.com/HelpMe-Pls/react-performance/blob/master/src/examples/where-to-put-state.webp) for your state management.
- **Code splitting**: no matter how big your application grows, it's unlikely the user needs _everything_ your application can do on the page at the same time. So if instead we split the application code and assets into logical "chunks" (using `React.lazy`) then we could load only the chunks necessary for what the user wants to do right then. 
- Remember, `React.lazy` expects the module you're importing to export a React component as the `default export`.
- Use the Devtool's `coverage` to measure if your optimization is worth it ([at 4:50](https://epicreact.dev/modules/build-an-epic-react-app/performance-solution)).
- If you're using Webpack: prefetch a lazily loaded module with `/* webpackPrefetch: true */` ([at 02:40](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-01)):
```ts
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
```
- The only time the context's provider re-renders is when the [state actually changes](https://kentcdodds.com/blog/optimize-react-re-renders) (which is when you _want_ consumers to re-render anyway). However, it's often a good idea to [memoize the functions](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-02) we expose through context so those functions can be passed into dependency arrays. From there, we'll memoize the context value as well.
- Measure and report your app's performance [with `React.Profiler`](https://reactjs.org/docs/profiler.html). How to customize the `Profiler` ([at 2:00](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-03-01)) and how to use it ([at 1:10](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-03-02)). 
- A remind ([at 2:35](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-03-03)) on where to put your `Profiler`. Add the `Profiler` to your production build ([at 1:10](https://epicreact.dev/modules/build-an-epic-react-app/performance-extra-credit-solution-03-04)).
  
## [Render as you fetch](https://github.com/HelpMe-Pls/bookshelf/commit/307c9618e9fea424ef6f0c0e343dd05672d324b4)
- There are three common approaches to data fetching:
1. Fetch-**on**-render: We start rendering components and each of these components may trigger data fetching *in their effects and lifecycle methods*. A good example of that is fetching inside the `useEffect()`.
2. Fetch-**then**-render: Start fetching all the data for the next screen first, **then** when the data is ready, render the new screen. *We can’t render some of our components anything until the data arrives*. The example of that is having a "Container" (or a "parent") component that handles data fetching and *conditionally renders* the child presentational component *once we’ve received the data*. In short, it's not really an improvement from "fetch-on-render" but rather a different way to do it.
3. **Render-as-you-fetch**: The idea here is that you, as a developer, *most of the time*, know what data your component needs (or there is a way to know it). So instead of waiting for the fetch to finish then do the render (or wait for the render to finish then fetch), we could **render and fetch at the same time**: Start fetching data as early *as possible* and start trying to render components that *may still need data*. As data streams in, React retries rendering components that still need data until they’re all ready. A practical use case: there are some assets we need to load *before* the app can render the initial page. **The earlier** we can start requesting those assets, **the faster** we can show the user their data. Start your requests for the needed code, data, or assets **as soon as** you have the information you need to retrieve them:
   1. Take a look at everything you're *loading*.
   2. Determine the *minimal* amount of things you need to start rendering something **useful** to the user.
   3. Start loading those things [as soon as](https://epicreact.dev/modules/build-an-epic-react-app/render-as-you-fetch-extra-credit-solution-01) you possibly can (i.e fetching data *while* your component is rendering, therefore reduce the "loading" time).