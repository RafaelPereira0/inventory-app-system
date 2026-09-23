import { useState } from "react"

import { getAllUsers } from "../../hooks/useUsers"

import UserCard from "../../components/UserCard"

import type { UserType } from "../../types/user"

import "./styles.css"
import UserModal from "../../components/UserModal"


export default function Users() {

    const {
        data: users,
        isLoading,
        isError
    } = getAllUsers()


    const [selectedUser, setSelectedUser] =
        useState<UserType | null>(null)

    const [isCreatingMode, setIsCreatingMode] =
        useState(false)


    function handleView(user: UserType) {
        setSelectedUser(user)
    }


    function handleCloseModal() {
        setSelectedUser(null)
    }


    if (isLoading) {
        return <div>Carregando usuários...</div>
    }


    return (
        <div className="users-page">

            <div className="users-header">

                <h1>
                    Usuários
                </h1>

                <button
                    className="new-user-button"
                    onClick={() => setIsCreatingMode(true)}
                >
                    Novo Usuário
                </button>

            </div>


            <div className="users-grid">

                {isError ? (

                    <p className="users-error">
                        Erro ao buscar usuários
                    </p>

                ) : users?.length === 0 ? (

                    <p className="users-empty">
                        Nenhum usuário cadastrado
                    </p>

                ) : (

                    users?.map((user) => (

                        <UserCard
                            key={user.id}
                            user={user}
                            onView={handleView}
                        />

                    ))

                )}

            </div>


            {selectedUser && (

                <UserModal
                    user={selectedUser}
                    close={handleCloseModal}
                />

            )}


            {isCreatingMode && (

                <UserModal
                    close={() => setIsCreatingMode(false)}
                />

            )}

        </div>
    )
}