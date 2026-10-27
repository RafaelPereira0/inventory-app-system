import { Request, Response } from "express";

class PaymentController {

    async createPayment(req: Request, res: Response){
        try{

            

            return res.status(201).json({ message: "Pagamento realizado com sucesso"})
        }catch(err: any){
            return res.status(400).json({ error: err.message })
        }
    }
}

export default new PaymentController()