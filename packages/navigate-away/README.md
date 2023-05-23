<!-- Shields -->

[![build][1]][12]
[![license][5]][6]
[![npm][3]][4]
![minsize][2]

<br>

# ⛵ Navigate away

## Intercept and manipulate location changes

Intercept location changes before React paints them on screen.

Use this hook to manipulate the navigation flow, replace the next location or edit its state in a render friendly manner, before re-rendering the whole component tree.

<br>

# Setup <a id="setup"></a>

```shell
pnpm add navigate-away
```

```shell
yarn add navigate-away
```

```shell
npm i navigate-away
```

<br>

Instructions are pretty simple, use the hook wherever you want!

Just be sure to always pass your app's `history` object to it.

```javascript
import { useNavigateAway } from "navigate-away"
import { history } from "src/store"

const Component = () => {
  useNavigateAway(({ nextLocation, action, navigate }) => {
    if (action === "POP") {
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
import { NavigateAway } from "navigate-away"
import { history } from "src/store"

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

That's all, enjoy!

<br><br><br><br>

## 🏅 Sponsors

<br>

<a href="https://www.utilmond.com"><img alt="used by Utilmond" src="https://utilmond.com/static/images/utilmond_whitebg.svg" width="250px" /></a>

<a href="https://www.jetbrains.com/"><img alt="Sponsor - JetBrains" width="250px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png?_ga=2.63300143.1068496944.1680591996-1938842262.1680591996" /></a>

     <a href="https://www.sentry.io"><svg class="__sntry__ css-lfbo6j e10nushx4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="250" height="55" style=""><defs><style type="text/css">@media (prefers-color-scheme: dark) {path.__sntry__ { fill: #ffffff !important; }}</style></defs><path d="M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z M124.32,28.28,109.56,9.22h-3.68V34.77h3.73V15.19l15.18,19.58h3.26V9.22h-3.73ZM87.15,23.54h13.23V20.22H87.14V12.53h14.93V9.21H83.34V34.77h18.92V31.45H87.14ZM71.59,20.3h0C66.44,19.06,65,18.08,65,15.7c0-2.14,1.89-3.59,4.71-3.59a12.06,12.06,0,0,1,7.07,2.55l2-2.83a14.1,14.1,0,0,0-9-3c-5.06,0-8.59,3-8.59,7.27,0,4.6,3,6.19,8.46,7.52C74.51,24.74,76,25.78,76,28.11s-2,3.77-5.09,3.77a12.34,12.34,0,0,1-8.3-3.26l-2.25,2.69a15.94,15.94,0,0,0,10.42,3.85c5.48,0,9-2.95,9-7.51C79.75,23.79,77.47,21.72,71.59,20.3ZM195.7,9.22l-7.69,12-7.64-12h-4.46L186,24.67V34.78h3.84V24.55L200,9.22Zm-64.63,3.46h8.37v22.1h3.84V12.68h8.37V9.22H131.08ZM169.41,24.8c3.86-1.07,6-3.77,6-7.63,0-4.91-3.59-8-9.38-8H154.67V34.76h3.8V25.58h6.45l6.48,9.2h4.44l-7-9.82Zm-10.95-2.5V12.6h7.17c3.74,0,5.88,1.77,5.88,4.84s-2.29,4.86-5.84,4.86Z" fill="#362d59" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #2b2447;" class="__sntry__"></path></svg></a>

<br><br><br>

### Used in production by [Utilmond][11]

<hr>

[![react][7]][8]
[![react-router][9]][10]

[1]: https://img.shields.io/github/actions/workflow/status/fum4/npm/test.yml?branch=master&logo=github&color=029e2b
[2]: https://img.shields.io/bundlephobia/min/navigate-away?logo=supabase&logoColor=yellow
[3]: https://img.shields.io/npm/v/navigate-away?color=white&logo=npm
[4]: https://www.npmjs.com/package/navigate-away
[5]: https://img.shields.io/npm/l/navigate-away?logo=coursera&color=f2ed88
[6]: https://github.com/fum4/npm/blob/master/LICENSE.md
[7]: https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d
[8]: https://reactjs.org/
[9]: https://camo.githubusercontent.com/a5f1968a99631284ca552953929cff7b6abb375853bb0944fae0dc520c45c73b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d52656163742b526f7574657226636f6c6f723d434134323435266c6f676f3d52656163742b526f75746572266c6f676f436f6c6f723d464646464646266c6162656c3d
[10]: https://reactrouter.com/en/main
[11]: https://utilmond.com
[12]: https://github.com/fum4/npm/actions
