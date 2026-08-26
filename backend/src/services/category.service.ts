import prisma from '../../lib/prisma'
import { category } from '../types/category.type'

class CategoryService{

    async createCategory(data: category){
        const name = data.name.trim().toLocaleLowerCase()

        const alreadyExist = await prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        })

        if(alreadyExist) throw new Error("Categoria já cadastrada")

        return await prisma.category.create({data: {
            name: data.name
        }})
    }

    async findById(categoryId: number){
        const category = await prisma.category.findUnique({
            where:{
                id: categoryId
            }
        })

        if(!category) throw new Error("Categoria não encontrada")

        return category
    }

    async findAll(){
        const category = await prisma.category.findMany()

        if(!category) throw new Error("Nenhuma categoria encontrada")

        return category
    }

    async delete(categoryId: number){
        const existsCategory = await this.findById(categoryId)

        if(!existsCategory) throw new Error("Categoria não encontrada")

        await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    }

    async update(categoryId: number, data:category){
        const existsCategory = await this.findById(categoryId)

        if(!existsCategory) throw new Error("Categoria não encontrada")

        return await prisma.category.update({
            where:{
                id: categoryId
            },
            data: {
                name: data.name
            }
        })
    }
}

export default new CategoryService()