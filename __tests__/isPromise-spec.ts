import { isPromise } from '../src/isPromise';

test('Should be true', () => {
  expect(isPromise(Promise.resolve(0))).toBe(true);
});

test('Should be false', () => {
  expect(isPromise({})).toBe(false);
  expect(isPromise(1)).toBe(false);
  expect(isPromise('hello')).toBe(false);
  expect(isPromise(true)).toBe(false);
});