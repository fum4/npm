import { RouterLocation } from 'connected-react-router';
import type { Action } from 'history';

import { ActionTypes, LocationState } from './types';

export const selectAction = (state): Action => state.router.action;
export const selectActionAlias = (state): ActionTypes => state.router.actionAlias;
export const selectIsSkipping = (state): boolean => state.router.isSkipping;
export const selectCurrentIndex = (state): number => state.router.currentIndex;
export const selectHistory = (state): RouterLocation<LocationState>[] => state.router.history;
export const selectLocation = (state): RouterLocation<LocationState> => state.router.location;
export const selectLocationState = (state): LocationState => selectLocation(state).state;
export const selectPreviousLocation = (state): RouterLocation<LocationState> => state.router.history[state.router.currentIndex - 1];
export const selectNextLocation = (state): RouterLocation<LocationState> => state.router.history[state.router.currentIndex + 1];
