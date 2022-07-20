import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import { PayloadAction, Reducer } from '@reduxjs/toolkit';
import type { History } from 'history';
import cloneDeep from 'lodash/cloneDeep';

import { AppRouterState, LocationChange, LocationState } from './types';

const createConnectedRouter = (history: History) => {
  const connectedRouterReducer = connectRouter<LocationState>(history) as Reducer<AppRouterState>;

  return (state?: AppRouterState, payload?: LocationChange): AppRouterState => {
    const routerAction: PayloadAction<LocationChange> = payload && {
      type: LOCATION_CHANGE,
      payload,
    };

    return connectedRouterReducer(state && cloneDeep(state), routerAction);
  };
}

export default createConnectedRouter;
