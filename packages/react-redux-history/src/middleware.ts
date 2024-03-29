import { Action } from 'history';
import type { Middleware } from 'redux';

import {
  selectCurrentLocationIndex,
  selectCurrentLocationState,
  selectIsSkippingRoutes,
  selectLocationHistory,
} from './selectors';
import {
  findIndex,
  isBackAction,
  isForwardAction,
  transformLocation,
} from './helpers';
import type { NavigationShim } from './types';

import {
  LOCATION_CHANGED,
  LOCATION_CHANGE_REQUEST,
  type LocationChangeRequestAction,
  type LocationChangedAction,
  type SliceActions,
} from './types';

const createRouterMiddleware =
  (navigation: NavigationShim, sliceActions: SliceActions): Middleware =>
  (store) =>
  (next) =>
  (action: LocationChangedAction | LocationChangeRequestAction) => {
    // Listen for history changes and update the store
    if (action.type === LOCATION_CHANGED) {
      const {
        payload: { type, location },
      } = action;

      switch (type) {
        case Action.Push:
          return next(sliceActions.push(transformLocation(location)));

        case Action.Replace:
          return next(sliceActions.replace(transformLocation(location)));

        case Action.Pop: {
          const state = store.getState();
          const history = selectLocationHistory(state);
          const isSkipping = selectIsSkippingRoutes(state);
          const currentIndex = selectCurrentLocationIndex(state);
          const { skipForward, skipBack } = selectCurrentLocationState(state);

          if (isForwardAction(location, history, currentIndex)) {
            const nextLocationIndex = skipForward
              ? // Check if target location index is out of bounds
                currentIndex + skipForward < history.length
                ? currentIndex + skipForward
                : history.length - 1
              : // location.key is undefined when manually changing the URL!
              location.key
              ? findIndex(history, { key: location.key })
              : currentIndex + 1;

            // How many routes left to skip in order to reach the target one.
            // Keep in mind that one transition has already been made by clicking the forward button
            const routesToSkip = skipForward
              ? nextLocationIndex - currentIndex - 1
              : 0;

            if (routesToSkip) {
              navigation.go(routesToSkip);
            }

            return next(
              sliceActions.forward({
                isSkipping: Boolean(routesToSkip),
                nextLocationIndex,
              }),
            );
          }

          if (isBackAction(location, history, currentIndex)) {
            const nextLocationIndex = skipBack
              ? // Check if target location index is out of bounds
                currentIndex >= skipBack
                ? currentIndex - skipBack
                : 0
              : // location.key is undefined when manually changing the URL!
              location.key
              ? findIndex(history, { key: location.key })
              : currentIndex - 1;

            // How many routes left to skip in order to reach the target one.
            // Keep in mind that one transition has already been made by clicking the back button
            const routesToSkip = skipBack
              ? nextLocationIndex - currentIndex + 1
              : 0;

            if (routesToSkip) {
              navigation.go(routesToSkip);
            }

            return next(
              sliceActions.back({
                isSkipping: Boolean(routesToSkip),
                nextLocationIndex,
              }),
            );
          }

          if (isSkipping) {
            return setTimeout(() => next(sliceActions.setSkipping(false)));
          }
        }
      }
    }

    // Listen for location change requests and update history
    if (action.type === LOCATION_CHANGE_REQUEST) {
      const {
        payload: { type, location, delta },
      } = action;

      switch (type) {
        case Action.Push: {
          const { state, ...locationWithoutState } = location!;

          return navigation.push(locationWithoutState, state);
        }
        case Action.Replace: {
          const { state, ...locationWithoutState } = location!;

          return navigation.replace(locationWithoutState, state);
        }
        case Action.Pop: {
          return navigation.go(delta!);
        }
      }
    }

    return next(action);
  };

export default createRouterMiddleware;
