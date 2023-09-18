import type { History } from "history";

import createRouterMiddleware from "./middleware";
import createRouterSlice from "./slice";
import type { Options } from "./types";

export const configureRouterHistory = (
  history: History,
  {
    storageKey = "routerState",
    storageLimit = Infinity,
  } = {} as Partial<Options>,
) => {
  const { reducer, actions } = createRouterSlice(history, {
    storageKey,
    storageLimit,
  });
  // @ts-ignore
  const middleware = createRouterMiddleware(history, actions);

  return {
    routerReducer: reducer,
    routerMiddleware: middleware,
  };
};

export * from "./actions";
export * from "./selectors";
export * from "./LocationListener";
export * from "./types";
