import { vi, it, expect, beforeEach, describe } from 'vitest'

vi.hoisted(() => {
    process.env.JWT_SECRET = "fake-secret"
    process.env.REFRESH_JWT_SECRET = "fake-refresh-secret"
})

import prisma from '../../../lib/prisma'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


vi.mock("../../../lib/prisma", () => ({
    default: {
        user: {
            findUnique: vi.fn()
        }
    }
}))

vi.mock("bcrypt", () => ({
    default: {
        compare: vi.fn()
    }
}))

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn(),
        verify: vi.fn()
    }
}))

vi.mock("../../services/user.service", () => ({
    default: {
        findById: vi.fn()
    }
}))


describe("authService tests", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should login successfully", async () => {
        const user = {
            id: 1,
            role: "ADMIN",
            name: "admin1",
            email: "test@email.com",
            password: "123456"
        }

        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(user as any)

        vi.mocked(bcrypt.compare)
            .mockResolvedValue(true as never)

        vi.mocked(jwt.sign)
            .mockResolvedValue("fake-token" as any)

        const result = await authService.login({
            email: "test@email.com",
            password: "123456"
        })

        expect(prisma.user.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    email: "test@email.com"
                }
            })

        expect(bcrypt.compare)
            .toHaveBeenCalled()

        expect(result.user).toEqual({
            id: 1,
            role: "ADMIN",
            name: "admin1",
            email: "test@email.com",
        })

        expect(result.accessToken).toBeDefined()
        expect(result.refreshToken).toBeDefined()
    })

    it("should refresh token", async () => {
        const user = {
            id: 1,
            role: "ADMIN",
            name: "admin1",
            email: "test@email.com",
            password: "123456"
        }

        vi.mocked(jwt.verify).mockImplementation(
            ((token: any, secret: any, callback: any) => {
                callback(null, {id: 1, role: "ADMIN"})
            }) as any
        )

        vi.mocked(userService.findById)
            .mockResolvedValue(user as any)

        vi.mocked(jwt.sign)
            .mockReturnValue("new-access-token" as any)

        const result = await authService.refresh("fake-access-token")

        expect(jwt.verify)
            .toHaveBeenCalledWith(
                "fake-access-token",
                "fake-refresh-secret",
                expect.any(Function)
            )

        expect(userService.findById)
            .toHaveBeenCalledWith(1)

        expect(result.newAccessToken)
            .toBe("new-access-token")

        expect(result.user)
            .toEqual(user as any)
    })

    it("should throw error when user is invalid", async () => {
        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(null)

        await expect(authService.login({
            email: "invalid@email.com",
            password: "invalidPassword"
        })).rejects.toThrow("Usuário ou senha inválidos")

        expect(bcrypt.compare)
            .not.toHaveBeenCalled()

        expect(jwt.sign)
            .not.toHaveBeenCalled()
    })

    it("should throw error when password is invalid", async () => {
        const user = {
            id: 1,
            name: "admin1",
            email: "admin@email.com",
            password: "123456",
            role: "ADMIN"
        }

        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(user as any)

        vi.mocked(bcrypt.compare)
            .mockResolvedValue(false as never)

        await expect(authService.login({
            email: "admin@email.com",
            password: "invalidPassword"
        })).rejects.toThrow("Usuário ou senha inválidos")

        expect(jwt.sign)
            .not.toHaveBeenCalled()

        expect(bcrypt.compare)
            .toHaveBeenCalledWith("invalidPassword", user.password)
    })
})