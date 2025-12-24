import { useState } from "react";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="BetTime" className="logo" />
      </div>
      <div className="header-right">
        {!user ? (
          <>
            <button className="btn" onClick={() => setLoginOpen(true)}>Login</button>
            <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}>Register</button>
          </>
        ) : (
          <>
            <span className="balance">💰 {user.balance}€</span>
            <button className="btn">Mis apuestas</button>
            {user.role === "admin" && <button className="btn btn-admin">Admin</button>}
            <button className="btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
};

export default Header