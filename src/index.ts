import express from "express";
import {
  defaultItemsRepository,
  secondaryItemsRepository,
} from "./repositorys/itemsRepository";
import { createItemsRouter } from "./routes/items";
import { DefaultItemsService } from "./services/itemsService";

const app = express();
const PORT = process.env.PORT || 3000;
const itemsRepository = process.env.ITEMS_SOURCE === "secondary"
  ? secondaryItemsRepository
  : defaultItemsRepository;
const itemsService = new DefaultItemsService(itemsRepository);

app.use(express.json());
app.use("/items", createItemsRouter(itemsService));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
