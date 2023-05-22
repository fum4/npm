<img src="https://i.ibb.co/LnwWJ0g/react-redux-history.png" alt="react-redux-history-logo" />

<!-- Shields -->

[![build][1]][12]
[![license][5]][6]
[![npm][3]][4]
![minsize][2]

<br>

# ⚛ Navigation history made easy!

Lots of applications need more control over their navigation than what their router provides.

No worries, we are here to help.

<hr>

<br>

📜 Save all navigation history in store   [Get started](#setup)

🌲 Persist history after reloading the page   [Read more](#persist)

⏭️ Skipping screens capability out of the box   [Read more](#skip-back)

🔀 Dispatch location changes   [Read more](#redux-first)

👊 Force current route to re-render   [Read more](#force-render)

🚦 Selectors for easy access   [Read more](#selectors)

🐛 Easy debug, find everything you need to know about navigation in your favorite dev tools:

<br>

<img src="https://i.imgur.com/K2fjcwH.png" alt="Redux DevTools with router history" width="500" />

<br><br><br>

# Setup <a id="setup"></a>

### Step 1)

Let's get started by installing the package:

```shell
pnpm add react-redux-history
```

```shell
yarn add react-redux-history
```

```shell
npm i react-redux-history
```

<br>

### Step 2)

Create a `history` object and pass it to `configureRouterHistory`. The returned reducer and middleware will be used to connect to the store.

```javascript
// store.js
import { createBrowserHistory } from "history"
import { configureRouterHistory } from "react-redux-history"

export const history = createBrowserHistory() // export this as we will need it later

// optional, defaults are listed below
const options = {
  storageKey: "routerState",
  storageLimit: Infinity
}

const { routerReducer, routerMiddleware } = configureRouterHistory(
  history,
  options
)
```

<br>

### Step 3)

Add the reducer and middleware to your store. If you are using Redux Toolkit it should look something like this:

```javascript
// store.js
const store = configureStore({
  reducer: combineReducers({
    // ...other reducers
    router: routerReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // ...other middleware
      .prepend(routerMiddleware)
});

export default store
```

<br>

### Step 4)

Lastly, add either `<LocationListener history={history} />` or `useLocationListener(history)` somewhere at the root of your app.

```javascript
// App.tsx
import { useLocationListener, LocationListener } from "react-redux-history"
import { history } from "src/store"

const App = () => {
  useLocationListener(history) // Use either this or the component below, not both!

  return (
    <>
      ...
      <LocationListener history={history} />
      ...
    </>
  );
};
```

**Note**: the `history` object provided to `configureRouterHistory` and `useLocationListener` / `LocationListener` must be the same `history` object !

<br><br><br>

# Configuration

The middleware can be configured by passing an options object as the second argument to `configureRouterHistory`.

The following options are available:

- `storageKey` - the key to use when saving the state to session storage. Defaults to `routerState`
- `storageLimit` - the maximum number of entries to save in session storage. Defaults to `Infinity`

<br>

**Be careful when limiting session storage entries**. The user is still able to go back to previous pages even if they are not saved in session storage. This can cause unexpected behaviour on page reload, especially if you use `skipBack` / `skipForward` or similar logic that alters the navigation flow.

<br><br><br>

# Features <a id="features"></a>


## 🌲 Persistent history <a id="persist"></a>

History is persisted after page refresh by leveraging session storage.

This helps provide a better user experience and allows you to build a more robust navigation system.

<br>

## ⏭️ Skip back / forward <a id="skip-back"></a>

By setting a `skipBack` / `skipForward` flag on a specific route the user will be automatically skipped over certain routes.

```javascript
history.push({
  pathname: "page_5",
  state: { skipBack: 4 }
})
```

In this example, every time the user will try to go back from _page_5_ he will be skipped back 4 pages, reaching _page_1_. The same behaviour will apply when going forward from _page_1_, the user will be skipped forward to _page_5_.

**Note**: Due to the restrictive nature of browser navigation, back or forward actions cannot be stopped. That means that in the previous example the user will actually reach _page_4_ before being redirected to _page_1_. If there is conflicting logic (such as extra redirects) in _page_4_, it will be fired before the middleware manages to completely skip all screens. In order to get past this issue we can `selectIsSkipping` to not render the component tree while skipping.

*We managed this at Utilmond by leveraging the selector in our general purpose loading component. When the flag is `true`, we render a loading backdrop instead of the current route. This prevents any conflicting logic to be fired and mess with the redirects.*

<br>

## 🔀 Dispatch location changes <a id="redux-first"></a>

Change current location using redux actions anywhere in your app.

The API is compatible with `history`, it can be used as a drop-in replacement.

```javascript
import { push, replace, forward, back, go } from 'react-redux-history'

dispatch(push({
  pathname: 'homepage',
  state: {
    ...
  }
}))

// or use the short version

dispatch(push('homepage'))
```

<br>

## 👊 Force current route to re-render <a id="force-render"></a>

Force current route to re-render by using `selectForceRender`. Navigate to the same route while passing `forceRender: {}` in location state.

```javascript
import { useSelector } from "react-redux"
import { selectForceRender } from "react-redux-history"

const Component = () => {
  // The component will re-render every time the `forceRender` flag reference changes
  const forceRender = useSelector(selectForceRender)

  useEffect(() => {
    // The flag can also be used as a dependency in order to re-trigger effects
  }, [forceRender])

  return (
    <button
      onClick={() => {
        history.push({
          // By default `react-router` will not trigger re-rendering when the pathname is the same
          pathname: "current_pathname",
          state: {
            // Simply pass a new object to force re-rendering
            forceRender: {}
          },
        });
      }}
    >
      Re-render
    </button>
  )
}
```

<br>

## 🚦 Selectors for easy access <a id="selectors"></a>

There are also a few useful selectors for easy access:

- `selectLocationHistory`
- `selectCurrentLocation`
- `selectCurrentLocationState`
- `selectCurrentLocationIndex`
- `selectNextLocation`
- `selectPreviousLocation`
- `selectBackLocation`
- `selectHistoryAction`
- `selectIsSkippingRoutes`
- `selectIsNewSession`
- `selectForceRender`

<br><br><br><br>

## 🏅 Sponsors

<br>

<a alt="used by Utilmond" href="https://utilmond.com"><img src="https://utilmond.com/static/images/utilmond_whitebg.svg" width="250px" /></a>

<img alt="Sponsor - JetBrains" width="250px" height="250px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png?_ga=2.63300143.1068496944.1680591996-1938842262.1680591996" />

<br><br><br>

### Used in production by [Utilmond][11]

<hr>

[![react][7]][8]
[![redux][9]][10]
[![react-router][13]][14]

[1]: https://img.shields.io/github/actions/workflow/status/fum4/npm/test.yml?branch=master&logo=github&color=029e2b
[2]: https://img.shields.io/bundlephobia/min/react-redux-history?logo=supabase&logoColor=yellow
[3]: https://img.shields.io/npm/v/react-redux-history?color=white&logo=npm
[4]: https://www.npmjs.com/package/react-redux-history
[5]: https://img.shields.io/npm/l/react-redux-history?logo=coursera&color=f2ed88
[6]: https://github.com/fum4/npm/blob/master/LICENSE.md
[7]: https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d
[8]: https://reactjs.org/
[9]: https://camo.githubusercontent.com/3a2650b6854cb790e3af41a1cefa87df32efc07aad12d0c0f128a7fbc5998ac3/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526564757826636f6c6f723d373634414243266c6f676f3d5265647578266c6f676f436f6c6f723d464646464646266c6162656c3d
[10]: https://redux.js.org/
[11]: https://utilmond.com
[12]: https://github.com/fum4/npm/actions
[13]: https://camo.githubusercontent.com/a5f1968a99631284ca552953929cff7b6abb375853bb0944fae0dc520c45c73b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d52656163742b526f7574657226636f6c6f723d434134323435266c6f676f3d52656163742b526f75746572266c6f676f436f6c6f723d464646464646266c6162656c3d
[14]: https://reactrouter.com/en/main
