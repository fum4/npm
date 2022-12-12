### 🚧 Beta version
<div>
    <img src="https://img.shields.io/maintenance/yes/2030" alt="maintained" />
    <img src="https://img.shields.io/github/issues-raw/fum4/react-redux-history" alt="issues" />
    <img src="https://img.shields.io/bundlephobia/min/react-redux-history" alt="minsize" />
    <img src="https://img.shields.io/npm/l/react-redux-history" alt="license" />
    <img src="https://img.shields.io/npm/v/react-redux-history?color=red" alt="version" />
</div>

# ⚛ Redux history made easy!

A simple, lightweight library for managing navigation history in React and Redux.

### Used in production by [Utilmond](https://utilmond.com). Check it out!

## ✨ Features

📜 Saves all routing history in store and offers selectors for easy access

🌲 History is persisted even after reloading the page

⏭️ Skipping screens capability out of the box just by passing a flag when navigating

👀 Everything you need to know about your navigation state and history directly in your favorite developer tools

<img src="https://i.ibb.co/CHnXqCd/redux-devtools.png" alt="Redux DevTools with router history" width="500" />

## 🔗 Installation

```shell
npm install react-redux-history react-router redux history
```

## 📤 Setup

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

Lastly, wrap your react-router routing with `ConnectedRouter` and pass the `history` object as a prop. Remember to delete any usage of `BrowserRouter` or `NativeRouter` as leaving this in will cause problems synchronising the state.
Place `ConnectedRouter` as a child of react-redux's `Provider`.

```javascript
// index.js
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-redux-history'

import store, { history } from './store'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      <> { /* your usual react-router v4/v5 routing */ }
        <Switch>
          <Route />
          <Route />
          ...
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
```

**Note**: the `history` object provided to `configureRouterHistory` and `ConnectedRouter` component must be the same `history` object!

## ⏭️ Skip back / forward

By setting a `skipBack` / `skipForward` flag on a specific route the user will be automatically skipped over certain routes.

```javascript
history.push({
  pathname: 'page_5',
  state: { skipBack: 4 }
});
```

In this example, every time the user will try to go back from *page_5* he will be skipped back 4 pages, reaching *page_1*. The same behaviour will apply when going forward from *page_1*, the user will be skipped back to *page_5*.

**Note**: due to the restrictive nature of browser navigation back or forward actions cannot be stopped. That means that in the previous example the user will actually reach *page_4* before being redirected to *page_1*. If there is conflicting logic (such as extra redirects) in *page_4* component it will be fired before the middleware manages to completely skip all screens. In order to get past this issue we can use the `isSkipping` flag to, for instance, not render the component tree while skipping. You can find a selector for this in the selectors section.

## 🌲 Persistent history

History is persisted even after page refresh by using local storage to save the state on page hide.

## 🚦 Selectors for easy access

There are also a few useful selectors for easy access:

- selectAction
- selectActionAlias
- selectIsSkipping
- selectCurrentIndex
- selectHistory
- selectCurrentLocation
- selectLocationState
- selectPreviousLocation
- selectNextLocation

**Note**: the difference between `action` and `actionAlias` is that `action` will display "POP" for both back and forward navigations. It represents the action emitted by the browser. `actionAlias` will be more descriptive by using the actual "BACK" and "FORWARD" labels.

### Huge thanks going to [Utilmond team](https://utilmond.com/about-us) and [connected-react-router](https://github.com/supasate/connected-react-router) for making this possible! 🍻
