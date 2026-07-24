# miniprogram-storage-shim

标准 [Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 的小程序 polyfill，提供接近浏览器体验的数据缓存操作。

**[English](https://github.com/baoxingzeng/miniprogram-storage-shim/blob/main/README.en.md)**

## 小程序支持

| 微信  | 支付宝 | 百度  | 字节跳动 |  QQ   | 快手  | 京东  | 小红书 |
| :---: | :----: | :---: | :------: | :---: | :---: | :---: | :----: |
|   ✔   |   ✔    |   ✔   |    ✔     |   ✔   |   ✔   |   ✔   |   ✔    |

> 在 Chrome、Firefox、Edge、Safari 等浏览器环境中，导出的模块将直接返回浏览器原生实现，无额外性能开销。

## 安装

```bash
npm install miniprogram-storage-shim
```

## 快速开始

```js
import { localStorage, sessionStorage } from "miniprogram-storage-shim";

// localStorage 使用（持久化）
localStorage.setItem("key", "value");
localStorage.getItem("key"); // "value"
localStorage.removeItem("key");
localStorage.clear();
console.log(localStorage.length);

// sessionStorage 使用（内存存储）
sessionStorage.setItem("session-key", "session-value");
sessionStorage.getItem("session-key"); // "session-value"
sessionStorage.removeItem("session-key");
sessionStorage.clear();
console.log(sessionStorage.length);
```

> ⚠️ **注意事项**：`localStorage` 使用小程序的原生存储来持久化数据，请不要直接通过 `wx.setStorageSync` 等原生 API 修改由 `localStorage` 管理的数据，否则可能导致键索引状态不一致进而引发其他问题。

## API

| 属性/方法                                   | 说明                                |
| :------------------------------------------ | :---------------------------------- |
| `length: number`                            | 返回键值对的数量                    |
| `clear(): void`                             | 移除所有键值对                      |
| `getItem(key: string): string \| null`      | 根据键获取值，如果不存在返回 `null` |
| `key(index: number): string \| null`        | 返回指定索引位置的键名              |
| `removeItem(key: string): void`             | 移除指定键值对                      |
| `setItem(key: string, value: string): void` | 设置键的值                          |

## 导出说明

`localStorage` 和 `sessionStorage` 在支持原生实现的运行环境中会直接返回原生对象；以 `P` 为后缀的 `localStorageP` 和 `sessionStorageP` 则为 polyfill 实现，请按需使用。

> 注意：`localStorageP` 仅适用于小程序环境，浏览器中不可用。

```js
import { localStorageP, sessionStorageP } from "miniprogram-storage-shim";
```

## 行为说明

- **localStorage**: 键和值都持久化存储在小程序中。为了满足规范对 `length` 和 `key(index)` 的要求，键列表会额外存储。
- **sessionStorage**: 所有数据都存储在内存中，小程序关闭后数据丢失，与浏览器行为保持一致。

> **支付宝小程序开发者注意**：支付宝官方将 `window`、`localStorage`、`sessionStorage` 等浏览器内置对象名列为保留字，不应作为导入标识符使用，否则可能导致框架无法正常访问导入内容。如遇导入异常，可通过导入重命名规避，例如 `import { localStorage as myStorage } from "miniprogram-storage-shim";`。

## 开源协议

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
