import { useAuth } from "../../context/AuthContext";
import "./modal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserWelcomeModal = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="welcome-backdrop">
      <div className="welcome-modal">
        <h3>¡Bienvenido!</h3>

        <p className="username">{user.username}</p>
        <p className="balance"> {user.balance}€</p>

        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};
