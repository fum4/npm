import { expect, test, describe } from 'vitest'
import { test as testFn } from '../../packages/react-redux-history/src';

console.log(testFn(1));

describe('first test', () => {
  test('works', () => {
    expect(testFn(1)).toEqual(2);
  });
});
