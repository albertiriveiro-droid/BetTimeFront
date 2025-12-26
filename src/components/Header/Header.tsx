import { useState } from "react";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import { ProfileModal } from "../Auth/ProfileModal";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="BetTime" className="logo" />
      </div>

      <div className="header-right">

      <Link to="/">
      <button className="btn btn-admin">Todos los partidos</button>
      </Link>
              
        {!user ? (
          <>
            <button className="btn" onClick={() => setLoginOpen(true)}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}>
              Register
            </button>
          </>
        ) : (
          <>
            <span className="balance">💰 {user.balance}€</span>

            <button className="profile-btn" onClick={() => setProfileOpen(true)}>
              👤
            </button>

            <button className="btn">Mis apuestas</button>
            {user.role === "admin" && (
            <Link to="/admin">
            <button className="btn btn-admin">Admin</button>
            </Link>
              )}


            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />

      {user && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
