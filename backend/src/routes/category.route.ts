import { Router } from "express";
import categoryController from "../controllers/category.controller";

const categoryRoutes = Router() 

categoryRoutes.post('/create',categoryController.createCategory)
categoryRoutes.post('/:id',categoryController.findCategoryById)
categoryRoutes.get('/all',categoryController.findAllCategories)
categoryRoutes.delete('/:id',categoryController.deleteCategory)
categoryRoutes.put('/:id',categoryController.updateCategory)


export default categoryRoutes