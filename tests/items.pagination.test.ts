import assert from "node:assert/strict";
import { getItemsPage } from "../src/routes/items";

function test(name: string, run: () => void) {
  try {
    run();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

test("uses default pagination when params are missing", () => {
  const result = getItemsPage({});

  assert.equal(result.error, undefined);
  assert.deepEqual(result.data?.pagination, {
    total: 5,
    limit: 2,
    offset: 0,
    hasMore: true,
  });
  assert.deepEqual(result.data?.items.map((item) => item.id), ["1", "2"]);
});

test("filters by category case-insensitively", () => {
  const result = getItemsPage({ category: "ToOlS" });

  assert.equal(result.error, undefined);
  assert.deepEqual(result.data?.pagination, {
    total: 2,
    limit: 2,
    offset: 0,
    hasMore: false,
  });
  assert.deepEqual(result.data?.items.map((item) => item.id), ["1", "2"]);
});

test("returns an empty result when category does not match", () => {
  const result = getItemsPage({ category: "missing" });

  assert.equal(result.error, undefined);
  assert.deepEqual(result.data?.items, []);
  assert.deepEqual(result.data?.pagination, {
    total: 0,
    limit: 2,
    offset: 0,
    hasMore: false,
  });
});

test("rejects non-string category", () => {
  const result = getItemsPage({ category: ["tools"] });

  assert.equal(result.error, "category must be a string");
});

test("rejects limit=-1", () => {
  const result = getItemsPage({ limit: "-1" });

  assert.equal(result.error, "limit must be greater than 0");
});

test("rejects limit=0", () => {
  const result = getItemsPage({ limit: "0" });

  assert.equal(result.error, "limit must be greater than 0");
});

test("returns an empty page for offset=999", () => {
  const result = getItemsPage({ offset: "999" });

  assert.equal(result.error, undefined);
  assert.deepEqual(result.data?.items, []);
  assert.deepEqual(result.data?.pagination, {
    total: 5,
    limit: 2,
    offset: 999,
    hasMore: false,
  });
});

test("rejects limit=abc", () => {
  const result = getItemsPage({ limit: "abc" });

  assert.equal(result.error, "limit must be a non-negative integer");
});

console.log("All pagination tests passed.");
