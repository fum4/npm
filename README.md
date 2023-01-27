<img src="https://i.ibb.co/LnwWJ0g/react-redux-history.png" alt="react-redux-history-logo" />

<div>
    <img src="https://img.shields.io/maintenance/yes/2030" alt="maintained" />
    <img src="https://img.shields.io/bundlephobia/min/react-redux-history" alt="minsize" />
    <img src="https://img.shields.io/npm/l/react-redux-history" alt="license" />
    <img src="https://img.shields.io/github/issues-raw/fum4/react-redux-history" alt="issues" />
    <img src="https://img.shields.io/npm/v/react-redux-history?color=red" alt="version" />
</div>

# ⚛ Navigation history made easy!

A simple, lightweight library for managing navigation history in React and Redux.

### Used in production by [Utilmond](https://utilmond.com). Check it out!

## 👌 Have any requests?
For any requests such as new features, backwards compatibility with `react-router 5`, other routing libraries or environments such as `Cordova` please [open a GitHub issue](https://github.com/fum4/react-redux-history/issues). 

Some of them are already implemented and will be incrementally added. 

If you are in a rush though please [open an issue](https://github.com/fum4/react-redux-history/issues), this way we can prioritize correspondingly :)

## ✨ Features

📜 Saves all routing history in store and offers selectors for easy access

🌲 History is persisted even after reloading the page

💪 Force current route to re-render

⏭️ Skipping screens capability out of the box just by passing a flag when navigating

👀 Everything you need to know about your navigation state and history directly in your favorite developer tools

<img src="https://i.ibb.co/Y7xv9W9/react-redux-history-store-snapshot.png" alt="Redux DevTools with router history" width="500" />

## 📤 Installation

```shell
npm install react-redux-history react react-redux react-router history
```

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

## 🌲 Persistent history

History is persisted even after page refresh by using local storage to save the state on page hide.

## 💪 Force current route to re-render

Sometimes you might want to force the current route to re-render, a behaviour which is not possible out of the box with `react-router`.

This can be achieved by selecting the `forceRender` state in the component you wish to re-render. Then simply 're-navigate' to the route while passing `forceRender: {}` in the state object. 

*The `forceRender` flag can also be used as a dependency in order to re-trigger effects.*

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

### Huge thanks going to [Utilmond team](https://utilmond.com/about-us) for making this possible! 🍻
