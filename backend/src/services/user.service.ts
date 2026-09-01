import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { createUser, updateUser } from '../types/user.type'

class UserService {

    async createCustomer(data: createUser) {

        const emailAlreadyExist = await this.findByEmail(data.email)

        if (emailAlreadyExist) throw new Error("Email já cadastrado")

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })
    }

    async createManager(data: createUser) {
        const emailAlreadyExist = await this.findByEmail(data.email)

        if (emailAlreadyExist) throw new Error("Email já cadastrado")

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: "MANAGER"
            }
        })
    }

    async getUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            },
            orderBy: {
                id: "asc"
            }
        })
    }

    async findById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        if (!user) throw new Error("Usuário não encontrado")

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                name: true,
                email: true,
                role: true
            }
        })

        return user
    }

    async deleteUser(id: number) {
        const user = await this.findById(id)

        if (!user) throw new Error("Usuário não encontrado")

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return true
    }

    async updateUser(id: number, data: updateUser) {
        const user = await this.findById(id)

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }

        //fazer uma validação e update de role

        if (!user) throw new Error("Usuário não encontrado")

        await prisma.user.update({
            where: {
                id: id
            },
            data
        })

        return true
    }
}

export default new UserService()