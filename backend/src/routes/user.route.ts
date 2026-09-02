import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from '../middlewares/auth.middleware'
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";
const userRoutes = Router()

userRoutes.post('/create', userController.createCustomer)
userRoutes.post('/create/manager',authMiddleware, roleMiddeware(UserRole.ADMIN), userController.createManager)
userRoutes.get('/all', authMiddleware ,userController.findUsers)
userRoutes.get('/:id',authMiddleware, userController.findUserById)
userRoutes.delete('/:id',authMiddleware, userController.deleteUser)
userRoutes.put('/:id',authMiddleware, userController.updateUser)

export default userRoutes