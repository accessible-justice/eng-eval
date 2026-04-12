import { Item } from "../types";

export interface ItemRepository {
  list(): Item[];
}
