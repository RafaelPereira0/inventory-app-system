import prisma from "../../lib/prisma";
import { AddressInput, addressSchema, cepSchema } from "../schemas/addressSchema";

class AddressLookupService {
    async findByCep(userCep: string) {
        const cep = cepSchema.parse(userCep)

        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        )

        if (!response.ok) {
            throw new Error("Não foi possível consultar CEP")
        }

        const data = await response.json()

        if (data.erro) {
            throw new Error("CEP não encontrado")
        }

        return {
            cep: data.cep,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
        }
    }

    async saveUserAddress(address: AddressInput, userId: number) {
        const validatedAddress = addressSchema.parse(address);
        const user = await prisma.user.findUnique({
            where: {id: userId}
        })

        const existsAddress = await prisma.address.findFirst({
            where: {
                userId
            }
        })

        if(existsAddress){
            return await prisma.address.update({
                where: {
                    id: existsAddress.id
                }, data: {
                    ...validatedAddress
                }
            })
        }

        return await prisma.address.create({
            data: {
                ...validatedAddress,
                recipient: user!.name,
                userId,
            },
        });
    }

    async findUserAddress(userId: number){
        return await prisma.address.findMany({
            where: {
                userId
            }
        })
    }
}

export default new AddressLookupService()