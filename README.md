<img src="https://i.ibb.co/LnwWJ0g/react-redux-history.png" alt="react-redux-history-logo" />

<!-- Shields -->

![maintained][1]
![minsize][2]
[![npm][3]][4]
[![license][5]][6]

# ⚛ Navigation history made easy!

### A simple, lightweight library for managing navigation history in React and Redux.

#### Used in production by [Utilmond][13]. Check it out!

<br>

## 👌 Have any requests?
For any requests such as new features, backwards compatibility with `react-router 5`, other routing libraries or environments such as `Cordova` please [open a GitHub issue][15]. 

Some of them are already implemented and will be incrementally added. 

If you are in a rush though please [open an issue][15], this way we can prioritize correspondingly :)

<br>

## ✨ Features

📜 Saves all routing history in store and offers selectors for easy access

🌲 History is persisted after reloading the page

⏭️ Skipping screens capability out of the box just by passing a flag when navigating

💪 Force current route to re-render capability

⛵ Intercept location changes before they are rendered on screen

👀 Everything you need to know about your navigation state and history directly in your favorite developer tools

<br>

<img src="https://i.ibb.co/Y7xv9W9/react-redux-history-store-snapshot.png" alt="Redux DevTools with router history" width="500" />

<br>

## 📤 Installation

```shell
npm install react-redux-history react react-redux react-router history
```

<br>

## 🔗 Setup

### Step 1)

Create a history object:

```javascript
// store.js
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory() // export this as we will need it later
```

### Step 2)

Pass the `history` object as an argument to `configureRouterHistory`. The returned reducer and middleware will be used to connect to the store.

```javascript
// store.js
import { configureRouterHistory } from 'react-router-redux-history'

const { routerReducer, routerMiddleware } = configureRouterHistory(history)
```

### Step 3)

Add the reducer and middleware to your store. If you are using Redux Toolkit it might look something like this:

```javascript
// store.js
const store = configureStore({
  reducer: combineReducers({
    // ...other reducers
    router: routerReducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    // ...other middleware
    .prepend(routerMiddleware)
});

export default store
```

### Step 4)

Lastly, add either `<LocationListener history={history} />` or `useLocationListener(history)` somewhere at the root of your app.

**Only use one of the approaches!** They are only exported like this for flexibility :)

```javascript
// App.tsx
import { useLocationListener, LocationListener } from 'react-redux-history'
import { history } from 'src/store'

const App = () => {
  useLocationListener(history) // Use either this or the component below, not both!
  
  return (
    <>
      ...
      <LocationListener history={history} />
      ...
    </>
  )
}
```

**Note**: the `history` object provided to `configureRouterHistory` and `useLocationListener` / `LocationListener` must be the same `history` object !

<br>

## ⏭️ Skip back / forward

By setting a `skipBack` / `skipForward` flag on a specific route the user will be automatically skipped over certain routes.

```javascript
history.push({
  pathname: 'page_5',
  state: { skipBack: 4 }
});
```

In this example, every time the user will try to go back from *page_5* he will be skipped back 4 pages, reaching *page_1*. The same behaviour will apply when going forward from *page_1*, the user will be skipped forward to *page_5*.

**Note**: Due to the restrictive nature of browser navigation, back or forward actions cannot be stopped. That means that in the previous example the user will actually reach *page_4* before being redirected to *page_1*. If there is conflicting logic (such as extra redirects) in *page_4*, it will be fired before the middleware manages to completely skip all screens. In order to get past this issue we can use the `isSkipping` flag to, for instance, not render the component tree while skipping. You can find a selector for this in the selectors section.

<br>

## 💪 Force current route to re-render

Sometimes you might want to force the current route to re-render, a behaviour which is not possible out of the box with `react-router`.

This can be achieved by selecting the `forceRender` state in the component you wish to re-render. Then simply 're-navigate' to the route while passing `forceRender: {}` in the state object. 

*The `forceRender` flag can also be used as a dependency in order to re-trigger effects.*

<br>

## ⛵ Navigate away

We provide the `useNavigateAway` hook in order to intercept location changes before React gets a chance to paint them on screen.

Historically, `react-router` provided a way to block user navigation. As it is an anti-pattern and provides a bad user experience it has been highly controversial, being removed just to be added back in later versions because lots of users relied on it.

We do not endorse this approach, but we do understand that sometimes it is necessary. However, we suggest using this hook more as a solution to **manipulating** the navigation flow, rather than **blocking** it. An example would be replacing the next location or editing its state.

<br>

## 🌲 Persistent history

History is persisted even after page refresh by using local storage to save the state on page hide.

<br>

## 🚦 Selectors for easy access

There are also a few useful selectors for easy access:

- selectAction
- selectIsSkipping
- selectForceRender
- selectLocationHistory
- selectCurrentIndex
- selectCurrentLocation
- selectCurrentLocationState
- selectPreviousLocation
- selectNextLocation

<br><br><br>

### Huge thanks going to [Utilmond team][14] for making this possible! 🍻

<hr>

[![react][7]][8]
[![redux][9]][10]
[![react-router][11]][12]

[1]: https://img.shields.io/maintenance/yes/2030
[2]: https://img.shields.io/bundlephobia/min/react-redux-history
[3]: https://img.shields.io/npm/v/react-redux-history?color=white
[4]: https://www.npmjs.com/package/react-redux-history
[5]: https://img.shields.io/npm/l/react-redux-history
[6]: https://github.com/fum4/react-redux-history/blob/master/LICENSE.md
[7]: https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d
[8]: https://reactjs.org/
[9]: https://camo.githubusercontent.com/3a2650b6854cb790e3af41a1cefa87df32efc07aad12d0c0f128a7fbc5998ac3/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526564757826636f6c6f723d373634414243266c6f676f3d5265647578266c6f676f436f6c6f723d464646464646266c6162656c3d
[10]: https://redux.js.org/
[11]: https://camo.githubusercontent.com/a5f1968a99631284ca552953929cff7b6abb375853bb0944fae0dc520c45c73b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d52656163742b526f7574657226636f6c6f723d434134323435266c6f676f3d52656163742b526f75746572266c6f676f436f6c6f723d464646464646266c6162656c3d
[12]: https://reactrouter.com/en/main
[13]: https://utilmond.com
[14]: https://utilmond.com/about-us
[15]: https://github.com/fum4/react-redux-history/issues
