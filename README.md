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

### resolveObject
