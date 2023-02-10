import type { NavigateFunction } from 'react-router';
import type { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import type { Action, Location, Update, History } from 'history';

export enum ActionTypes {
  Push = 'PUSH',
  Back = 'BACK',
  Forward = 'FORWARD',
  Replace = 'REPLACE',
}

/**
 * @property skipBack - Routes to automatically skip back when reaching the screen
 * @property skipForward - Routes to automatically skip forward when reaching the screen
 */
export interface LocationState {
  skipBack?: number;
  skipForward?: number;
  forceRender?: Record<never, never>;
}

export interface RouterLocation<S = LocationState> extends Location {
  state: S;
  query: Record<string, string>;
}

/**
 * @property action - Last action ('PUSH', 'REPLACE', 'BACK', 'FORWARD')
 * @property locationHistory - History of all application locations
 * @property location - Current location
 * @property currentIndex - Current location index in application history
 * @property isSkipping - Flag to inform if the UI is in the process of skipping routes.
 * It should be checked before trying to redirect and take action accordingly.
 * This will be set to true only while using skipBack / skipForward functionality (e.g. project create),
 * therefore there is no need to check the flag in places where skipBack / skipForward is not used.
 */

export interface AppRouterState<S = LocationState> {
  action: ActionTypes;
  locationHistory: RouterLocation<S>[];
  currentIndex: number;
  isSkipping: boolean;
}

export interface LocationChangePayload<S = LocationState> extends AppRouterState<S> {
  location: Location;
  isSkipping: boolean;
  nextLocationIndex?: number;
}

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export interface DispatchedLocationChangeAction {
  type: Action;
  payload: Location | { delta: number };
}

export interface LocationChangeAction {
  type: typeof LOCATION_CHANGE;
  payload: Update | LocationChangePayload;
}

export type SliceActions = CaseReducerActions<{
  push(state: AppRouterState, action: PayloadAction<Update | LocationChangePayload>): void;
  replace(state: AppRouterState, action: PayloadAction<Update | LocationChangePayload>): void;
  back(state: AppRouterState, action: PayloadAction<Update | LocationChangePayload>): void;
  forward(state: AppRouterState, action: PayloadAction<Update | LocationChangePayload>): void;
  setSkipping(state: AppRouterState, action: PayloadAction<boolean>): void;
}, 'router'>

export interface LocationListenerProps {
  history: History;
}

export type NavigateAwayCallback = ({ action, nextLocation }: NavigateAwayCallbackParams) => void;

export interface NavigateAwayCallbackParams {
  action: Action;
  nextLocation: Location;
  navigate: NavigateFunction;
}

export interface NavigateAwayProps {
  callback: NavigateAwayCallback;
  history: History;
}

export interface Options {
  storageKey: string;
  storageLimit: number;
}
