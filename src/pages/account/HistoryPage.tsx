import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { transactionService } from "../../services/transaction.service";
import type { Transaction } from "../../types/transaction";
import "./HistoryPage.css";

const HistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    transactionService
      .getByUser(user.id)
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;
  if (loading) return <p>Cargando historial...</p>;

  return (
    <div className="history-page">
      <h1>📜 Historial de transacciones</h1>

      {transactions.length === 0 ? (
        <p>No hay transacciones todavía</p>
      ) : (
        <div className="transaction-list">
          {transactions.map(tx => (
            <div key={tx.id} className={`transaction-card ${tx.type}`}>
              <div className="tx-left">
                <span className="tx-type">
                  {tx.type === "DEPOSIT" ? "➕ Depósito" : "➖ Retirada"}
                </span>
                <span className="tx-date">
                  {new Date(tx.date).toLocaleString()}
                </span>
              </div>

              <div className="tx-right">
                <span className={`tx-amount ${tx.type}`}>
                  {tx.type === "DEPOSIT" ? "+" : "-"}
                  {tx.amount}€
                </span>
                {tx.paymentMethod && (
                  <span className="tx-method">{tx.paymentMethod}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;