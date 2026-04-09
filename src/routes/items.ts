import { Router, Request, Response } from "express";
import { Item } from "../types";

const router = Router();

const ITEMS: Item[] = [
  { id: "1", name: "Widget A", category: "tools", createdAt: "2024-01-01" },
  { id: "2", name: "Widget B", category: "tools", createdAt: "2024-01-02" },
  { id: "3", name: "Gadget X", category: "electronics", createdAt: "2024-01-03" },
  { id: "4", name: "Gadget Y", category: "electronics", createdAt: "2024-01-04" },
  { id: "5", name: "Part Z", category: "hardware", createdAt: "2024-01-05" },
];

// Returns all items — no pagination, no filtering
router.get("/", (req: Request, res: Response) => {
  res.json(ITEMS);
});

export default router;
