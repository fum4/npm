import {
  LocationChangePayload,
  RouterActionType,
  RouterLocation,
  RouterState
} from 'connected-react-router';
import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';

export enum ActionTypes {
  POP = 'POP',
  PUSH = 'PUSH',
  BACK = 'BACK',
  FORWARD = 'FORWARD',
  REPLACE = 'REPLACE',
}

/**
 * @property skipBack - Routes to automatically skip back when reaching the screen
 * @property skipForward - Routes to automatically skip forward when reaching the screen
 */
export interface LocationState {
  skipBack?: number;
  skipForward?: number;
}

export interface LocationChange extends LocationChangePayload<LocationState> {
  nextLocationIndex?: number;
  isSkipping?: boolean;
}

/**
 * @property history - Application history
 * @property location - Current location
 * @property currentIndex - Current location index in application history
 * @property isSkipping - Flag to inform if the UI is in the process of skipping routes.
 * It should be checked before trying to redirect and take action accordingly.
 * This will be set to true only while using skipBack / skipForward functionality (e.g. project create),
 * therefore there is no need to check the flag in places where skipBack / skipForward is not used.
 * @property actionAlias - Last action in its 'extended' form ('PUSH', 'REPLACE', 'BACK', 'FORWARD')
 * @property action - Last action in its raw form (the actual action sent to the browser / router - 'PUSH', 'POP', 'REPLACE')
 */
export interface AppRouterState<S = LocationState> extends RouterState<S> {
  history: RouterLocation<S>[];
  location: RouterLocation<S>;
  currentIndex: number;
  isSkipping: boolean;
  actionAlias: ActionTypes;
  action: RouterActionType;
}

export type SliceActions = CaseReducerActions<{
  push(state: AppRouterState, action: PayloadAction<LocationChange>): AppRouterState<LocationState>;
  replace(state: AppRouterState, action: PayloadAction<LocationChange>): AppRouterState<LocationState>;
  back(state: AppRouterState, action: PayloadAction<LocationChange>): void;
  forward(state: AppRouterState, action: PayloadAction<LocationChange>): void;
  setSkipping(state: AppRouterState, action: PayloadAction<boolean>): void;
}>
