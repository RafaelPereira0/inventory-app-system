import { Request, Response } from "express"
import createStockMovement from "../schemas/stockMovementSchema"
import stockMovementService from "../services/stockMovement.service"

class StockMovementController {

    async createMovement(req: Request, res: Response) {
        try {
            const data = createStockMovement.parse(req.body)
            const userId = req.user!.id

            const movement = await stockMovementService.createMovement(data, userId)

            return res.status(201).json({
                message: "Movimentação de estoque criada com sucesso",
                result: movement
            })
        } catch (err: any) {
            return res.status(400).json({
                error: err.message
            })
        }
    }

    async getAllMovements(req: Request, res: Response){
        try{
            const data = await stockMovementService.findAll()

            return res.status(200).json({message: "Movimentações encontradas", result: data})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new StockMovementController()
