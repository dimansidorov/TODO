import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table class="container">
            <thead>
                <tr>
                    <th>
                        Имя пользователя
                    </th>
                    <th>
                        Имя
                    </th>
                    <th>
                        Фамилия
                    </th>
                    <th>
                        Электронная почта
                    </th>
                </tr>
            </thead>
            <tbody>
            {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList;