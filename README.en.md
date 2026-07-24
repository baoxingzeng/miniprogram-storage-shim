# miniprogram-storage-shim

A [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) polyfill for mini programs, providing a browser-like data caching experience.

## Supported Platforms

| WeChat | Alipay | Baidu | ByteDance |  QQ   | Kwai  |  JD   | RedNote |
| :----: | :----: | :---: | :-------: | :---: | :---: | :---: | :-----: |
|   ✔    |   ✔    |   ✔   |     ✔     |   ✔   |   ✔   |   ✔   |    ✔    |

> In browser environments (Chrome, Firefox, Edge, Safari, etc.), the module directly returns the native implementation with zero overhead.

## Installation

```bash
npm install miniprogram-storage-shim
```

## Quick Start

```js
import { localStorage, sessionStorage } from "miniprogram-storage-shim";

// localStorage (persistent)
localStorage.setItem("key", "value");
localStorage.getItem("key"); // "value"
localStorage.removeItem("key");
localStorage.clear();
console.log(localStorage.length);

// sessionStorage (in-memory)
sessionStorage.setItem("session-key", "session-value");
sessionStorage.getItem("session-key"); // "session-value"
sessionStorage.removeItem("session-key");
sessionStorage.clear();
console.log(sessionStorage.length);
```

> ⚠️ **Warning**: `localStorage` persists data using the mini program's native storage. Do not modify data managed by `localStorage` through native APIs like `wx.setStorageSync` directly, as this may cause inconsistent key indexing and lead to unexpected issues.

## API

| Property/Method                             | Description                                                              |
| :------------------------------------------ | :----------------------------------------------------------------------- |
| `length: number`                            | Returns the number of key/value pairs                                    |
| `clear(): void`                             | Removes all key/value pairs                                              |
| `getItem(key: string): string \| null`      | Returns the value for the given key, or `null` if the key does not exist |
| `key(index: number): string \| null`        | Returns the name of the key at the specified index                       |
| `removeItem(key: string): void`             | Removes the key/value pair with the given key                            |
| `setItem(key: string, value: string): void` | Sets the value for the given key                                         |

> Note: The `storage` event (`StorageEvent`) is not supported. This event is primarily used for cross-tab communication in browsers, which is rarely needed in mini program environments.

## Exports

- `localStorage` and `sessionStorage` return the native implementation if available in the current environment.
- `localStorageP` and `sessionStorageP` (suffixed with `P`) always provide the polyfill implementation.

> Note: `localStorageP` is for mini program environments only and should not be used in browsers.

```js
import { localStorageP, sessionStorageP } from "miniprogram-storage-shim";
```

## Behavior

- **localStorage**: Keys and values are persisted in the mini program storage. To comply with the specification requirements for `length` and `key(index)`, the list of keys is stored separately.
- **sessionStorage**: All data is stored in memory and cleared when the mini program terminates, consistent with browser behavior.

> **Note for Alipay Mini Program developers**: Alipay lists browser built-in names like `window`, `localStorage`, and `sessionStorage` as reserved words. They should not be used as import identifiers, otherwise the framework may not be able to access the imported content correctly. If you encounter import issues, use import renaming: `import { localStorage as myStorage } from "miniprogram-storage-shim";`.

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
