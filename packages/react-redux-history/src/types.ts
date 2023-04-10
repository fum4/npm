import type { Router } from "@remix-run/router";
import type { Action, Location, History } from "history";
import type { CaseReducerActions, PayloadAction } from "@reduxjs/toolkit";
import {To} from "@remix-run/router/history";
import {RouterNavigateOptions} from "@remix-run/router/router";

export enum HistoryAction {
  Push = "PUSH",
  Back = "BACK",
  Forward = "FORWARD",
  Replace = "REPLACE",
}

export interface RouterLocation extends Location {
  state: any;
  query: Record<string, string>;
}

/**
 * @property action - Last action ('PUSH', 'REPLACE', 'BACK', 'FORWARD')
 * @property locationHistory - History of all application locations
 * @property currentIndex - Current location index in application history
 * @property isSkipping - Flag to inform if the UI is in the process of skipping routes.
 * It should be checked before trying to redirect and take action accordingly.
 * This will be set to true only while using skipBack / skipForward functionality (e.g. project create),
 * therefore there is no need to check the flag in places where skipBack / skipForward is not used.
 */

export interface RouterState {
  action: HistoryAction;
  locationHistory: RouterLocation[];
  currentIndex: number;
  isSkipping: boolean;
}

export interface AppState {
  router: RouterState;
}

export const LOCATION_CHANGED = "@@router/LOCATION_CHANGED";
export const LOCATION_CHANGE_REQUEST = "@@router/LOCATION_CHANGE_REQUEST";

export interface LocationChangeRequestAction {
  type: typeof LOCATION_CHANGE_REQUEST;
  payload: {
    type: Action;
    location?: Location;
    delta?: number;
  };
}

export interface LocationChangedAction {
  type: typeof LOCATION_CHANGED;
  // TODO: modify payload as above
  payload: {
    type: Action;
    location: Location;
    isSkipping?: boolean;
    nextLocationIndex?: number;
  };
}

export type SliceActions = CaseReducerActions<
  {
    push(
      state: RouterState,
      action: PayloadAction<{ location: Location }>
    ): void;
    replace(
      state: RouterState,
      action: PayloadAction<{ location: Location }>
    ): void;
    back(
      state: RouterState,
      action: PayloadAction<{ nextLocationIndex: number; isSkipping: boolean }>
    ): void;
    forward(
      state: RouterState,
      action: PayloadAction<{ nextLocationIndex: number; isSkipping: boolean }>
    ): void;
    setSkipping(state: RouterState, action: PayloadAction<boolean>): void;
  },
  "router"
>;

export interface LocationListenerProps {
  history: History;
}

export type Config = Options & CreateNavigationShimPayload;

export interface Options {
  storageKey: string;
  storageLimit: number;
}

export interface CreateNavigationShimPayload {
  router: Router;
  history: History;
}

export interface NavigationShim {
  go(delta: number): void;
  push(to: To, opts?: RouterNavigateOptions): void;
  replace(to: To, opts?: RouterNavigateOptions): void;
}
