[![Build Status](https://travis-ci.org/yc-typescript/utils.svg?branch=master)](https://travis-ci.org/yc-typescript/utils.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-typescript/utils/badge.svg?branch=master)](https://coveralls.io/github/yc-typescript/utils?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


## Installation

```bash
npm i -S @yct/utils
```

## Functions

### fetch
> browser only
```ts
function fetch(
  method: string,
  url: string,
  params: any = {},
  headers: any = {},
  json: boolean = false,
): Promise<any>
```
> Usage
```ts
import { fetch } from "@yct/utils";

const res = await fetch('GET', 'http://localhost');
```

### isPromise
```ts
import { isPromise } from '@yct/utils';

test('Should be true', () => {
  expect(isPromise(Promise.resolve(0))).toBe(true);
});

test('Should be false', () => {
  expect(isPromise({})).toBe(false);
  expect(isPromise(1)).toBe(false);
  expect(isPromise('hello')).toBe(false);
  expect(isPromise(true)).toBe(false);
});
```
### resolveObject
```ts
import { resolveObject } from '@yct/utils';

test('Should resolve all', async () => {
  try {
    const obj = {
      a: Promise.resolve('a'),
      b: {
        b1: Promise.resolve('b1'),
        b2: 'b2',
        b3: null,
      },
      c: [
        {
          c1: Promise.resolve('c1'),
        },
      ],
    };
    await resolveObject(obj);
    expect(obj).toMatchObject({
      a: 'a',
      b: {
        b1: 'b1',
        b2: 'b2',
        b3: null,
      },
      c: [
        {
          c1: 'c1',
        },
      ],
    });
  } catch(e) {
    console.error(e);
  }
});
```

### loadScript
```ts
import { loadScript } from '@yct/utils';

declare const window: any;

test('Should load jssdk', async () => {
  try {
    await loadScript('http://res.wx.qq.com/open/js/jweixin-1.2.0.js');
    expect(window.wx).toBeTruthy();
  } catch (e) {
    console.error(e);
  }
});
```
