import React from 'react';

import type { ConfigOptions, PersistProps, Values } from './types';
import usePersist from './usePersist';

const configurePersist = (options: ConfigOptions) => {
  const Persist = (props: PersistProps) => {
    usePersist({ ...options, ...props });
    return null;
  };

  return {
    Persist,
    usePersist: (values: Values, _options?: ConfigOptions) =>
      usePersist({ ...options, ..._options, values }),
  };
};

export * from './types';
export default configurePersist;
