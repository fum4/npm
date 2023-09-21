import { useState, useMemo, useEffect } from 'react';

import { getStorageValues, filterValues } from './utils';
import { PersistOptions } from './types';

const usePersist = ({
  key = 'use-persist',
  values,
  setValues,
  setToStorage = localStorage.setItem,
  getFromStorage = localStorage.getItem,
  encode = JSON.stringify,
  decode = JSON.parse,
  include = null,
  exclude = null,
}: PersistOptions) => {
  const initialValues = useMemo(
    () => getStorageValues(key, decode, getFromStorage),
    [key, decode, getFromStorage],
  );
  const [initialized, setInitialized] = useState(!initialValues);

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [setValues, initialValues]);

  useEffect(() => {
    if (initialized) {
      const filteredValues = filterValues(values, include, exclude);
      setToStorage(key, encode(filteredValues));
    } else if (encode(values) === encode(initialValues)) {
      setInitialized(true);
    }
  }, [
    key,
    values,
    initialValues,
    initialized,
    setToStorage,
    encode,
    include,
    exclude,
  ]);
};

export default usePersist;
