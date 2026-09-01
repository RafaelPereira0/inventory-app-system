import { Router } from "express";
import productController from "../controllers/product.controller";

const productRoutes = Router()

productRoutes.get("/all", productController.findAllProducts)
productRoutes.get("/:id", productController.findProductById)
productRoutes.post("/create", productController.createProduct)
productRoutes.post("/:id", productController.deleteProduct)
productRoutes.put("/:id", productController.updateProduct)


export default productRoutes