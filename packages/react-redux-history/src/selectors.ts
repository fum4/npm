import type { AppState } from "./types";

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
  state.router.locationHistory[state.router.currentIndex];
export const selectCurrentLocationState = (state: AppState) =>
  selectCurrentLocation(state).state;
export const selectCurrentLocationIndex = (state: AppState) =>
  state.router.currentIndex;
export const selectPreviousLocation = (state: AppState) =>
  state.router.locationHistory[state.router.currentIndex - 1];
export const selectNextLocation = (state: AppState) =>
  state.router.locationHistory[state.router.currentIndex + 1];
