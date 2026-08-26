import { UserRole } from "../../generated/prisma/enums";

export interface createUser {
    name: string,
    email: string,
    password: string,
    role?: UserRole
}

export interface updateUser {
    name?: string,
    email?: string,
    password?: string
}