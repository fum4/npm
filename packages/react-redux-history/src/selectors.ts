import type { AppState } from './types';

export const selectHistoryAction = (state: AppState) => state.router.action;

export const selectIsSkippingRoutes = (state: AppState) =>
  state.router.isSkipping;

export const selectIsNewSession = (state: AppState) =>
  selectLocationHistory(state).length === 1;

export const selectForceRender = (state: AppState) =>
  selectCurrentLocationState(state).forceRender;

export const selectLocationHistory = (state: AppState) =>
  state.router.locationHistory;

export const selectCurrentLocation = (state: AppState) =>
  state.router.locationHistory[selectCurrentLocationIndex(state)];

export const selectCurrentLocationState = (state: AppState) =>
  selectCurrentLocation(state).state;

export const selectCurrentLocationIndex = (state: AppState) =>
  state.router.currentIndex;

export const selectPreviousLocation = (state: AppState) =>
  state.router.locationHistory[selectCurrentLocationIndex(state) - 1];

export const selectNextLocation = (state: AppState) =>
  state.router.locationHistory[selectCurrentLocationIndex(state) + 1];

export const selectBackLocation = (state: AppState) => {
  const currentLocation = selectCurrentLocation(state);
  const previousLocation = selectPreviousLocation(state);

  if (!currentLocation.state.skipBack) {
    return previousLocation;
  }

  return state.router.locationHistory[
    selectCurrentLocationIndex(state) - previousLocation.state.skipBack
  ];
};
