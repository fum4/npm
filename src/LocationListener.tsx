import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { History, Update } from 'history';

import { LOCATION_CHANGED, type LocationListenerProps } from './types';

export const useLocationListener = (history: History) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onLocationChanged = ({ location, action }: Update) => {
      dispatch({
        type: LOCATION_CHANGED,
        payload: {
          location,
          type: action,
        },
      });
    };

    return history.listen(onLocationChanged);
  }, [ history, dispatch ]);
}

export const LocationListener = ({ history }: LocationListenerProps) => {
  useLocationListener(history);

  return null;
}
