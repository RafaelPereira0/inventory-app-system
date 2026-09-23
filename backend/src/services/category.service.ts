import prisma from '../../lib/prisma'
import redis from '../config/redis'
import { category } from '../types/category.type'
import productService from './product.service'

class CategoryService {

    async createCategory(data: category) {
        const name = data.name.trim().toLocaleLowerCase()

        const alreadyExist = await prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        })

        if (alreadyExist) throw new Error("Categoria já cadastrada")

        await redis.del("categories")

        return await prisma.category.create({
            data: {
                name: data.name
            }
        })
    }

    async findById(categoryId: number) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            },
            select: {
                id: true,
                name: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        quantity: true
                    }
                }
            }
        })

        if (!category) throw new Error("Categoria não encontrada")

        return category
    }

    async findAll() {

        const cachedCategories = await redis.get("categories")

        if(cachedCategories){
            return JSON.parse(cachedCategories)
        }

        const categories =  await prisma.category.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                name: "asc"
            }
        })

        await redis.set("categories", JSON.stringify(categories), { EX: 60 })

        return categories
    }
    async delete(categoryId: number) {
        const existsCategory = await this.findById(categoryId)

        if (!existsCategory) throw new Error("Categoria não encontrada")
        const product = await productService.findByCategory(existsCategory.id)

        if(product) throw new Error("Categoria pertence a um produto")

        await redis.del("categories")

        return await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    }

    async update(categoryId: number, data: category) {
        const existsCategory = await this.findById(categoryId)

        if (!existsCategory) throw new Error("Categoria não encontrada")
        if(!data.name || data.name.length === 0)throw new Error("Nenhum dado para atualizar")  

        await redis.del("categories")

        return await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: data.name
            }
        })
    }
}

export default new CategoryService()