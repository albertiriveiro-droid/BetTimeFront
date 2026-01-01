import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { transactionService } from "../../services/transaction.service";
import type { TransactionCreateDTO } from "../../types/transaction";

export const WithdrawModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, token, login } = useAuth();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  if (!isOpen || !user) return null;

  const handleWithdraw = async () => {
    if (amount > user.balance) {
      setError("Saldo insuficiente");
      return;
    }

    try {
      const dto: TransactionCreateDTO = {
        userId: user.id,
        amount,
        type: "WITHDRAW",
        paymentMethod: "balance",
      };

      const transaction = await transactionService.create(dto);

      login(token!, {
        ...user,
        balance: user.balance - transaction.amount,
      });

      onClose();
    } catch {
      setError("Error al retirar");
    }
  };

  return (
     <div className="transaction-modal-backdrop" onClick={onClose}>
      <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="transaction-modal-h2">Retirar</h2>
        {error && <p className="transaction-error">{error}</p>}

        <input
          className="transaction-input"
          type="number"
          min="1"
          placeholder="Cantidad a retirar"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button className="transaction-button-confirm withdraw-button" onClick={handleWithdraw}>
          Confirmar
        </button>
        <button className="transaction-button-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};