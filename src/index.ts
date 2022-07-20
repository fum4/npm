import type { History } from 'history';

import createRouterMiddleware from './middleware';
import createRouterSlice from './slice';
export * from './selectors';

const configureRouterHistory = (history: History) => {
  const { routerReducer, routerActions } = createRouterSlice(history);
  const routerMiddleware = createRouterMiddleware(history, routerActions);

  return {
    routerReducer,
    routerMiddleware
  };
}

export default configureRouterHistory;
