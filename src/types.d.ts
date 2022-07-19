import {
  RouterLocation,
  LocationChangePayload,
  RouterState,
  RouterActionType
} from 'connected-react-router';

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
 * @property forceRender - Flag indicating the component should be forced to re-render / re-fetch data
 * @property isAuthRedirect - Flag indicating if user has been redirected to current location after authenticating
 */
export interface LocationState {
  skipBack?: number;
  skipForward?: number;
  isAuthRedirect?: boolean;
  forceRender?: Record<never, never>;
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
