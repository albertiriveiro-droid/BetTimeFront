import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import type { User } from "../../types/user";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./admin.css";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const loadUsers = () => {
    userService.getAll().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await userService.delete(userToDelete.id);
      setUserToDelete(null);
      loadUsers();
    } catch {
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="admin-section">
      <h2>Usuarios</h2>

      <table className="admin-matchstats-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.balance.toFixed(2)}€</td>
              <td className="admin-actions">
                <button
                  className="admin-delete-btn"
                  onClick={() => setUserToDelete(u)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {userToDelete && (
        <ConfirmDeleteModal
          title="Eliminar usuario"
          message={`¿Seguro que quieres eliminar a "${userToDelete.username}"? Esta acción no se puede deshacer.`}
          onCancel={() => setUserToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default UsersList;
