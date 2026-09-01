import prisma from "../../lib/prisma";
import {  ProductType } from "../types/product.type";

class ProductService{

    async createProduct(product: ProductType){
        const productName = product.name

        const alreadyExist = await prisma.product.findFirst({
            where: {
                name: {
                    equals: productName,
                    mode: "insensitive"
                }
            }
        })

        if(alreadyExist) throw new Error("Produto já cadastrado")

        return await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId
            }
        })
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

    async findAll() {
    return await prisma.product.findMany({
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
        orderBy: {
            id: "asc"
        }
    })
}

    async delete(productId: number){
        const existsProduct = await this.findById(productId)

        if(!existsProduct) throw new Error("Producto não encontrado")

        await prisma.product.delete({
            where: {
                id: productId
            }
        })
    }

    async update(productId: number, data: ProductType){
        const existsProduct = await this.findById(productId)

        if(!existsProduct) throw new Error("Produto não encontrado")

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data
        })

        return updatedProduct
    }
}

export default new ProductService()