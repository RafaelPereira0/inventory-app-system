import { Request, Response } from "express";
import { categorySchema } from '../schemas/categorySchema'
import categoryService from "../services/category.service";

class CategoryController {

    async createCategory(req: Request, res: Response) {
        try {
            const category = categorySchema.parse(req.body)
            const newCategory = await categoryService.createCategory(category)

            return res.status(201).json({ message: "Categoria criada com sucesso", result: newCategory })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findCategoryById(req: Request, res: Response) {
        try {
            const categoryId = Number(req.params.id)
            const category = await categoryService.findById(categoryId)

            return res.status(200).json({ result: category })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.findAll()

            return res.status(200).json({ result: categories })
        } catch (err: any) {
            return res.status(400).json({error: err.message})
        }
    }

    async deleteCategory(req: Request, res: Response){
        try{
            const categoryId = Number(req.params.id)

            await categoryService.delete(categoryId)

            return res.status(200).json({message: "Categoria excluída com sucesso"})
        }catch(err: any){

        }
    }

    async updateCategory(req: Request, res: Response){
        try{
            const categoryId = Number(req.params.id)
            const data = req.body
            const updated = await categoryService.update(categoryId, data)

            return res.status(200).json({message: "Categoria atualizada com sucesso", result: updated})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new CategoryController()