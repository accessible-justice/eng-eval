import { Item } from "../types";

export interface ItemsPage {
  items: Item[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ItemsQuery {
  category?: unknown;
  limit?: unknown;
  offset?: unknown;
}

export interface ItemsService {
  getItemsPage(query: ItemsQuery): { error?: string; data?: ItemsPage };
}
