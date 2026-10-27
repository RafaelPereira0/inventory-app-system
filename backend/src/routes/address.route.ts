import { Router } from "express";
import addressController from "../controllers/address.controller";
import authMiddleware from "../middlewares/auth.middleware";

const addressRoute = Router()

addressRoute.use(authMiddleware)

addressRoute.post("/lookup", addressController.findCep)
addressRoute.post("/save", addressController.saveAddress)
addressRoute.get("/me", addressController.findUserAddress)


export default addressRoute