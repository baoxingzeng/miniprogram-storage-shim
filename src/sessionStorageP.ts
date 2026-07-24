import { setState, checkArgsLength } from "fetch-xhr-shim/dev";
import { StorageP, normalizeKey, normalizeValue } from "./StorageP";

class SessionStorageP extends StorageP {
    constructor() {
        super();
        setState(this, "__SessionStorage__", new SessionStorageState())
    }

    /** @internal */ declare readonly __SessionStorage__: SessionStorageState;

    [name: string]: any;    // name not implemented
    get length() { return state(this).array.length; }

    clear(): void {
        state(this).array = [];
    }

    getItem(key: string): string | null {
        checkArgsLength(arguments.length, 1, "Storage", "getItem");
        let _key = normalizeKey(key);
        let array = state(this).array;
        for (let i = 0; i < array.length; ++i) {
            let item = array[i]!;
            if (item[0] === _key) { return item[1]; }
        }
        return null;
    }

    key(index: number): string | null {
        checkArgsLength(arguments.length, 1, "Storage", "key");
        return (index < 0 || index >= state(this).array.length) ? null : state(this).array[index]![0];
    }

    removeItem(key: string): void {
        checkArgsLength(arguments.length, 1, "Storage", "removeItem");
        let _key = normalizeKey(key);
        let index = -1;
        let array = state(this).array;
        let result: Array<[string, string]> = [];
        for (let i = 0; i < array.length; ++i) {
            let item = array[i]!;
            if (item[0] === _key) { index = i; continue; }
            result.push(item);
        }
        if (index > -1) { state(this).array = result; }
    }

    setItem(key: string, value: string): void {
        checkArgsLength(arguments.length, 2, "Storage", "setItem");
        let _key = normalizeKey(key);
        let _value = normalizeValue(value);
        let index = -1;
        let array = state(this).array;
        for (let i = 0; i < array.length; ++i) {
            let item = array[i]!;
            if (item[0] === _key) { item[1] = _value; index = i; break; }
        }
        if (index < 0) { array.push([_key, _value]); }
    }
}

class SessionStorageState {
    array: Array<[string /* key */, string /* value */]> = [];
}

function state(target: SessionStorageP) {
    return target.__SessionStorage__;
}

export const sessionStorageP = new SessionStorageP();

const sessionStorageE = (typeof sessionStorage !== "undefined" && sessionStorage) as typeof sessionStorage || sessionStorageP;
export { sessionStorageE as sessionStorage };
