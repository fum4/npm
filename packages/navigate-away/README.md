<!-- Shields -->

![maintained][1]
![minsize][2]
[![npm][3]][4]
[![license][5]][6]

<br>

# ⛵ Navigate away

## Intercept location changes before they are rendered on screen

### Used in production by [Utilmond][11]. Check it out!

# Setup <a id="setup"></a>

```shell
npm install navigate-away react react-router history
```

```shell
pnpm add navigate-away react react-router history
```

```shell
yarn add navigate-away react react-router history
```

<br>

### `useNavigateAway` hook is provided in order to intercept location changes before React gets a chance to paint them on screen.

<br>

Historically, react-router has provided a way to block user navigation. Even so, this is a bad practice and provides a bad experience to the user. More than that, it has been heavily misused. The feature was therefore removed and added back later because lots of users already relied on it.

We do not endorse this approach, but we do understand that sometimes it is necessary. However, we suggest using this hook more as a solution to **manipulating** the navigation flow, rather than **blocking** it. An example would be replacing the next location or editing its state.

<br>

```javascript
import { useNavigateAway } from "react-redux-history";
import { history } from "src/store";

const Component = () => {
  useNavigateAway(({ nextLocation, action, navigate }) => {
    if (action === "POP") {
      const updatedLocation = {
        ...nextLocation,
        state: {
          ...nextLocation.state,
          someFlag: true,
        },
      };

      navigate(updatedLocation);
    }
  }, history);

  // ...
};
```

There is also a _component_ version of the hook.

It comes handy when dealing with libraries such as Formik and you need to pass Formik props to the hook:

```javascript
import { NavigateAway } from "react-redux-history";
import { history } from "src/store";

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
  );
};
```

<br><br><br>

<hr>

[![react][7]][8]
[![react-router][9]][10]

<br>

## 🏅 Sponsors

<img alt="Sponsor - JetBrains" width="250px" height="250px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png?_ga=2.63300143.1068496944.1680591996-1938842262.1680591996" />

[1]: https://img.shields.io/maintenance/yes/2030
[2]: https://img.shields.io/bundlephobia/min/navigate-away
[3]: https://img.shields.io/npm/v/navigate-away?color=white
[4]: https://www.npmjs.com/package/navigate-away
[5]: https://img.shields.io/npm/l/navigate-away
[6]: https://github.com/fum4/nomadware-oss/blob/master/packages/navigate-away/LICENSE.md
[7]: https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d
[8]: https://reactjs.org/
[9]: https://camo.githubusercontent.com/a5f1968a99631284ca552953929cff7b6abb375853bb0944fae0dc520c45c73b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d52656163742b526f7574657226636f6c6f723d434134323435266c6f676f3d52656163742b526f75746572266c6f676f436f6c6f723d464646464646266c6162656c3d
[10]: https://reactrouter.com/en/main
[11]: https://utilmond.com
