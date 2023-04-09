import { type PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import type { Location, History } from 'history';

import getInitialState from './initialState';
import { persistOnPageHide } from './persist';
import { parseLocation } from './helpers';
import { type AppRouterState, type Options, ActionTypes } from './types';

const createRouterSlice = (history: History, { storageKey, storageLimit }: Options) => (
  createSlice({
    name: 'router',
    initialState: getInitialState(history, { storageKey, storageLimit }),
    reducers: {
      push: (state: AppRouterState, action: PayloadAction<Location>) => {
        const location = parseLocation(action.payload);

        state.currentIndex += 1;
        state.action = ActionTypes.Push;
        state.locationHistory.splice(state.currentIndex, state.locationHistory.length, location);

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      replace: (state: AppRouterState, action: PayloadAction<Location>) => {
        const location = parseLocation(action.payload);
        // Copy skip flags when replacing in case they are not overwritten by new state
        const { skipBack, skipForward } = state.locationHistory[state.currentIndex].state;

        if (!location.state?.skipBack && skipBack) {
          location.state = { ...location.state, skipBack };
        }

        if (!location.state?.skipForward && skipForward) {
          location.state = { ...location.state, skipForward };
        }

        state.action = ActionTypes.Replace;
        state.locationHistory.splice(state.currentIndex, 1, location);

        delete state.locationHistory[state.currentIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      back: (state: AppRouterState, action: PayloadAction<{ nextLocationIndex: number, isSkipping: boolean }>) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping back we also want to skip forward at some point
          const skipForward = state.currentIndex - nextLocationIndex;

          state.locationHistory[nextLocationIndex].state = {
            ...state.locationHistory[nextLocationIndex].state,
            skipForward,
          };
        } else {
          // Delete flag when no longer accurate
          delete state.locationHistory[nextLocationIndex].state?.skipForward;
        }

        state.isSkipping = isSkipping;
        state.action = ActionTypes.Back;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      forward: (state: AppRouterState, action: PayloadAction<{ nextLocationIndex: number, isSkipping: boolean }>) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping forward we also want to skip back at some point
          const skipBack = nextLocationIndex - state.currentIndex;

          state.locationHistory[nextLocationIndex].state = {
            ...state.locationHistory[nextLocationIndex].state,
            skipBack,
          };
        } else {
          // Delete flag when no longer accurate
          delete state.locationHistory[nextLocationIndex].state?.skipBack;
        }

        state.isSkipping = isSkipping;
        state.action = ActionTypes.Forward;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      setSkipping: (state: AppRouterState, action: PayloadAction<boolean>) => {
        state.isSkipping = action.payload;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
    },
  })
);

export default createRouterSlice;
