import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";

const productRoutes = Router()

productRoutes.use(authMiddleware)

productRoutes.get("/all", productController.findAllProducts)
productRoutes.get("/:id", productController.findProductById)
productRoutes.post("/create", roleMiddeware(UserRole.ADMIN), productController.createProduct)
productRoutes.post("/:id", roleMiddeware(UserRole.ADMIN),productController.deleteProduct)
productRoutes.put("/:id", roleMiddeware(UserRole.ADMIN),productController.updateProduct)


export default productRoutes