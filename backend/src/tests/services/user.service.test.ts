import { it, vi, beforeEach, describe, expect } from 'vitest'
import prisma from '../../../lib/prisma'
import userService from '../../services/user.service'
import bcrypt from 'bcrypt'

vi.mock("../../../lib/prisma", () => ({
    default: {
        user: {
            create: vi.fn(),
            findMany: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn()
        }
    }
}))

vi.mock("bcrypt", () => ({
    default: {
        hash: vi.fn()
    }
}))

describe("User Test Service", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("shoul create new customer", async () => {
        const user = {
            id: 1,
            name: 'user1',
            email: "user@email.com",
            password: "123456",
            role: "CUSTOMER"
        }

        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(null)

        vi.mocked(bcrypt.hash)
            .mockResolvedValue("123456" as never)

        vi.mocked(prisma.user.create)
            .mockResolvedValue({
                id: 1,
                name: "user1",
                email: "user@email.com",
                password: "123456",
                role: "CUSTOMER",
            } as any)

        const result = await userService.createCustomer(user as any)

        expect(bcrypt.hash)
            .toHaveBeenCalledWith("123456", 10)

        expect(result).toEqual(user)

        expect(prisma.user.create)
            .toHaveBeenCalledWith({
                data: {
                    name: "user1",
                    email: "user@email.com",
                    password: "123456"
                }
            })
    })

    it("should create new manager", async () => {
        const user = {
            id: 1,
            name: "manager",
            email: "manager@email.com",
            password: "123456",
            role: "MANAGER"
        }

        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(null)

        vi.mocked(bcrypt.hash)
            .mockResolvedValue("123456" as never)

        vi.mocked(prisma.user.create)   
            .mockResolvedValue({
                id: 1,
                name: "manager",
                email: "manager@email.com",
                password: "123456",
                role: "MANAGER"
            }as any)

        const result = await userService.createManager(user as any)
        
        expect(bcrypt.hash)
            .toHaveBeenCalledWith("123456", 10)

        expect(prisma.user.create)
            .toHaveBeenCalledWith({
                data: {
                    name: "manager",
                    email: "manager@email.com",
                    password: "123456",
                    role: "MANAGER"
                }
            })

        expect(result).toEqual(user)
    })
})


