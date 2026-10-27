import type React from "react"

export type PaymentModalProps = {
    isOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void,
    finishOrder: (e: React.FormEvent) => void,
    paymentMethod: string,
    setPaymentMethod: (method: string) => void,
    totalCartPrice: number
}