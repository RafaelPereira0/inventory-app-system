import { describe, vi, it, expect, beforeEach } from 'vitest'
import prisma from '../../../lib/prisma'
import redis from '../../config/redis'
import productService from '../../services/product.service'

vi.mock("../../../lib/prisma", () => ({
  default: {
    product: {
      findFirst: vi.fn(),
      findById: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    },
    category: {
      findUnique: vi.fn()
    }
  }
}))

vi.mock("../../config/redis", () => ({
  default: {
    del: vi.fn(),
    get: vi.fn(),
    set: vi.fn()
  }
}))

describe("Product Test Service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should create new product", async () => {
    const product = {
      id: 1,
      name: "testing product",
      description: "testing description",
      price: 60,
      categoryId: 1
    }


    vi.mocked(prisma.product.findFirst)
      .mockResolvedValue(null)

    vi.mocked(prisma.category.findUnique)
      .mockResolvedValue({
        id: 1,
        name: "testing category"
      } as any)

    vi.mocked(prisma.product.create)
      .mockResolvedValue(product as any)

    vi.mocked(redis.del).mockResolvedValue(1)

    const result = await productService.createProduct(product)

    expect(result).toEqual(product)

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId
      }
    })

    expect(redis.del).toHaveBeenCalledWith("products")
  })

  it("should find product by id", async () => {
    const product = {
      id: 1,
      name: "testing product",
      description: "testing description",
      price: 60,
      category: {
        id: 1,
        name: "testing category"
      }
    }

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue({
        id: 1,
        name: "testing product",
        description: "testing description",
        price: 60,
        category: {
          id: 1,
          name: "testing category"
        }
      } as any)

    const result = await productService.findById(1)

    expect(result).toEqual(product)

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1
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
  })

  it("should find all products", async () => {
    const products = [
      {
        id: 1,
        name: "testing1 product",
        description: "testing1 description",
        price: 60,
        category: {
          id: 1,
          name: "testing1 category"
        }
      },
      {
        id: 2,
        name: "testing2 product",
        description: "testing2 description",
        price: 50,
        category: {
          id: 2,
          name: "testing2 category"
        }
      },
    ]

    vi.mocked(prisma.product.findMany)
      .mockResolvedValue(products as any)

    vi.mocked(redis.get).mockResolvedValue(null)

    const result = await productService.findAll()

    expect(prisma.product.findMany)
      .toHaveBeenCalled()

    expect(redis.get).toHaveBeenCalledWith("products")
    expect(redis.set).toHaveBeenCalledWith("products", JSON.stringify(products), { EX: 60 })

    expect(result).toEqual(products)
  })

  it("should delete product", async () => {
    const productId = 1

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue({
        id: 1,
        name: "testing product",
        description: "testing description",
        price: 60,
        category: {
          id: 1,
          name: "testing category"
        }
      } as any)

    vi.mocked(prisma.product.delete)
      .mockResolvedValue({
        id: 1,
        name: "testing product",
        description: "testing description",
        price: 60,
        categoryId: 1
      } as any)

    vi.mocked(redis.del).mockResolvedValue(1)

    await productService.delete(productId)

    expect(prisma.product.findUnique)
      .toHaveBeenCalled()

    expect(prisma.product.delete)
      .toHaveBeenCalledWith({
        where: {
          id: productId
        }
      })

    expect(redis.del).toHaveBeenCalledWith("products")
  })

  it("should update product", async () => {
    const product = {
      id: 1,
      name: "testing product",
      description: "testing description",
      price: 60,
      categoryId: 1
    }

    const data = {
      name: "updating name"
    }

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue(product as any)

    vi.mocked(prisma.product.update)
      .mockResolvedValue({
        ...product,
        ...data
      } as any)

    vi.mocked(redis.del).mockResolvedValue(1)

    const result = await productService.update(product.id, data)

    expect(prisma.product.findUnique)
      .toHaveBeenCalled()

    expect(prisma.product.update)
      .toHaveBeenCalledWith({
        where: {
          id: product.id
        },
        data
      })

    expect(redis.del).toHaveBeenCalledWith("products")

    expect(result).toEqual({
      ...product,
      ...data
    })
  })

  it("findAll - should return products from cache", async () => {
    const products = [
      {
        id: 1,
        name: "testing product",
        price: 60
      }
    ]

    vi.mocked(redis.get)
      .mockResolvedValue(JSON.stringify(products))

    const result = await productService.findAll()

    expect(result).toEqual(products)

    expect(redis.get)
      .toHaveBeenCalledWith("products")

    expect(prisma.product.findMany)
      .not.toHaveBeenCalled()

    expect(redis.set)
      .not.toHaveBeenCalled()
  })

  it("creating - should throw error when product name does not exists", async () => {
    const data = {
      id: 1,
      name: "",
      price: 50,
      categoryId: 1
    }

    await expect(productService.createProduct(data))
      .rejects.toThrow("Nome do produto obrigatório")

    expect(prisma.product.findFirst)
      .not.toHaveBeenCalled()

    expect(prisma.category.findUnique)
      .not.toHaveBeenCalled()

    expect(prisma.product.create)
      .not.toHaveBeenCalled()

    expect(redis.del).not.toHaveBeenCalled()
  })

  it("creating - should throw error when product price is invalid", async () => {
    const data = {
      id: 1,
      name: "testing product",
      price: 0,
      categoryId: 1
    }

    await expect(productService.createProduct(data))
      .rejects.toThrow("Preço inválido")

    expect(prisma.product.findFirst)
      .not.toHaveBeenCalled()

    expect(prisma.category.findUnique)
      .not.toHaveBeenCalled()

    expect(prisma.product.create)
      .not.toHaveBeenCalled()

    expect(redis.del)
      .not.toHaveBeenCalled()
  })

  it("creating - should throw error when product already exists", async () => {
    const product = {
      id: 1,
      name: "testing product",
      description: "testing description",
      price: 10,
      categoryId: 1
    }

    vi.mocked(prisma.product.findFirst)
      .mockResolvedValue(product as any)

    await expect(productService.createProduct(product))
      .rejects.toThrow("Produto já cadastrado")

    expect(prisma.category.findUnique)
      .not.toHaveBeenCalled()

    expect(prisma.product.create)
      .not.toHaveBeenCalled()

    expect(redis.del).not.toHaveBeenCalled()
  })

  it("creating - should throw error when category not found", async () => {
    const product = {
      id: 1,
      name: "testing product",
      description: "testing description",
      price: 10,
      categoryId: 999
    }

    vi.mocked(prisma.product.findFirst)
      .mockResolvedValue(null)

    vi.mocked(prisma.category.findUnique)
      .mockResolvedValue(null)

    await expect(productService.createProduct(product))
      .rejects.toThrow("Categoria não encontrada")

    expect(prisma.product.create)
      .not.toHaveBeenCalled()

    expect(redis.del).not.toHaveBeenCalled()
  })

  it("findById - should throw error when product not found", async () => {
    const productId = 999

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue(null)

    await expect(productService.findById(productId))
      .rejects.toThrow("Produto não encontrado")

  })

  it("delete - should throw error when product not found", async () => {
    const productId = 999

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue(null)

    await expect(productService.delete(productId))
      .rejects.toThrow("Produto não encontrado")

    expect(redis.del).not.toHaveBeenCalled()
  })

  it("update - should throw error when product not found", async () => {
    const productId = 999

    const data = {
      id: 999,
      name: "testing product",
      price: 10
    }

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue(null)

    await expect(productService.update(productId, data))
      .rejects.toThrow("Produto não encontrado")

    expect(prisma.product.update)
      .not.toHaveBeenCalled()

    expect(redis.del).not.toHaveBeenCalled()
  })

  it("update - should throw error when data is empty", async () => {
    const productId = 1
    const result = {
      id: 1,
      name: "testing product",
      price: 10
    }
    const data = {}

    vi.mocked(prisma.product.findUnique)
      .mockResolvedValue(result as any)

    await expect(productService.update(productId, data))
      .rejects.toThrow("Nenhum dado para atualizar")

    expect(prisma.product.update)
      .not.toHaveBeenCalled()

    expect(redis.del).not.toHaveBeenCalled()
  })
})