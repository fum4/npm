import type { Location } from "history";

import type { RouterLocation } from "./types";

export const isSameRoute = (
  location: Location,
  history: Location[],
  currentIndex: number
): boolean =>
  location?.key
    ? history[currentIndex]?.key === location.key
    : isEqual(
        pickBy(location, Boolean),
        pickBy(history[currentIndex], Boolean)
      );

export const isPreviousRoute = (
  location: Location,
  history: Location[],
  currentIndex: number
): boolean =>
  location?.key
    ? history[currentIndex - 1]?.key === location.key
    : isEqual(
        pickBy(location, Boolean),
        pickBy(history[currentIndex - 1], Boolean)
      );

export const isNextRoute = (
  location: Location,
  history: Location[],
  currentIndex: number
): boolean =>
  location?.key
    ? history[currentIndex + 1]?.key === location.key
    : isEqual(
        pickBy(location, Boolean),
        pickBy(history[currentIndex + 1], Boolean)
      );

export const isForwardAction = (
  location: Location,
  history: Location[],
  currentIndex: number
) =>
  !!history
    .slice(currentIndex + 1)
    .find((historyEntry) => historyEntry.key === location.key);

export const isBackAction = (
  location: Location,
  history: Location[],
  currentIndex: number
) =>
  !!history
    .slice(0, currentIndex)
    .find((historyEntry) => historyEntry.key === location.key);

export const injectQuery = (location: Location): RouterLocation => {
  const searchParams = new URLSearchParams(location.search);
  const query = Object.fromEntries(searchParams);

  return { ...location, query };
};

export const parseLocation = (location: Location): RouterLocation => ({
  ...injectQuery(location),
  ...(!location.state && { state: {} }),
});

export const findIndex = (
  array: any[],
  predicate: Record<string, any>
) => {
  if (Array.isArray(array)) {
    const targetKey = Object.keys(predicate)[0];
    const targetValue = predicate[targetKey];

    for (let i = 0; i < array.length; i++) {
      if (array[i][targetKey] === targetValue) {
        return i;
      }
    }
  }

  return 0;
};

const pickBy = (
  object: Record<string, any>,
  predicate: (entry: any) => boolean
): Record<string, any> =>
  Object.entries(object)
    .filter((entry) => predicate(object[entry[0]]))
    .reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1] }), {});

const isEqual = (
  firstObject: Record<string, any>,
  secondObject: Record<string, any>
): boolean => {
  const firstObjectEntries = Object.entries(firstObject);
  const secondObjectEntries = Object.entries(secondObject);
  let result = true;

  if (firstObjectEntries.length !== secondObjectEntries.length) {
    return false;
  }

  Object.entries(firstObject).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      const propertyResult = isEqual(firstObject[key], secondObject[key]);

      if (!propertyResult) {
        result = false;
      }
    } else {
      if (firstObject[key] !== secondObject[key]) {
        result = false;
      }
    }
  });

  return result;
};
