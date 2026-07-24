// @ts-check
import {
    localStorage, localStorageP,
    sessionStorage, sessionStorageP
} from "../dist/esm/index.js";
// } from "../dist/miniprogram-storage-shim.esm.min.js";

export const protagonistConfig = {
    useNativeLocalStorage: false,
    useNativeSessionStorage: false,
};

export class Protagonist {
    static get localStorage() { return /** @type {typeof globalThis.localStorage} */(protagonistConfig.useNativeLocalStorage ? localStorage : localStorageP); }
    static get sessionStorage() { return /** @type {typeof globalThis.sessionStorage} */(protagonistConfig.useNativeSessionStorage ? sessionStorage : sessionStorageP); }
}
