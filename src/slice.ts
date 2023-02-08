import { createSlice, current, type PayloadAction } from '@reduxjs/toolkit';
import type { History } from 'history';

import getInitialState from './initialState';
import { persistOnPageHide } from './persist';
import { parseLocation } from './helpers';

import {
  type AppRouterState,
  type LocationChangeAction,
  type LocationChangePayload,
  type Options,
  ActionTypes
} from './types';

const createRouterSlice = (history: History, { storageKey }: Options) => {
  const routerSlice = createSlice({
    name: 'router',
    initialState: getInitialState(history, { storageKey }),
    reducers: {
      push: (state: AppRouterState, action: LocationChangeAction) => {
        const newLocation = parseLocation(action.payload.location);

        state.currentIndex += 1;
        state.action = ActionTypes.Push;
        state.locationHistory.splice(state.currentIndex, state.locationHistory.length, newLocation);

        persistOnPageHide(current(state), { storageKey });
      },
      replace: (state: AppRouterState, action: LocationChangeAction) => {
        const newLocation = parseLocation(action.payload.location);
        // Copy skip flags when replacing in case they are not overwritten by new state
        const { skipBack, skipForward } = state.locationHistory[state.currentIndex].state;

        if (!newLocation.state?.skipBack && skipBack) {
          newLocation.state = { ...newLocation.state, skipBack };
        }

        if (!newLocation.state?.skipForward && skipForward) {
          newLocation.state = { ...newLocation.state, skipForward };
        }

        state.action = ActionTypes.Replace;
        state.locationHistory.splice(state.currentIndex, 1, newLocation);

        delete state.locationHistory[state.currentIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey });
      },
      back: (state: AppRouterState, action: PayloadAction<LocationChangePayload>) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping back we also want to skip forward at some point
          const skipForward = state.currentIndex - nextLocationIndex;

          state.locationHistory[nextLocationIndex].state = {
            ...state.locationHistory[nextLocationIndex].state,
            skipForward,
          };
        } else {
          // Delete the flag when it is no longer accurate
          delete state.locationHistory[nextLocationIndex].state?.skipForward;
        }

        state.isSkipping = isSkipping;
        state.action = ActionTypes.Back;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey });
      },
      forward: (state: AppRouterState, action: PayloadAction<LocationChangePayload>) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping forward we also want to skip back at some point
          const skipBack = nextLocationIndex - state.currentIndex;

          state.locationHistory[nextLocationIndex].state = {
            ...state.locationHistory[nextLocationIndex].state,
            skipBack,
          };
        } else {
          // Delete the flag when it is no longer accurate
          delete state.locationHistory[nextLocationIndex].state?.skipBack;
        }

        state.isSkipping = isSkipping;
        state.action = ActionTypes.Forward;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey });
      },
      setSkipping: (state: AppRouterState, action: PayloadAction<boolean>) => {
        state.isSkipping = action.payload;

        persistOnPageHide(current(state), { storageKey });
      },
    },
  });

  const { actions, reducer } = routerSlice;

  return {
    routerActions: actions,
    routerReducer: reducer,
  }
}

export default createRouterSlice;
