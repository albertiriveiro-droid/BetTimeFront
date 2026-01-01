import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "../../components/Profile/ProfileForm";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await userService.delete(user.id);
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al borrar el usuario");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="account-page">
      <h1 className="account-title">Mi cuenta</h1>

      <section className="account-card">
        <h2 className="account-card-title">Datos personales</h2>
        <ProfileForm />
      </section>

      <section className="account-card">
        <h2 className="account-card-title">Seguridad</h2>
        <ChangePasswordForm />
        <div className= "account-delete" >
          <button
            className="delete-account-btn"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Borrar cuenta
          </button>
          </div>
      </section>

      {showDeleteConfirm && (
        <div className="confirm-backdrop">
          <div className="confirm-modal">
            <h3>¿Seguro que quieres borrar tu cuenta?</h3>
            <p>
              Esta acción es <strong>irreversible</strong>. Se eliminarán todos
              tus datos, apuestas y transacciones.
            </p>

            <div className="confirm-actions">
              <button
                className="confirm-cancel"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                className="confirm-delete"
                onClick={handleDeleteUser}
                disabled={loading}
              >
                {loading ? "Borrando..." : "Sí, borrar cuenta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
