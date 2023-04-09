import type { RouterState, Options } from "./types";

let pageHideListener: () => void;

const saveToSessionStorage = (
  state: Readonly<RouterState>,
  { storageKey, storageLimit }: Options
) => {
  sessionStorage.setItem(
    storageKey,
    JSON.stringify({
      ...state,
      currentIndex: Math.min(
        state.currentIndex,
        storageLimit -
          1 -
          (state.locationHistory.length - 1 - state.currentIndex)
      ),
      locationHistory: state.locationHistory.slice(-storageLimit),
    })
  );
};

export const persistOnPageHide = (
  state: Readonly<RouterState>,
  { storageKey, storageLimit }: Options
) => {
  if (storageLimit) {
    if (pageHideListener) {
      window.removeEventListener("pagehide", pageHideListener);
    }

    pageHideListener = () => {
      saveToSessionStorage(state, { storageKey, storageLimit });
    }

    window.addEventListener("pagehide", pageHideListener, { once: true });
  }
};

export const getSessionState = (storageKey: string) => {
  let sessionRouterState: RouterState;

  try {
    const serializedSessionRouterState = sessionStorage.getItem(storageKey);

    sessionRouterState =
      serializedSessionRouterState && JSON.parse(serializedSessionRouterState);

    if (sessionRouterState) {
      const indexOutOfBounds =
        sessionRouterState.currentIndex < 0 ||
        sessionRouterState.currentIndex >=
          sessionRouterState.locationHistory.length;

      return sessionRouterState.locationHistory.length && !indexOutOfBounds
        ? sessionRouterState
        : null;
    }
  } catch (e) {
    return null;
  }

  return null;
};
