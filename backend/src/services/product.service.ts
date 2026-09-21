import prisma from "../../lib/prisma";
import redis from "../config/redis";
import { ProductType, UpdateProductType } from "../types/product.type";

class ProductService {

    async createProduct(product: ProductType) {
        const productName = product.name

        if (!productName) throw new Error("Nome do produto obrigatório")
        if (product.price <= 0) throw new Error("Preço inválido")

        const alreadyExist = await prisma.product.findFirst({
            where: {
                name: {
                    equals: productName,
                    mode: "insensitive"
                }
            }
        })

        if (alreadyExist) throw new Error("Produto já cadastrado")

        const categoryExistis = await prisma.category.findUnique({
            where: {
                id: product.categoryId
            }
        })

        if (!categoryExistis) throw new Error("Categoria não encontrada")

        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId,
                quantity: product.quantity ? product.quantity : 0
            }
        })

        await redis.del("products")

        return newProduct
    }

    async findById(productId: number) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                quantity: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                createdAt: true,
                updatedAt: true
            }
        })

        if (!product) throw new Error("Produto não encontrado")

        return product
    }

    async findByCategory(categoryId: number){
        try{
            const product = await prisma.product.findFirst({
                where:{
                    categoryId: categoryId
                }
            })

            if(product) return true
        }catch(err){
            throw err
        }
    }

    async findAll() {
        try {

            const cachedProduct = await redis.get("products")

            if (cachedProduct) return JSON.parse(cachedProduct)

            const products = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    quantity: true,
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true
                },
                where: {
                    isActive: true
                },
                orderBy: {
                    id: "asc"
                }
            })


            await redis.set("products", JSON.stringify(products), { EX: 60 })


            return products

        } catch (err) {
            throw err
        }
    }
    async delete(id: number) {

        const existsProduct = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if (!existsProduct) {
            throw new Error("Produto não encontrado")
        }

        if (existsProduct.quantity > 0) {
            throw new Error(
                "Não é possível excluir um produto que possui estoque."
            )
        }

        const movements = await prisma.stockMovement.count({
            where: {
                productId: id
            }
        })

        if (movements > 0) {
            throw new Error(
                "Não é possível excluir um produto que possui movimentações de estoque."
            )
        }

        await prisma.product.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        })

        await redis.del("products")
    }

    async update(productId: number, data: UpdateProductType) {
        const existsProduct = await this.findById(productId)

        if (!existsProduct) throw new Error("Produto não encontrado")

        if (Object.keys(data).length === 0) throw new Error("Nenhum dado para atualizar")

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data
        })

        await redis.del("products")

        return updatedProduct
    }
}

export default new ProductService()