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
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Depositar</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={handleDeposit}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};