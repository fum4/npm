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

<a href="https://www.sentry.io"><img alt="Sponsor - Sentry" width="250px" src="https://i.ibb.co/1v7GSBd/sentry.png" /></a>

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
