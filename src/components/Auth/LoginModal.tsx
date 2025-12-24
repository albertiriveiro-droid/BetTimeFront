import { useState } from "react";
import { http } from "../../api/http";           
import { useAuth } from "../../context/AuthContext"; 
import { jwtDecode } from "jwt-decode";
import type { UserRole } from "../../types/user";
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
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await http.post("/auth/login", { email, password });
      const token = res.data.token;

      const decoded: TokenPayload = jwtDecode(token);

      const user = {
        id: Number(decoded.nameid),
        username: decoded.unique_name,
        email: decoded.email,
        role: decoded.role as UserRole,
        createdAt: new Date().toISOString(),
        balance: Number(decoded.balance),
      };

      login(token, user); 
      onClose();          
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data || "Error al iniciar sesión");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
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
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};