import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoutes = Router()

userRoutes.post('/create', userController.createCustomer)
userRoutes.post('/create/manager', userController.createManager)
userRoutes.get('/all', userController.findUsers)
userRoutes.get('/:id', userController.findUserById)
userRoutes.delete('/:id', userController.deleteUser)
userRoutes.put('/:id', userController.updateUser)

export default userRoutes