import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { DepositModal } from "./DepositModal";
import { WithdrawModal } from "./WithdrawModal";
import {  useNavigate } from "react-router-dom";

import "./modal.css";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !user) return null;
  const goToAccount = () => {
    onClose();         
    navigate("/account"); 
  };

   const goToHistory = () => {
    onClose();         
    navigate("/history"); 
  };


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
        <h2>👤 {user.username}</h2>

        <p className="profile-balance">💰 {user.balance}€</p>
        <p className="profile-email">{user.email}</p>

        <div className="profile-actions">
          <button className="btn" onClick={() => setShowDeposit(true)}>
            Depositar
          </button>
          <button className="btn" onClick={() => setShowWithdraw(true)}>
            Retirar
          </button>
        </div>

        <div className="profile-links">
          <button className="btn-link" onClick={goToAccount}>
            🛠️ Mi cuenta
          </button>
          <button className="btn-link" onClick={goToHistory}>
            ⏰ Historial
          </button>
          
        </div>

        <button className="btn close-btn" onClick={onClose}>
          Cerrar
        </button>

        <DepositModal
          isOpen={showDeposit}
          onClose={() => setShowDeposit(false)}
        />
        <WithdrawModal
          isOpen={showWithdraw}
          onClose={() => setShowWithdraw(false)}
        />
      </div>
    </div>
  );
};