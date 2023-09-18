import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import type { RouterSubscriber } from "@remix-run/router";
import type { Listener, Location } from "history";

import { type NavigationShimPayload, LOCATION_CHANGED } from "./types";

const createLocationChangedAction = (type: string, location: Location) => ({
  type: LOCATION_CHANGED,
  payload: {
    location,
    type,
  },
});

export const useLocationListener = ({ history, router }: Partial<NavigationShimPayload>) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!router && !history) {
      throw new Error('`router` or `history` must be provided');
    }

    if (router) {
      const onLocationChanged: RouterSubscriber = ({ historyAction, location }) => {
        dispatch(createLocationChangedAction(historyAction, location));
      };

      return router.subscribe(onLocationChanged);
    }

    if (history) {
      const onLocationChanged: Listener = ({ action, location }) => {
        dispatch(createLocationChangedAction(action, location));
      };

      return history.listen(onLocationChanged);
    }
  }, [history, router, dispatch]);
};

export const LocationListener = ({ history, router }: Partial<NavigationShimPayload>) => {
  useLocationListener({ history, router });

  return null;
};
