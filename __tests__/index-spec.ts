import * as index from '../src/index';

test('Should have fetch available', () => {
  expect(index.fetch).toBeTruthy();
  expect(index.isPromise).toBeTruthy();
  expect(index.resolveObject).toBeTruthy();
});
