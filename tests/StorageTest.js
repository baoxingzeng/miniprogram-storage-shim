import { suite } from "uvu";
import * as assert from "uvu/assert";
import { ui_rec } from "./utils.js";
import { Protagonist } from "./exports.js";

const _name = "Storage";
export const _test = suite(_name);

/**
 * @param {string} n
 * @param {Parameters<typeof _test>[1]} t
 */
const test = (n, t) => {
    return _test(...ui_rec(_name, n, t));
};

// localStorage tests
test("localStorage: basic setItem and getItem", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    storage.setItem("test-key", "test-value");
    assert.is(storage.getItem("test-key"), "test-value");
});

test("localStorage: length property works correctly", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    assert.is(storage.length, 0);
    storage.setItem("key1", "value1");
    assert.is(storage.length, 1);
    storage.setItem("key2", "value2");
    assert.is(storage.length, 2);
});

test("localStorage: removeItem removes the item", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    storage.setItem("key-to-remove", "value");
    assert.is(storage.length, 1);
    storage.removeItem("key-to-remove");
    assert.is(storage.length, 0);
    assert.is(storage.getItem("key-to-remove"), null);
});

test("localStorage: clear removes all items", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    storage.setItem("key1", "value1");
    storage.setItem("key2", "value2");
    assert.is(storage.length, 2);
    storage.clear();
    assert.is(storage.length, 0);
});

test("localStorage: key method returns key by index", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    storage.setItem("first", "value1");
    storage.setItem("second", "value2");
    assert.is(storage.key(0), "first");
    assert.is(storage.key(1), "second");
    assert.is(storage.key(2), null); // out of range
    assert.is(storage.key(-1), null); // negative index
});

test("localStorage: getItem returns null for non-existent keys", () => {
    const storage = Protagonist.localStorage;
    storage.clear();
    assert.is(storage.getItem("not-found"), null);
});

// sessionStorage tests
test("sessionStorage: basic setItem and getItem", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    storage.setItem("test-key", "test-value");
    assert.is(storage.getItem("test-key"), "test-value");
});

test("sessionStorage: length property works correctly", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    assert.is(storage.length, 0);
    storage.setItem("key1", "value1");
    assert.is(storage.length, 1);
    storage.setItem("key2", "value2");
    assert.is(storage.length, 2);
});

test("sessionStorage: removeItem removes the item", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    storage.setItem("key-to-remove", "value");
    assert.is(storage.length, 1);
    storage.removeItem("key-to-remove");
    assert.is(storage.length, 0);
    assert.is(storage.getItem("key-to-remove"), null);
});

test("sessionStorage: clear removes all items", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    storage.setItem("key1", "value1");
    storage.setItem("key2", "value2");
    assert.is(storage.length, 2);
    storage.clear();
    assert.is(storage.length, 0);
});

test("sessionStorage: key method returns key by index", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    storage.setItem("first", "value1");
    storage.setItem("second", "value2");
    assert.is(storage.key(0), "first");
    assert.is(storage.key(1), "second");
    assert.is(storage.key(2), null);
    assert.is(storage.key(-1), null);
});

test("sessionStorage: getItem returns null for non-existent keys", () => {
    const storage = Protagonist.sessionStorage;
    storage.clear();
    assert.is(storage.getItem("not-found"), null);
});

test("sessionStorage: data only in memory", () => {
    // sessionStorage should not persist across reloads in the real world,
    // but since we are in the same process this test just verifies basic functionality
    const storage = Protagonist.sessionStorage;
    storage.clear();
    storage.setItem("temp", "data");
    assert.is(storage.getItem("temp"), "data");
    assert.is(storage.length, 1);
});
