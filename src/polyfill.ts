export * from "./index";
import { localStorageP } from "./localStorageP";
import { sessionStorageP } from "./sessionStorageP";

/* eslint-disable no-prototype-builtins */
const g: typeof globalThis =
    (typeof globalThis !== "undefined" && globalThis) ||
    (typeof window !== "undefined" && window) ||
    (typeof self !== "undefined" && self) ||
    // @ts-ignore eslint-disable-next-line no-undef
    (typeof global !== "undefined" && global) ||
    {};

if (!g.localStorage) { g.localStorage = localStorageP; }
if (!g.sessionStorage) { g.sessionStorage = sessionStorageP; }
