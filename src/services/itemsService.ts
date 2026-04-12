import { ItemRepository } from "../repositorys/types";
import { ItemsPage, ItemsQuery, ItemsService } from "./types";

const DEFAULT_LIMIT = 2;

function parsePaginationParam(
  value: unknown,
  name: "limit" | "offset",
  defaultValue: number,
): { value?: number; error?: string } {
  if (value === undefined) {
    return { value: defaultValue };
  }

  if (typeof value !== "string" || value.trim() === "") {
    return { error: `${name} must be a non-negative integer` };
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue)) {
    return { error: `${name} must be a non-negative integer` };
  }

  if (name === "limit" && parsedValue <= 0) {
    return { error: "limit must be greater than 0" };
  }

  if (name === "offset" && parsedValue < 0) {
    return { error: "offset must be a non-negative integer" };
  }

  return { value: parsedValue };
}

function parseCategory(value: unknown): { value?: string; error?: string } {
  if (value === undefined) {
    return {};
  }

  if (typeof value !== "string") {
    return { error: "category must be a string" };
  }

  return { value: value.trim().toLowerCase() };
}

export class DefaultItemsService implements ItemsService {
  constructor(private readonly repository: ItemRepository) {}

  getItemsPage(query: ItemsQuery): { error?: string; data?: ItemsPage } {
    const categoryResult = parseCategory(query.category);
    if (categoryResult.error) {
      return { error: categoryResult.error };
    }

    const limitResult = parsePaginationParam(query.limit, "limit", DEFAULT_LIMIT);
    if (limitResult.error) {
      return { error: limitResult.error };
    }

    const offsetResult = parsePaginationParam(query.offset, "offset", 0);
    if (offsetResult.error) {
      return { error: offsetResult.error };
    }

    const allItems = this.repository.list();
    const filteredItems = categoryResult.value
      ? allItems.filter((item) => item.category.toLowerCase() === categoryResult.value)
      : allItems;
    const limit = limitResult.value!;
    const offset = offsetResult.value!;

    return {
      data: {
        items: filteredItems.slice(offset, offset + limit),
        pagination: {
          total: filteredItems.length,
          limit,
          offset,
          hasMore: offset + limit < filteredItems.length,
        },
      },
    };
  }
}
