import { useState } from "react";
import { http } from "../../api/http";
import type { UserCreateDTO, User } from "../../types/user";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./modal.css";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    onClose();
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("Debes rellenar todos los campos");
      return;
    }

    if (password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const res = await http.post<{ token: string; user: User }>(
        "/auth/register",
        { username, email, password } as UserCreateDTO
      );

      login(res.data.token, res.data.user);
      setSuccess("¡Cuenta creada correctamente!");

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        handleClose();
        navigate("/");
      }, 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || "Error al registrar el usuario");
      } else {
        setError("Error al registrar el usuario");
      }
    }
  };

  return (
    <div className="register-backdrop">
      <div className="register-modal">
        <h2 className="register-title">Crear cuenta</h2>

        {success && <p className="register-success">{success}</p>}
        {error && <p className="register-error">{error}</p>}

        <input
          className="register-input"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" onClick={handleRegister}>
          Registrarse
        </button>

        <button className="register-cancel" onClick={handleClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
