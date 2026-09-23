import "./styles.css"

import type { UserTypeProps } from "../../types/user"


export default function UserCard({
    user,
    onView
}: UserTypeProps) {

    return (
        <div className="user-card">

            <div className="user-info">

                <h2>
                    {user.name}
                </h2>

                <div className="user-details">

                    <span>
                        {user.email}
                    </span>

                    <span>
                        {user.role}
                    </span>

                </div>

            </div>


            <div className="user-actions">

                <button
                    className="view-button"
                    onClick={() => onView(user)}
                >
                    Ver usuário
                </button>

            </div>

        </div>
    )
}