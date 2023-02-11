<img src="https://i.ibb.co/LnwWJ0g/react-redux-history.png" alt="react-redux-history-logo" />

<!-- Shields -->

![maintained][1]
![minsize][2]
[![npm][3]][4]
[![license][5]][6]

<br>

# ⚛ Navigation history made easy!

## A powerful, lightweight library for managing navigation history in React and Redux.

### Used in production by [Utilmond][13]. Check it out!

<br>

## 👌 Have any requests?

For any requests such as new features, compatibility with other routing libraries or environments such as Cordova please [open a GitHub issue][15]. 

Some of them are already implemented and will be incrementally added. 

If you are in a rush though you can [open an issue][15], this way we can prioritize correspondingly :)

<br>

## ✨ Features

📜 Save all navigation history in store. [Get started](#setup)

🌲 Persist history after reloading the page. [Read more](#persist)

⏭️ Skipping screens capability out of the box just by passing a flag when navigating. [Read more](#skip-back)

⛵ Intercept location changes before they are rendered on screen. [Read more](#navigate-away)

💪 Force current route to re-render capability. [Read more](#force-render)

🚦 Selectors for easy access. [Read more](#selectors)

<br>

...and last but not least

👀 Everything you need to know about your navigation state in your favorite developer tools:

<br>

<img src="https://i.imgur.com/K2fjcwH.png" alt="Redux DevTools with router history" width="500" />

<br>
<br>

# Setup <a id="setup"></a>

### Step 1)

Let's get started by installing the package:

```shell
npm install react-redux-history react react-redux react-router history
```

<br>

### Step 2)

Create a `history` object and pass it to `configureRouterHistory`. The returned reducer and middleware will be used to connect to the store.

```javascript
// store.js
import { createBrowserHistory } from 'history'
import { configureRouterHistory } from 'react-redux-history'

export const history = createBrowserHistory() // export this as we will need it later

// optional, defaults are listed below
const options = {
  storageKey: 'routerState',
  storageLimit: Infinity,
}

const { 
  routerReducer, 
  routerMiddleware 
} = configureRouterHistory(history, options)
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    // ...other middleware
    .prepend(routerMiddleware)
});

export default store
```

<br>

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

<br><br>

# Configuration

The middleware can be configured by passing an options object as the second argument to `configureRouterHistory`. 

The following options are available:

- `storageKey` - the key to use when saving the state to session storage. Defaults to `routerState`
- `storageLimit` - the maximum number of entries to save in session storage. Defaults to `Infinity`

<br><br>

# Features <a id="features"></a>

This package comes with several built-in features.

They helped us a lot in our projects and we hope they will help you too!

<br>

## 🌲 Persistent history <a id="persist"></a>

History is persisted out of the box after page refresh by leveraging session storage on page hide. 

This helps provide a better user experience and allows you to build a more robust navigation system.

<br>

## ⏭️ Skip back / forward <a id="skip-back"></a>

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

## ⛵ Navigate away <a id="navigate-away"></a>

We provide the `useNavigateAway` hook in order to intercept location changes before React gets a chance to paint them on screen.

**Context:** Historically, react-router has provided a way to block user navigation. Even so, this is a bad practice and provides a bad experience to the user. More than that, it has been heavily misused. The feature was therefore removed and added back later because lots of users already relied on it.

We do not endorse this approach, but we do understand that sometimes it is necessary. However, we suggest using this hook more as a solution to **manipulating** the navigation flow, rather than **blocking** it. An example would be replacing the next location or editing its state.

```javascript
import { useNavigateAway } from 'react-redux-history'
import { history } from 'src/store'

const Component = () => {
  useNavigateAway(({ nextLocation, action, navigate }) => {
    if (action === 'POP') {
      const updatedLocation = {
        ...nextLocation,
        state: {
          ...nextLocation.state,
          someFlag: true
        }
      }

      navigate(updatedLocation) 
    }
  }, history)
  
  // ...
}
```

There is also a _component_ version of the hook.

It comes handy when dealing with libraries such as Formik and you need to pass Formik props to the hook:

```javascript
import { NavigateAway } from 'react-redux-history'
import { history } from 'src/store'

const Component = () => {
  // ...
  
  return (
    <Formik>
      {(formikProps) => (
        <NavigateAway
          history={history}
          callback={({ nextLocation, action, navigate }) => {
            // Pass the Formik props to the callback
          }}
       />
      )}
    </Formik>
  )
}
```

<br>

## 💪 Force current route to re-render <a id="force-render"></a>

Sometimes you might want to force the current route to re-render, a behaviour which is not possible out of the box with react-router.

This can be achieved by selecting the `forceRender` state in the component you wish to re-render. Then simply 're-navigate' to the route while passing `forceRender: {}` in the state object. 

```javascript
import { useSelector } from 'react-redux'
import { selectForceRender } from 'react-redux-history'

const Component = () => {
    // The component will re-render every time the `forceRender` flag reference changes
    const forceRender = useSelector(selectForceRender)
    
    useEffect(() => {
      // The flag can also be used as a dependency in order to re-trigger effects
    }, [ forceRender ])
    
    return (
      <button onClick={() => {
        history.push({
          // By default `react-router` will not trigger re-rendering when the pathname is the same
          pathname: 'current_pathname', 
          state: { 
            // Simply pass a new object to force re-rendering
            forceRender: {} 
          } 
        })
      }}>
        Re-render
      </button>
    )
}
```

<br>

## 🚦 Selectors for easy access <a id="selectors"></a>

There are also a few useful selectors for easy access:

- `selectAction`
- `selectIsSkipping`
- `selectForceRender`
- `selectLocationHistory`
- `selectCurrentIndex`
- `selectCurrentLocation`
- `selectCurrentLocationState`
- `selectPreviousLocation`
- `selectNextLocation`

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
[16]: https://github.com/fum4/react-redux-history/pulls
[17]: https://www.npmjs.com/package/connected-react-router
[18]: https://www.npmjs.com/package/redux-first-history
