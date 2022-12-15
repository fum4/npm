import type { ActionTypes, RouterLocation, LocationState } from './types';

export const selectAction = (state): ActionTypes => state.router.action;
export const selectIsSkipping = (state): boolean => state.router.isSkipping;
export const selectForceRender = (state): Record<never, never> => selectCurrentLocationState(state)?.forceRender;
export const selectLocationHistory = (state): RouterLocation<LocationState>[] => state.router.locationHistory;
export const selectCurrentIndex = (state): number => state.router.currentIndex;
export const selectCurrentLocation = (state): RouterLocation<LocationState> => state.router.locationHistory[state.router.currentIndex];
export const selectCurrentLocationState = (state): LocationState => selectCurrentLocation(state).state;
export const selectPreviousLocation = (state): RouterLocation<LocationState> => state.router.locationHistory[state.router.currentIndex - 1];
export const selectNextLocation = (state): RouterLocation<LocationState> => state.router.locationHistory[state.router.currentIndex + 1];
