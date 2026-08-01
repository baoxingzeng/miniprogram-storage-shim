import { getPlatform } from "miniprogram-platform";
import { setState, checkArgsLength } from "fetch-xhr-shim/internal";
import { StorageP, normalizeKey, normalizeValue } from "./StorageP";

const platform = {
    value: /*#__PURE__*/getPlatform() as {
        name: string;
        mp: {
            getStorageSync: (key: string) => string;
            setStorageSync: (key: string, data: any) => void;
            setStorage: (obj: { key: string, data: any }) => void;
            removeStorageSync: (key: string) => void;
        };
    },
};

export function setPlatform(value: { name: string; mp: unknown; }) {
    platform.value = value as typeof platform["value"];
}

class LocalStorageP extends StorageP {
    constructor() {
        super();
        setState(this, "__LocalStorage__", new LocalStorageState());
    }

    /** @internal */ declare readonly __LocalStorage__: LocalStorageState;

    [name: string]: any;    // name not implemented
    get length() { return state(this).keys.length; }

    clear(): void {
        let s = state(this);
        let keys = s.keys.reduce(function (acc: string[], cur: string) { acc.push(cur); return acc; }, []);
        s.keys = [];
        s.persist();

        for (let i = 0; i < keys.length; ++i) {
            let key = keys[i]!;
            if (platform.value.name !== "Alipay" && platform.value.name !== "DingTalk") {
                platform.value.mp.removeStorageSync(key);
            } else { // @ts-ignore
                platform.value.mp.removeStorageSync({ key: key });    // Alipay Mini Program
            }
        }
    }

    getItem(key: string): string | null {
        checkArgsLength(arguments.length, 1, "Storage", "getItem");
        let s = state(this);
        let _key = normalizeKey(key);

        return s.keys.indexOf(_key) < 0
            ? null
            : normalizeValue((platform.value.name !== "Alipay" && platform.value.name !== "DingTalk")
                ? platform.value.mp.getStorageSync(_key)
                // @ts-ignore
                : platform.value.mp.getStorageSync({ key: _key }).data    // Alipay Mini Program
            );
    }

    key(index: number): string | null {
        checkArgsLength(arguments.length, 1, "Storage", "key");
        return (index < 0 || index >= state(this).keys.length) ? null : state(this).keys[index]!;
    }

    removeItem(key: string): void {
        checkArgsLength(arguments.length, 1, "Storage", "removeItem");
        let s = state(this);
        let _key = normalizeKey(key);

        if (s.keys.indexOf(_key) > -1) {
            s.keys = s.keys.filter(x => x !== _key);
            s.persist();

            if (platform.value.name !== "Alipay" && platform.value.name !== "DingTalk") {
                platform.value.mp.removeStorageSync(_key);
            } else { // @ts-ignore
                platform.value.mp.removeStorageSync({ key: _key });   // Alipay Mini Program
            }
        }
    }

    setItem(key: string, value: string): void {
        checkArgsLength(arguments.length, 2, "Storage", "setItem");
        let s = state(this);
        let _key = normalizeKey(key);
        let _value = normalizeValue(value);

        if (!("__" === _key.slice(0, 2) && _key.slice(-10) === "_MPHTTPX__")) {
            if (s.keys.indexOf(_key) < 0) {
                s.keys.push(_key);
                s.persist();
            }

            if (platform.value.name !== "Alipay" && platform.value.name !== "DingTalk") {
                platform.value.mp.setStorageSync(_key, _value);
            } else { // @ts-ignore
                platform.value.mp.setStorageSync({ key: _key, data: _value });    // Alipay Mini Program
            }
        }
    }
}

class LocalStorageState {
    constructor() {
        this.restore();
    }

    keys: string[] = [];
    get storageKey() { return "__STORAGE_KEYS_MPHTTPX__"; }

    restore() {
        if (!platform.value) return;

        this.keys = ((function (this: LocalStorageState) {
            try {
                let data: string = (platform.value.name !== "Alipay" && platform.value.name !== "DingTalk")
                    ? platform.value.mp.getStorageSync(this.storageKey)
                    // @ts-ignore
                    : platform.value.mp.getStorageSync({ key: this.storageKey }).data;    // Alipay Mini Program

                let parsed = data ? JSON.parse(data) as Array<string> : [];
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                return [];
            }
        }).bind(this))();
    }

    persist() {
        if (!platform.value) return;

        setTimeout((function (this: LocalStorageState) {
            platform.value.mp.setStorage({
                key: this.storageKey,
                data: JSON.stringify(this.keys),
            });
        }).bind(this), 0);
    }
}

function state(target: LocalStorageP) {
    return target.__LocalStorage__;
}

export const localStorageP = /*#__PURE__*/new LocalStorageP();

const localStorageE = /*#__PURE__*/function () { return (typeof localStorage !== "undefined" && localStorage) as typeof localStorage || localStorageP; }();
export { localStorageE as localStorage };
