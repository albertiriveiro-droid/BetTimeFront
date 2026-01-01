import { useState, useEffect } from "react";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import { ProfileModal } from "../Auth/ProfileModal";
import { useAuth } from "../../context/AuthContext";
import { betService } from "../../services/bet.service";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => setPendingCount(0), 0);
      return;
    }

    let isMounted = true;
    betService.getActiveByUser(user.id).then((bets) => {
      if (isMounted) setPendingCount(bets.length);
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleBetsClick = () => {
    navigate("/bets");
  };

  const handleLogout = async () => {
   await logout();
  setLoginOpen(false);
  setRegisterOpen(false);
  setProfileOpen(false);
  navigate("/");
};


   return (
    <header className="header">
     
      <div className="header-left">
        <img src={logo} alt="BetTime" className="logo" />
      </div>

      
     <nav className="header-center">
    <button className="nav-link" onClick={() => navigate("/")}>
    Todos los partidos
    </button>

    {user && (
    <button className="nav-link" onClick={handleBetsClick}>
      Mis apuestas
      {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
    </button>
     )}
  </nav>

      
     <div className="header-right">
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
     
      <div className="user-group">
        <span className="balance">{user.balance}€</span>
        <button className="icon-btn" onClick={() => setProfileOpen(true)}>
          <FiUser />
        </button>
      </div>

      
      <div className="admin-logout-group">
        {user.role === "admin" && (
          <Link to="/admin" className="btn btn-admin">
            Admin
          </Link>
        )}
        <button className="icon-btn logout" onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </>
  )}
</div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
      {user && <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />}
    </header>
  );
};

export default Header;