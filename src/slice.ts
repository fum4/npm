import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import createConnectedRouter from './connected-react-router';
import getInitialState from './initialState';
import persistOnPageHide from './persist';

import {
  AppRouterState,
  LocationChange,
  ActionTypes
} from '../types';

const createRouterSlice = (history) => {
  const runConnectedRouter = createConnectedRouter(history);

  const routerSlice = createSlice({
    name: 'router',
    initialState: getInitialState(runConnectedRouter),
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

  const { actions, reducer } = routerSlice;

  return {
    routerActions: actions,
    routerReducer: reducer,
  }
}

export default createRouterSlice;
