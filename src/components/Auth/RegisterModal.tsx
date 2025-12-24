import { useState } from "react";
import { http } from "../../api/http";
import type { UserCreateDTO, User } from "../../types/user";
import { useAuth } from "../../context/AuthContext";
import "./modal.css";
import axios from "axios";

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

  if (!isOpen) return null;

  const handleRegister = async () => {
    try {
      const res = await http.post<{ token: string; user: User }>("/auth/register", {
        username,
        email,
        password
      } as UserCreateDTO);

    
      login(res.data.token, res.data.user);

    
      onClose();

    
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");

    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || "Error al registrar el usuario");
      } else {
        setError("Error al registrar el usuario");
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};