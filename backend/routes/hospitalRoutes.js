import express from "express"
import { getHospitals, hospitalLogin, hospitalRegister } from "../controllers/hospitalController.js";
import { authMiddleWare } from "../middleware/auth.js";


const hospitalRouter = express.Router();
hospitalRouter.post("/register",hospitalRegister)
hospitalRouter.post("/login",hospitalLogin)
hospitalRouter.get("/listhospitals",getHospitals)


export {hospitalRouter}