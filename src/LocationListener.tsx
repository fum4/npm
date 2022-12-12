import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { BrowserHistory, Update } from 'history';

import { LOCATION_CHANGE, type LocationListenerProps } from './types';

export const useLocationListener = (history: BrowserHistory) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onLocationChanged = ({ location, action }: Update) => dispatch({
      type: LOCATION_CHANGE,
      payload: {
        location,
        action,
      },
    });

    return history.listen(onLocationChanged);
  }, [ dispatch ]);
}

export const LocationListener = ({ history }: LocationListenerProps) => {
  useLocationListener(history);

  return null;
}
