import type { NavigationShimPayload, NavigationShim } from './types';

export const createNavigationShim = ({
  router,
  history,
}: Partial<NavigationShimPayload>): NavigationShim => ({
  go: (delta) => {
    router ? router.navigate(delta) : history.go(delta);
  },
  push: (to, opts) => {
    router
      ? router.navigate(to, {
          ...opts,
          replace: false,
        })
      : history.push(to, opts?.state);
  },
  replace: (to, opts) => {
    router
      ? router.navigate(to, {
          ...opts,
          replace: true,
        })
      : history.replace(to, opts?.state);
  },
});
