import type { AppRouterState, Options } from './types';

let pageHideListener;

const saveToSessionStorage = (state: Readonly<AppRouterState>, { storageKey }: Options) => {
  sessionStorage.setItem(storageKey, JSON.stringify(state));
};

export const persistOnPageHide = (state: Readonly<AppRouterState>, { storageKey }: Options) => {
  if (pageHideListener) {
    window.removeEventListener('pagehide', pageHideListener);
  }

  pageHideListener = () => saveToSessionStorage(state, { storageKey });
  window.addEventListener('pagehide', pageHideListener, { once: true });
};

export const getSessionState = (storageKey: string): AppRouterState => {
  let sessionRouterState: AppRouterState;

  try {
    const serializedSessionRouterState = sessionStorage.getItem(storageKey);

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
