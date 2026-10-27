import { Request, Response } from "express";
import addressService from "../services/address.service";

class AddressController{
    async findCep(req: Request, res: Response){
        try{
            const {cep} = req.body

            const address = await addressService.findByCep(cep)

            return res.status(200).json(address)
        }catch(err: any){
            return res.status(502).json({message: err.message})
        }
    }

    async findUserAddress(req: Request, res:Response){
        try{
            const address = await addressService.findUserAddress(req.user!.id)

            return res.status(200).json(address)
        }catch(err: any){
            return res.status(400).json({message: err.message})
        }
    }

    async saveAddress(req: Request, res:Response){
        try{
            const address = req.body

            const response = await addressService.saveUserAddress(address, Number(req.user!.id))

            return res.status(201).json(response)
        }catch(err:any){
            return res.status(401).json({message: err.message})
        }
    }
}

export default new AddressController()