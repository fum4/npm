import createRouterMiddleware from "./middleware";
import createRouterSlice from "./slice";
import { createNavigationShim } from "./shims";
import type { Config } from "./types";

export const configureRouterHistory = ({
  router,
  history,
  ...options
}: Partial<Config>) => {
  if (!router && !history) {
    throw new Error('`router` or `history` must be provided');
  }

  // @ts-ignore
  const { location: initialLocation } = router?.state || history;
  const { reducer, actions } = createRouterSlice(initialLocation, options);
  const navigation = createNavigationShim({ router, history });
  // @ts-ignore
  const middleware = createRouterMiddleware(navigation, actions);

  return {
    routerReducer: reducer,
    routerMiddleware: middleware,
  };
};

export * from "./actions";
export * from "./selectors";
export * from "./LocationListener";
export * from "./types";
