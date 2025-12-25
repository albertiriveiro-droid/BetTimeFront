import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import type { User } from "../../types/user";
import "./admin.css";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAll().then(setUsers);
  }, []);

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.balance}€</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;