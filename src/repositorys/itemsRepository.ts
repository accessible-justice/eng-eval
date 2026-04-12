import { ItemRepository } from "./types";
import { Item } from "../types";

export class InMemoryItemRepository implements ItemRepository {
  constructor(private readonly items: Item[]) {}

  list(): Item[] {
    return this.items;
  }
}

const DEFAULT_ITEMS: Item[] = [
  { id: "1", name: "Widget A", category: "tools", createdAt: "2024-01-01" },
  { id: "2", name: "Widget B", category: "tools", createdAt: "2024-01-02" },
  { id: "3", name: "Gadget X", category: "electronics", createdAt: "2024-01-03" },
  { id: "4", name: "Gadget Y", category: "electronics", createdAt: "2024-01-04" },
  { id: "5", name: "Part Z", category: "hardware", createdAt: "2024-01-05" },
];

const SECONDARY_ITEMS: Item[] = [
  { id: "a1", name: "Studio Lamp", category: "lighting", createdAt: "2024-02-01" },
  { id: "a2", name: "Cable Roll", category: "hardware", createdAt: "2024-02-02" },
  { id: "a3", name: "Desk Fan", category: "lighting", createdAt: "2024-02-03" },
];

export const defaultItemsRepository = new InMemoryItemRepository(DEFAULT_ITEMS);
export const secondaryItemsRepository = new InMemoryItemRepository(SECONDARY_ITEMS);
