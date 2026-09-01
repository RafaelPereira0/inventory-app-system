import { Request, Response } from "express";
import { createProductSchema } from "../schemas/productSchema";
import productService from "../services/product.service";

class ProductController {

    async createProduct(req: Request, res: Response){
        try{
            const product = createProductSchema.parse(req.body)
            const newProduct = await productService.createProduct(product)

            return res.status(201).json({message: "Producto criado com sucesso", result: newProduct})
        }catch(err : any){
            return res.status(400).json({error: err.message})
        }
    }

    async findAllProducts(req: Request, res: Response){
        try{
            const products = await productService.findAll()
            return res.status(200).json({result: products})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async findProductById(req: Request, res: Response){
        try{
            const product = await productService.findById(Number(req.params.id))

            return res.status(200).json({result: product})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async deleteProduct(req: Request, res: Response){
        try{
            const productId = Number(req.params.id)
            await productService.delete(productId)

            return res.status(200).json({message: "Produto excluído com sucesso"})
        }catch(err :any){
            return res.status(400).json({error: err.message})
        }
    }

    async updateProduct(req: Request, res: Response){
        try{
            const productId = Number(req.params.id)
            const data = req.body

            const updated = await productService.update(productId, data)

            return res.status(200).json({message: "Produto atualizado com sucesso", result: updated})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new ProductController()