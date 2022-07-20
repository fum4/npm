import { RouterLocation } from 'connected-react-router';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import { AppRouterState, LocationState } from '../types';

export const verifyState = (state: AppRouterState): boolean => {
  if (state) {
    const indexOutOfBounds = state.currentIndex < 0 || state.currentIndex >= state.history.length;

    return state.history.length && !indexOutOfBounds;
  }

  return false;
};

export const isSameRoute = (
  location: RouterLocation<LocationState>,
  historyStack: RouterLocation<LocationState>[],
  currentIndex: number,
): boolean => (
  location.key
    ? historyStack[currentIndex]?.key === location.key
    : isEqual(pickBy(location, Boolean), pickBy(historyStack[currentIndex], Boolean))
);

export const isPreviousRoute = (
  location: RouterLocation<LocationState>,
  historyStack: RouterLocation<LocationState>[],
  currentIndex: number,
): boolean => (
  location.key
    ? historyStack[currentIndex - 1]?.key === location.key
    : isEqual(pickBy(location, Boolean), pickBy(historyStack[currentIndex - 1], Boolean))
);

export const isNextRoute = (
  location: RouterLocation<LocationState>,
  historyStack: RouterLocation<LocationState>[],
  currentIndex: number,
): boolean => (
  location.key
    ? historyStack[currentIndex + 1]?.key === location.key
    : isEqual(pickBy(location, Boolean), pickBy(historyStack[currentIndex + 1], Boolean))
);

export const isForwardAction = (
  location: RouterLocation<LocationState>,
  history: RouterLocation<LocationState>[],
  currentIndex: number,
) => (
  !!history.slice(currentIndex + 1).find((historyEntry) => historyEntry.key === location.key)
);

export const isBackAction = (
  location: RouterLocation<LocationState>,
  history: RouterLocation<LocationState>[],
  currentIndex: number,
) => (
  !!history.slice(0, currentIndex).find((historyEntry) => historyEntry.key === location.key)
);
