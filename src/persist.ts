import type { AppRouterState } from './types';

let pageHideListener;

const saveToSessionStorage = (state: Readonly<AppRouterState>): void => sessionStorage.setItem('routerState', JSON.stringify(state));

export const persistOnPageHide = (state: Readonly<AppRouterState>): void => {
  if (pageHideListener) {
    window.removeEventListener('pagehide', pageHideListener);
  }

  pageHideListener = () => saveToSessionStorage(state);
  window.addEventListener('pagehide', pageHideListener, { once: true });
};

export const getSessionState = (): AppRouterState => {
  let sessionRouterState: AppRouterState;

  try {
    const serializedSessionRouterState = sessionStorage.getItem('routerState');

    sessionRouterState = serializedSessionRouterState && JSON.parse(serializedSessionRouterState);

    if (sessionRouterState) {
      const indexOutOfBounds = sessionRouterState.currentIndex < 0
        || sessionRouterState.currentIndex >= sessionRouterState.locationHistory.length;

      return sessionRouterState.locationHistory.length && !indexOutOfBounds ? sessionRouterState : null;
    }
  } catch (e) {
    return null;
  }

  return null;
};
