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

<hr>

#### Compatible with both react-router v6 and v5 API

<hr>

<br>

# Setup <a id="setup"></a>

```shell
pnpm add navigate-away
```

```shell
npm i navigate-away
```

```shell
yarn add navigate-away
```

<br>

Instructions are pretty simple, use the hook wherever you want!

Just be sure to always pass your app's `router` object to it (or `history` if working with `react-router` v5 API)

```javascript
import { useNavigateAway } from 'navigate-away'
import { router } from 'src/store'

const Component = () => {
  useNavigateAway(({ nextLocation, action, navigate }) => {
    // do something with the location
    if (action === 'POP') {
      const updatedLocation = {
        ...nextLocation,
        state: {
          ...nextLocation.state,
          someFlag: true
        }
      }

      // then navigate
      navigate(updatedLocation)
    }
  }, router) // use the `history` object if working with `react-router` v5 API

  // ...
}
```

There is also a _component_ version of the hook.

It comes handy when dealing with libraries such as Formik and you need to pass Formik props to the hook:

```javascript
import { NavigateAway } from 'navigate-away'
import { router } from 'src/store'

const Component = () => {
  // ...

  return (
    <Formik>
      {(formikProps) => (
        <NavigateAway
          router={router}
          callback={({ nextLocation, action, navigate }) => {
            // use Formik props in the callback
          }}
        />
      )}
    </Formik>
  )
}
```

That's all, enjoy!

<br><br><br><br>

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
