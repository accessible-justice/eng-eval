import assert from "node:assert/strict";
import {
  defaultItemsRepository,
  secondaryItemsRepository,
} from "../src/repositorys/itemsRepository";
import { DefaultItemsService } from "../src/services/itemsService";

const defaultItemsService = new DefaultItemsService(defaultItemsRepository);
const secondaryItemsService = new DefaultItemsService(secondaryItemsRepository);

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
  const result = defaultItemsService.getItemsPage({});

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
  const result = defaultItemsService.getItemsPage({ category: "ToOlS" });

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
  const result = defaultItemsService.getItemsPage({ category: "missing" });

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
  const result = defaultItemsService.getItemsPage({ category: ["tools"] });

  assert.equal(result.error, "category must be a string");
});

test("rejects limit=-1", () => {
  const result = defaultItemsService.getItemsPage({ limit: "-1" });

  assert.equal(result.error, "limit must be greater than 0");
});

test("rejects limit=0", () => {
  const result = defaultItemsService.getItemsPage({ limit: "0" });

  assert.equal(result.error, "limit must be greater than 0");
});

test("returns an empty page for out-of-range offset", () => {
  const result = defaultItemsService.getItemsPage({ offset: "999" });

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
  const result = defaultItemsService.getItemsPage({ limit: "abc" });

  assert.equal(result.error, "limit must be a non-negative integer");
});

test("works with a second in-memory data source without route changes", () => {
  const result = secondaryItemsService.getItemsPage({ category: "LIGHTING" });

  assert.equal(result.error, undefined);
  assert.deepEqual(result.data?.pagination, {
    total: 2,
    limit: 2,
    offset: 0,
    hasMore: false,
  });
  assert.deepEqual(result.data?.items.map((item) => item.id), ["a1", "a3"]);
});

console.log("All pagination tests passed.");
