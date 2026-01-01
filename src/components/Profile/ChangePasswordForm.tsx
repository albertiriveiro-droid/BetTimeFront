import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/user.service";
import "./ProfileForms.css";

const ChangePasswordForm = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    if (!user) return;

    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await userService.update(user.id, { password });

      setMessage("Contraseña actualizada correctamente");
      setPassword("");
    } catch {
      setError("Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <div className="form-group">
        <label>Nueva contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="primary-btn"
        onClick={handleChange}
        disabled={loading}
      >
        {loading ? "Actualizando..." : "Cambiar contraseña"}
      </button>

      {error && <p className="form-error">{error}</p>}
      {message && <p className="form-success">{message}</p>}
    </div>
  );
};

export default ChangePasswordForm;
