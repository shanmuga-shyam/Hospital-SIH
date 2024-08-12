import express from "express"
import { add } from "../controllers/inventoryController.js";
import { authMiddleWare } from "../middleware/auth.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/add",authMiddleWare,add)

export {inventoryRouter}