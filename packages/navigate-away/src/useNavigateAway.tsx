import { useRef, useLayoutEffect } from "react";
import { type NavigateFunction, useNavigate } from "react-router";
import type { RouterState } from "@remix-run/router";
import type { Update } from "history";

import type { NavigateAwayProps } from "./types";

export const NavigateAway = ({
  callback,
  history,
  router,
}: NavigateAwayProps): null => {
  useNavigateAway({ callback, history, router });
  return null;
};

export const useNavigateAway = ({
  callback,
  history,
  router
}: NavigateAwayProps) => {
  const navigate = useNavigate();
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useLayoutEffect(() => {
    const navigateAway: NavigateFunction = (...args) => {
      navigatedFromCallback = true;
      // @ts-ignore
      navigate(...args);
    };

    const isV5Compat = !router?.subscribe;
    let onLocationChange;

    try {
      onLocationChange = router?.subscribe || history.listen;
    } catch (e) {
      console.error('`router` or `history` must be provided ', e);
      return;
    }


    let navigatedFromCallback = false;

    // TODO: check subscribe unlisten
    return onLocationChange((payload: Update | RouterState) => {
      if (!navigatedFromCallback) {
        callbackRef.current?.({
          navigate: navigateAway,
          nextLocation: payload.location,
          action: isV5Compat
            ? (payload as Update).action
            : (payload as RouterState).historyAction,
        });
      }
    });
  }, [navigate]);
};
