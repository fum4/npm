import { createSlice, current, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import cloneDeep from 'lodash/cloneDeep';

import initialState from './initialState';
import persistOnPageHide from './persist';

import {
  LocationState,
  AppRouterState,
  LocationChange,
  ActionTypes
} from './types';

/**
 * @tutorial Skip over a specific number of screens when navigating back / forward:
 *
 * SKIP BACK - history.push({ pathname: path, state: { skipBack: number_of_screens_to_skip } })
 * SKIP FORWARD - history.push({ pathname: path, state: { skipForward: number_of_screens_to_skip } })
 *
 * Any history method can be used, what is important is to add the corresponding property on the state object.
 *
 * e.g. Let's consider the following history stack: [ '/screen1', '/screen2', '/screen3' ]
 * The current location is '/screen3'. We use history.push({ pathname: '/screen4', state: { skipBack: 3 } })
 * When the user tries to go back from '/screen4' he will be automatically redirected to '/screen1'.
 * We can therefore say that the router skipped 3 screens ('/screen4', '/screen3' and '/screen2') in order to reach '/screen1'.
 */

// TODO: remove this, leave it for end-user
export const history: History<LocationState> = createBrowserHistory();

const connectedRouterReducer = connectRouter<LocationState>(history) as Reducer<AppRouterState>; // TODO: should get rid of this

// At this point we only use the connected-router reducer to parse query params
// TODO: We might try to get rid of this in favor of handling the logic by ourselves
export const runConnectedRouter = (state?: AppRouterState, payload?: LocationChange): AppRouterState => {
  const routerAction: PayloadAction<LocationChange> = payload && {
    type: LOCATION_CHANGE,
    payload,
  };

  return connectedRouterReducer(state && cloneDeep(state), routerAction);
};

const slice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    push: (state: AppRouterState, action: PayloadAction<LocationChange>) => {
      const newState = runConnectedRouter(state, action.payload);

      newState.currentIndex += 1;
      newState.action = ActionTypes.PUSH;
      newState.actionAlias = ActionTypes.PUSH;
      newState.history.splice(newState.currentIndex, newState.history.length, newState.location);

      persistOnPageHide(newState);

      return newState;
    },
    replace: (state: AppRouterState, action: PayloadAction<LocationChange>) => {
      const newState = runConnectedRouter(state, action.payload);
      // Copy skip flags when replacing in case they are not overwritten by new state
      const { skipBack, skipForward } = state.location.state || {};

      if (!newState.location.state?.skipBack && skipBack) {
        newState.location.state = { ...newState.location.state, skipBack };
      }

      if (!newState.location.state?.skipForward && skipForward) {
        newState.location.state = { ...newState.location.state, skipForward };
      }

      newState.action = ActionTypes.REPLACE;
      newState.actionAlias = ActionTypes.REPLACE;
      newState.history.splice(newState.currentIndex, 1, newState.location);

      persistOnPageHide(newState);

      return newState;
    },
    back: (state: AppRouterState, action: PayloadAction<LocationChange>) => {
      const { nextLocationIndex, isSkipping = false } = action.payload;

      state.location = state.history[nextLocationIndex];

      if (isSkipping) {
        // When skipping back we also want to skip forward at some point
        const skipForward = state.currentIndex - nextLocationIndex;

        state.location.state = { ...state.location.state, skipForward };
      } else {
        // Delete the flag when it is no longer accurate
        delete state.location.state?.skipForward;
      }

      state.isSkipping = isSkipping;
      state.action = ActionTypes.POP;
      state.actionAlias = ActionTypes.BACK;
      state.currentIndex = nextLocationIndex;

      persistOnPageHide(current(state));
    },
    forward: (state: AppRouterState, action: PayloadAction<LocationChange>) => {
      const { nextLocationIndex, isSkipping = false } = action.payload;

      state.location = state.history[nextLocationIndex];

      if (isSkipping) {
        // When skipping forward we also want to skip back at some point
        const skipBack = nextLocationIndex - state.currentIndex;

        state.location.state = { ...state.location.state, skipBack };
      } else {
        // Delete the flag when it is no longer accurate
        delete state.location.state?.skipBack;
      }

      state.isSkipping = isSkipping;
      state.action = ActionTypes.POP;
      state.actionAlias = ActionTypes.FORWARD;
      state.currentIndex = nextLocationIndex;

      persistOnPageHide(current(state));
    },
    setSkipping: (state: AppRouterState, action: PayloadAction<boolean>) => {
      state.isSkipping = action.payload;

      persistOnPageHide(current(state));
    },
  },
});

export const {
  push,
  replace,
  back,
  forward,
  setSkipping,
} = slice.actions;

export default slice.reducer;
