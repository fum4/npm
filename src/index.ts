import type { History } from 'history';

import createRouterMiddleware from './middleware';
import createRouterSlice from './slice';

export const configureRouterHistory = (history: History) => {
  const { routerReducer, routerActions } = createRouterSlice(history);
  const routerMiddleware = createRouterMiddleware(history, routerActions);

  return {
    routerReducer,
    routerMiddleware
  };
}

export * from './selectors';
export * from './LocationListener';
