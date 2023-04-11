import type { Values } from './types';

export const getStorageValues = (
  key: string,
  decode: (value: string) => any,
  getFromStorage: (key: string) => any
) => {
  const persisted = getFromStorage(key);

  if (persisted) {
    const persistedValues = decode(persisted);

    if (persistedValues) {
      return persistedValues;
    }
  }

  return null;
};

export const filterValues = (values: Values, include: string[], exclude: string[]) => (
  Object.entries(values).reduce((acc, [ key, value ]) => {
    if (include && !include.includes(key)) {
      return acc;
    }

    if (exclude && exclude.includes(key)) {
      return acc;
    }

    acc[key] = value;

    return acc;
  }, {})
);
