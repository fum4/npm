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

export { ConnectedRouter } from 'connected-react-router';
export * from './selectors';
