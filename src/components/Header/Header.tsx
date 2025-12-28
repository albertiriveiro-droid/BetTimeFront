import { useState, useEffect } from "react";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import { ProfileModal } from "../Auth/ProfileModal";
import { useAuth } from "../../context/AuthContext";
import { betService } from "../../services/bet.service";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

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
            <button
              className="btn btn-primary"
              onClick={() => setRegisterOpen(true)}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="balance">💰 {user.balance}€</span>

            <button className="profile-btn" onClick={() => setProfileOpen(true)}>
              👤
            </button>

            <button className="btn" onClick={handleBetsClick}>
              Mis apuestas {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
            </button>

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
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />

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
