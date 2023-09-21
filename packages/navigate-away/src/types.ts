import type { NavigateFunction } from 'react-router';
import type { Router } from '@remix-run/router';
import type { Action, Location, History } from 'history';

export type NavigateAwayCallback = ({
  action,
  nextLocation,
}: NavigateAwayCallbackParams) => void;

export interface NavigateAwayCallbackParams {
  action: Action;
  nextLocation: Location;
  navigate: NavigateFunction;
}

export interface NavigateAwayProps {
  callback: NavigateAwayCallback;
  history?: History;
  router?: Router;
}
