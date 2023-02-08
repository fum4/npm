import type { History } from 'history';

import createRouterMiddleware from './middleware';
import createRouterSlice from './slice';
import type { Options } from './types';

export const configureRouterHistory = (
  history: History,
  {
    storageKey = 'routerState',
    storageLimit = Infinity
  } = {} as Partial<Options>
) => {
  const { routerReducer, routerActions } = createRouterSlice(history, { storageKey, storageLimit });
  const routerMiddleware = createRouterMiddleware(history, routerActions);

  return {
    routerReducer,
    routerMiddleware
  };
}

export * from './selectors';
export * from './LocationListener';
export * from './useNavigateAway';
