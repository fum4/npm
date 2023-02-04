import { useRef, useLayoutEffect } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
import type { Update, History } from 'history';

import type { NavigateAwayProps, NavigateAwayCallback } from './types';

export const NavigateAway = (props: NavigateAwayProps, history: History): null => {
  useNavigateAway(props.callback, history);
  return null;
}

export const useNavigateAway = (callback: NavigateAwayCallback, history: History) => {
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

    let navigatedFromCallback = false;

    return history.listen(({ action, location }: Update) => {
      if (!navigatedFromCallback) {
        callbackRef.current?.({
          navigate: navigateAway,
          nextLocation: location,
          action,
        });
      }
    });
  }, [ navigate ]);
};
