import { isPromise } from './isPromise';

export async function resolveObject(obj: { [x: string]: any }) {
  for (const k of Object.keys(obj)) {
    if (isPromise(obj[k])) {
      obj[k] = await obj[k];
    } else if (!!obj[k] && typeof obj[k] === 'object') {
      await resolveObject(obj[k]);
    }
  }
}