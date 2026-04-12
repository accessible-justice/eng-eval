import { Router, Request, Response } from "express";
import { Item } from "../types";

const router = Router();
const DEFAULT_LIMIT = 2;

const ITEMS: Item[] = [
  { id: "1", name: "Widget A", category: "tools", createdAt: "2024-01-01" },
  { id: "2", name: "Widget B", category: "tools", createdAt: "2024-01-02" },
  { id: "3", name: "Gadget X", category: "electronics", createdAt: "2024-01-03" },
  { id: "4", name: "Gadget Y", category: "electronics", createdAt: "2024-01-04" },
  { id: "5", name: "Part Z", category: "hardware", createdAt: "2024-01-05" },
];

interface ItemsPage {
  items: Item[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

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

export function getItemsPage(query: {
  category?: unknown;
  limit?: unknown;
  offset?: unknown;
}): { error?: string; data?: ItemsPage } {
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

  const filteredItems = categoryResult.value
    ? ITEMS.filter((item) => item.category.toLowerCase() === categoryResult.value)
    : ITEMS;
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

router.get("/", (req: Request, res: Response) => {
  const result = getItemsPage(req.query);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.json(result.data);
});

export default router;
