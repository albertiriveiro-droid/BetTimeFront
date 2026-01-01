import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { transactionService } from "../../services/transaction.service";
import type { TransactionCreateDTO } from "../../types/transaction";

export const DepositModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, token, login } = useAuth();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  if (!isOpen || !user) return null;

  const handleDeposit = async () => {
    try {
      const dto: TransactionCreateDTO = {
        userId: user.id,
        amount,
        type: "DEPOSIT",
        paymentMethod: "card",
      };

      const transaction = await transactionService.create(dto);


      login(token!, {
        ...user,
        balance: user.balance + transaction.amount,
      });

      onClose();
    } catch {
      setError("Error al realizar el depósito");
    }
  };

  return (
   <div className="transaction-modal-backdrop">
  <div className="transaction-modal">
    <h2>Depositar</h2>
    {error && <p className="transaction-error">{error}</p>}

    <input
      className="transaction-input"
      type="number"
      min="1"
      placeholder="Cantidad a depositar"
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
    />

    <button className="transaction-button-confirm deposit-button" onClick={handleDeposit}>
      Confirmar
    </button>
    <button className="transaction-button-cancel" onClick={onClose}>
      Cancelar
    </button>
  </div>
</div>

  );
};