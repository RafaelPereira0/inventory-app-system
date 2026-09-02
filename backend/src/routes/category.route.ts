import { Router } from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "../../generated/prisma/enums";
import { roleMiddeware } from "../middlewares/role.middleware";

const categoryRoutes = Router() 

categoryRoutes.use(authMiddleware)

categoryRoutes.post('/create', roleMiddeware(UserRole.ADMIN),categoryController.createCategory)
categoryRoutes.post('/:id',categoryController.findCategoryById)
categoryRoutes.get('/all',categoryController.findAllCategories)
categoryRoutes.delete('/:id', roleMiddeware(UserRole.ADMIN), categoryController.deleteCategory)
categoryRoutes.put('/:id', roleMiddeware(UserRole.ADMIN), categoryController.updateCategory)


export default categoryRoutes