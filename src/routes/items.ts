import { Router, Request, Response } from "express";
import { ItemsService } from "../services/types";

export function createItemsRouter(itemsService: ItemsService): Router {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    const result = itemsService.getItemsPage(req.query);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.json(result.data);
  });

  return router;
}
