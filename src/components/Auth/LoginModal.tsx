import { useState } from "react";
import { http } from "../../api/http";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import type { UserRole } from "../../types/user";
import { useNavigate } from "react-router-dom";
import "./modal.css";

interface TokenPayload {
  nameid: string;
  unique_name: string;
  email: string;
  role: string;
  balance: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Debes rellenar todos los campos");
      return;
    }

    setError("");

    try {
      const res = await http.post("/auth/login", { email, password });

      const token = res.data?.token;

      if (!token) {
        setError(res.data?.message || "Email o contraseña incorrectos");
        return;
      }

      let decoded: TokenPayload;
      try {
        decoded = jwtDecode<TokenPayload>(token);
      } catch {
        setError("Token inválido recibido del servidor");
        return;
      }

      const user = {
        id: Number(decoded.nameid),
        username: decoded.unique_name,
        email: decoded.email,
        role: decoded.role as UserRole,
        createdAt: new Date().toISOString(),
        balance: Number(decoded.balance),
      };

      login(token, user);
      handleClose();
      onSuccess?.();
      navigate("/");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Email o contraseña incorrectos"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-backdrop">
      <div className="login-modal">
        <h2 className="login-title">Iniciar sesión</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>

        <button className="login-cancel" onClick={handleClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
