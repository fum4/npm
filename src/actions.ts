import { Action, type To } from 'history';

export const push = (to: To, state?: any) => (dispatch) => {
  const location = typeof to === 'string' ? { pathname: to, state } : { ...to, state };

  dispatch({ type: Action.Push, payload: { location } });
};

export const replace = (to: To, state?: any) => (dispatch) => {
  const location = typeof to === 'string' ? { pathname: to, state } : { ...to, state };

  dispatch({ type: Action.Replace, payload: { location } });
};

export const go = (delta: number) => (dispatch) => {
  dispatch({ type: Action.Pop, payload: { delta } });
};

export const forward = () => go(1);
export const back = () => go(-1);
