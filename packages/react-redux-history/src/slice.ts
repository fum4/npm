import { type PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import type { History } from "history";

import getInitialState from "./initialState";
import { persistOnPageHide } from "./persist";
import {
  type RouterState,
  type RouterLocation,
  type Options,
  HistoryAction,
} from "./types";

const createRouterSlice = (
  history: History,
  { storageKey, storageLimit }: Options,
) =>
  createSlice({
    name: "router",
    initialState: getInitialState(history, { storageKey, storageLimit }),
    reducers: {
      push: (state: RouterState, action: PayloadAction<RouterLocation>) => {
        state.currentIndex += 1;
        state.action = HistoryAction.Push;
        state.locationHistory.splice(
          state.currentIndex,
          state.locationHistory.length,
          action.payload,
        );

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      replace: (state: RouterState, action: PayloadAction<RouterLocation>) => {
        const newLocation = action.payload;

        // Never set flags as `false` if location is replaced
        const currentLocation = state.locationHistory[state.currentIndex];
        const { skipBack, skipForward } = currentLocation.state;

        if (skipBack) {
          newLocation.state = { ...newLocation.state, skipBack };
        }

        if (skipForward) {
          newLocation.state = { ...newLocation.state, skipForward };
        }

        state.action = HistoryAction.Replace;
        state.locationHistory.splice(state.currentIndex, 1, newLocation);

        delete state.locationHistory[state.currentIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      back: (
        state: RouterState,
        action: PayloadAction<{
          nextLocationIndex: number;
          isSkipping: boolean;
        }>,
      ) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping back we also want to skip forward
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
        state.action = HistoryAction.Back;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      forward: (
        state: RouterState,
        action: PayloadAction<{
          nextLocationIndex: number;
          isSkipping: boolean;
        }>,
      ) => {
        const { nextLocationIndex, isSkipping = false } = action.payload;

        if (isSkipping) {
          // When skipping forward we also want to skip back
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
        state.action = HistoryAction.Forward;
        state.currentIndex = nextLocationIndex;

        delete state.locationHistory[nextLocationIndex].state.forceRender;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
      setSkipping: (state: RouterState, action: PayloadAction<boolean>) => {
        state.isSkipping = action.payload;

        persistOnPageHide(current(state), { storageKey, storageLimit });
      },
    },
  });

export default createRouterSlice;
