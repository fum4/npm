import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import type { RouterSubscriber } from "@remix-run/router";
import type { Listener } from "history";

import { type CreateNavigationShimPayload, LOCATION_CHANGED } from "./types";

const createLocationChangedAction = (type: string) => ({
  type: LOCATION_CHANGED,
  payload: {
    location,
    type,
  },
});

export const useLocationListener = ({ history, router }: Partial<CreateNavigationShimPayload>) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!router && !history) {
      throw new Error('`router` or `history` must be provided');
    }

    if (router) {
      const onLocationChanged: RouterSubscriber = ({ historyAction }) => {
        dispatch(createLocationChangedAction(historyAction));
      };

      return router.subscribe(onLocationChanged);
    }

    if (history) {
      const onLocationChanged: Listener = ({ action }) => {
        dispatch(createLocationChangedAction(action));
      };

      return history.listen(onLocationChanged);
    }
  }, [history, router, dispatch]);
};

export const LocationListener = ({ history, router }: Partial<CreateNavigationShimPayload>) => {
  useLocationListener({ history, router });

  return null;
};
