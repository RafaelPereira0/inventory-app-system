import { Request, Response } from "express";
import userService from "../services/user.service";
import { userSchema, userUpdateSchema } from "../schemas/userSchema";

class UserController {

    async createCustomer(req: Request, res: Response) {
        try {
            const data = userSchema.parse(req.body)
            const newUser = await userService.createCustomer(data)

            return res.status(201).json({ message: "Usuário criado com sucesso", result: [newUser.name, newUser.email] })
        }
        catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async createManager(req: Request, res: Response) {
        try{
            const data = userSchema.parse(req.body)
            const newManager = await userService.createManager(data)

            return res.setMaxListeners(201).json({message: "Gerente cadastrado com sucesso", result: [newManager.name, newManager.email]})
        }catch(err: any){
            return res.status(400).json({err: err.message})
        }
    }

    async findUsers(req: Request, res: Response){
        try{
            const data = await userService.getUsers()

            return res.status(200).json({result: data})
        }catch(err:any){
            return res.status(400).json({error: err.message})
        }
    }
    async findUserById(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const user = await userService.findById(id)

            return res.status(200).json({result: user})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async deleteUser(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            
            await userService.deleteUser(id)

            return res.status(200).json({message: "Usuário excluído com sucesso"})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async updateUser(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const data = userUpdateSchema.parse(req.body)

            await userService.updateUser(id, data)

            return res.status(203).json({message: "Usuário atualizado com sucesso"})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new UserController()