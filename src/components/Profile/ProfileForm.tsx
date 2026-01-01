import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/user.service";
import "./ProfileForms.css";

const ProfileForm = () => {
  const { user, login } = useAuth();

  const [username, setUsername] = useState(user!.username);
  const [email, setEmail] = useState(user!.email);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setMessage("");

      await userService.update(user.id, { username, email });

      login(localStorage.getItem("token")!, {
        ...user,
        username,
        email,
      });

      setMessage("Datos actualizados correctamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <div className="form-group">
        <label>Usuario</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="primary-btn"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>

      {message && <p className="form-success">{message}</p>}
    </div>
  );
};

export default ProfileForm;
