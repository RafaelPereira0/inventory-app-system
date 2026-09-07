import { vi, it, expect, beforeEach, describe } from 'vitest'
import prisma from '../../../lib/prisma'
import categoryService from '../../services/category.service'
import { category } from '../../types/category.type'


vi.mock('../../../lib/prisma', () => ({
    default: {
        category: {
            create: vi.fn(),
            findFirst: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        }
    }
}))

describe("Category tests", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should create category", async () => {
        const data = {
            name: "testing category"
        }

        vi.mocked(prisma.category.findFirst)
            .mockResolvedValue(null)

        vi.mocked(prisma.category.create)
            .mockResolvedValue(data as any)

        const result = await categoryService.createCategory(data)

        expect(result).toEqual(data)

        expect(prisma.category.create)
            .toHaveBeenCalledWith({
                data: {
                    name: data.name
                }
            })
    })

    it("should find category by id", async () => {
        const category = {
            id: 1,
            name: "testing category",
            products: [{
                id: 1,
                name: "testing product",
                price: 50,
                quantity: 10
            }]
        }

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(category as any)

        const result = await categoryService.findById(1)

        expect(result).toEqual(category)

        expect(prisma.category.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
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
    })

    it("should find all categories", async () => {
        const categories = [
            {
                id: 1,
                name: "testing category 1"
            },
            {
                id: 2,
                name: "testing category 2"
            }
        ]

        vi.mocked(prisma.category.findMany)
            .mockResolvedValue(categories as any)

        const result = await categoryService.findAll()

        expect(result).toEqual(categories)
        expect(prisma.category.findMany).toHaveBeenCalled()
    })

    it("should delete category", async () => {
        const category = {
            id: 1,
            name: "testing category"
        }

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(category as any)

        vi.mocked(prisma.category.delete)
            .mockResolvedValue(category as any)

        const result = await categoryService.delete(1)

        expect(result).toEqual(category)

        expect(prisma.category.delete)
            .toHaveBeenCalledWith({
                where: {
                    id: category.id
                }
            })
    })

    it("should update category", async () => {
        const category = {
            id: 1,
            name: "testing category"
        }

        const data = {
            name: "testing update category"
        }

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(category as any)

        vi.mocked(prisma.category.update)
            .mockResolvedValue({
                ...category,
                ...data
            } as any)

        const result = await categoryService.update(category.id, data)

        expect(prisma.category.findUnique).toHaveBeenCalled()
        expect(prisma.category.update)
            .toHaveBeenCalledWith({
                where: {
                    id: category.id
                }, data: {
                    name: data.name
                }
            })

        expect(result).toEqual({
            ...category,
            ...data
        })
    })

    it("creating - should throw error when category already exists", async () => {
        const category = {
            id: 1,
            name: "testing category"
        }

        vi.mocked(prisma.category.findFirst)
            .mockResolvedValue(category as any)

        await expect(categoryService.createCategory(category))
            .rejects.toThrow("Categoria já cadastrada")

        expect(prisma.category.create)
            .not.toHaveBeenCalled()
    })

    it("findById - should throw error when category not found", async () => {
        const categoryId = 999

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(null)

        await expect(categoryService.findById(categoryId))
            .rejects.toThrow("Categoria não encontrada")
    })

    it("delete - should throw error when category not found", async () => {
        const categoryId = 999

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(null)

        await expect(categoryService.delete(categoryId))
            .rejects.toThrow("Categoria não encontrada")

        expect(prisma.category.delete)
            .not.toHaveBeenCalled()
    })

    it("update - should throw error when category not found", async () => {
        const categoryId = 999
        const data = {
            name: "updating category"
        }
        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(null)

        await expect(categoryService.update(categoryId, data))
            .rejects.toThrow("Categoria não encontrada")

        expect(prisma.category.update)
            .not.toHaveBeenCalled()
    })

    it("update - should throw error when data is empty", async () => {
        const category = {
            id: 1,
            name: "testing category"
        }
        const data = {name: ""}

        vi.mocked(prisma.category.findUnique)
            .mockResolvedValue(category as any)

        await expect(categoryService.update(category.id, data))
            .rejects.toThrow("Nenhum dado para atualizar")

        expect(prisma.category.update)
            .not.toHaveBeenCalled()
    })
})

