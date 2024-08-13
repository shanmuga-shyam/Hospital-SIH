import express from "express"
import { add, editExistingItem, listInventory, patientBuys } from "../controllers/inventoryController.js";
import { authMiddleWare } from "../middleware/auth.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/add",authMiddleWare,add)
inventoryRouter.get("/listItems",authMiddleWare,listInventory)
inventoryRouter.post("/updateItems",authMiddleWare,patientBuys)
inventoryRouter.post("/editItems",authMiddleWare,editExistingItem)

export {inventoryRouter}