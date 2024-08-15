import express from "express"
import { doctorRegister } from "../controllers/doctorController.js";


const doctorRouter = express.Router();

doctorRouter.post("/register",doctorRegister)

export {doctorRouter}