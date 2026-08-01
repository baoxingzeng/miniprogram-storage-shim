import { _Symbol } from "fetch-xhr-shim/internal";

export abstract class StorageP implements Storage {
    constructor() {
        if (this.constructor === StorageP) {
            throw new TypeError("Failed to construct 'Storage': Illegal constructor");
        }
    }

    [name: string]: any;
    abstract length: number;

    abstract clear(): void;
    abstract getItem(key: string): string | null;
    abstract key(index: number): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, value: string): void;

    /** @internal */ toString() { return "[object Storage]"; }
    /** @internal */ get [_Symbol.toStringTag]() { return "Storage"; }
    /** @internal */ get __MPHTTPX__() { return { chain: ["Storage"] }; }
}

export function normalizeKey(key: string) {
    return typeof key === "string" ? key : ("" + key);
}

export function normalizeValue(value?: string) {
    return typeof value === "string" ? value : (
        value !== null && value !== undefined && typeof (value as object).toString === "function"
            ? (value as object).toString()
            : JSON.stringify(value)
    );
}
