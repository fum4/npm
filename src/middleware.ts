import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import type { History } from 'history';
import type { Middleware } from 'redux';
import findIndex from 'lodash/findIndex';

import {
  push,
  replace,
  back,
  forward,
  setSkipping,
} from './slice';

import {
  selectHistory,
  selectIsSkipping,
  selectCurrentIndex,
  selectLocationState
} from './selectors';

import {
  ActionTypes,
  LocationState,
  LocationChange
} from './types';

import { isForwardAction, isBackAction } from './helpers';

const createRouterMiddleware = (historyApi: History): Middleware => {
  return (store) => (next) => (action: LocationChangeAction<LocationState>) => {
    if (action.type === LOCATION_CHANGE && !action.payload?.isFirstRendering) {
      const { payload: { action: routerAction, location } } = action;

      switch (routerAction) {
        case ActionTypes.PUSH:
          return next(push(action.payload));

        case ActionTypes.REPLACE:
          return next(replace(action.payload));

        case ActionTypes.POP: {
          const state = store.getState();
          const history = selectHistory(state);
          const isSkipping = selectIsSkipping(state);
          const currentIndex = selectCurrentIndex(state);
          const { skipForward, skipBack } = selectLocationState(state) || {};
          const payload: LocationChange = { ...action.payload };

          if (isForwardAction(location, history, currentIndex)) {
            const nextLocationIndex = skipForward ? (
              // Check if target location index is out of bounds
              currentIndex + skipForward < history.length
                ? currentIndex + skipForward
                : history.length - 1
            ) : (
              // location.key is undefined when manually changing the URL!
              location.key
                ? findIndex(history, { key: location.key })
                : currentIndex + 1
            );

            // How many routes left to skip in order to reach the target one.
            // Keep in mind that one transition has already been made by clicking the forward button
            const routesToSkip = skipForward && nextLocationIndex - currentIndex - 1;

            if (routesToSkip) {
              historyApi.go(routesToSkip);
            }

            payload.isSkipping = !!routesToSkip;
            payload.nextLocationIndex = nextLocationIndex;

            return next(forward(payload));
          }

          if (isBackAction(location, history, currentIndex)) {
            const nextLocationIndex = skipBack ? (
              // Check if target location index is out of bounds
              currentIndex >= skipBack
                ? currentIndex - skipBack
                : 0
            ) : (
              // location.key is undefined when manually changing the URL!
              location.key
                ? findIndex(history, { key: location.key })
                : currentIndex - 1
            );

            // How many routes left to skip in order to reach the target one.
            // Keep in mind that one transition has already been made by clicking the back button
            const routesToSkip = skipBack && nextLocationIndex - currentIndex + 1;

            if (routesToSkip) {
              historyApi.go(routesToSkip);
            }

            payload.isSkipping = !!routesToSkip;
            payload.nextLocationIndex = nextLocationIndex;

            return next(back(payload));
          }

          if (isSkipping) {
            return setTimeout(() => next(setSkipping(false)));
          }
        }
      }
    }

    return next(action);
  };
};

export default createRouterMiddleware;
