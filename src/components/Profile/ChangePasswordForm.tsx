import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/user.service";

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
    <div>
      <label>Nueva contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleChange} disabled={loading}>
        {loading ? "Actualizando..." : "Cambiar contraseña"}
      </button>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default ChangePasswordForm;
