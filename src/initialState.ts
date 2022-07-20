import { ActionTypes, AppRouterState } from '../types';
import persistOnPageHide from './persist';

import {
  verifyState,
  isSameRoute,
  isPreviousRoute,
  isNextRoute
} from './helpers'

const getInitialState = (runConnectedRouter): AppRouterState => {
  const serializedSessionRouterState = sessionStorage.getItem('routerState');
  const sessionRouterState = serializedSessionRouterState && JSON.parse(serializedSessionRouterState);
  const isSessionRouterStateValid = verifyState(sessionRouterState);
  const { location, action } = runConnectedRouter();

  const defaultState: AppRouterState = {
    history: [ location ],
    currentIndex: 0,
    isSkipping: false,
    actionAlias: action as ActionTypes,
    action,
    location,
  };

  const initialState = isSessionRouterStateValid ? sessionRouterState : defaultState;

  if (isSessionRouterStateValid) {
    const isRefresh = isSameRoute(location, initialState.history, initialState.currentIndex);

    if (!isRefresh) {
      const isPreviousLocation = isPreviousRoute(location, initialState.history, initialState.currentIndex);
      const isNextLocation = isNextRoute(location, initialState.history, initialState.currentIndex);
      const isNewLocation = !isPreviousLocation && !isNextLocation;

      if (isPreviousLocation) {
        initialState.currentIndex -= 1;
        initialState.actionAlias = ActionTypes.BACK;
        initialState.action = ActionTypes.POP;
      }

      if (isNextLocation) {
        initialState.currentIndex += 1;
        initialState.actionAlias = ActionTypes.FORWARD;
        initialState.action = ActionTypes.POP;
      }

      if (isNewLocation) {
        initialState.currentIndex += 1;
        initialState.actionAlias = ActionTypes.PUSH;
        initialState.action = ActionTypes.PUSH;
        initialState.history.splice(initialState.currentIndex, initialState.history.length, location);
      }
    }

    initialState.location = location;
    initialState.isSkipping = false;
  }

  persistOnPageHide(initialState);

  return initialState;
};

export default getInitialState;
