import { Action, type To } from 'history';
import { LOCATION_CHANGE_REQUEST } from './types';

export const push = (to: To, state?: any) => (dispatch) => {
  const location = typeof to === 'string' ? { pathname: to, state } : { ...to, state };
  const payload = { location, type: Action.Push };

  dispatch({ type: LOCATION_CHANGE_REQUEST, payload });
};

export const replace = (to: To, state?: any) => (dispatch) => {
  const location = typeof to === 'string' ? { pathname: to, state } : { ...to, state };
  const payload = { location, type: Action.Replace };

  dispatch({ type: LOCATION_CHANGE_REQUEST, payload });
};

export const go = (delta: number) => (dispatch) => {
  const payload = { delta, type: Action.Pop };

  dispatch({ type: LOCATION_CHANGE_REQUEST, payload });
};

export const forward = () => go(1);
export const back = () => go(-1);
