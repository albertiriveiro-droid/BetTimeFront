import { useState } from "react";
import { useBetSlip } from "./BetSlipContext";
import { betService } from "../../services/bet.service";
import { useAuth } from "../../context/AuthContext";
import "./betslip.css";

const BetSlipModal = () => {
  const { selection, closeBetSlip } = useBetSlip();
  const { user, refreshUser } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!selection) return null;

  const potentialWin = amount * selection.odds;

  const handleClose = () => {
    setAmount(0);
    setMessage(null);
    closeBetSlip();
  };

  const handlePlaceBet = async () => {
    if (!user) {
      setMessage({ type: "error", text: "Debes iniciar sesión para poder apostar" });
      return;
    }
    if (amount <= 0) {
      setMessage({ type: "error", text: "Debes introducir una cantidad válida" });
      return;
    }
    if (amount > user.balance) {
      setMessage({ type: "error", text: "Saldo insuficiente" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await betService.create({
        userId: user.id,
        amount,
        marketSelectionId: selection.type === "market" ? selection.selectionId : undefined,
        playerMarketSelectionId: selection.type === "player" ? selection.selectionId : undefined
      });

      await refreshUser();

      setMessage({ type: "success", text: "¡Apuesta creada con éxito!" });

      setAmount(0);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error al crear la apuesta" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="betslip-overlay">
      <div className="betslip-modal">
        <h3>Apuesta</h3>

        <div className="betslip-selection">
          <span>{selection.label}</span>
          <strong>@ {selection.odds}</strong>
        </div>

        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Cantidad"
        />

        <div className="betslip-win">
          Ganancia potencial: <strong>{potentialWin.toFixed(2)}€</strong>
        </div>

        {message && (
          <div className={`betslip-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="betslip-actions">
          <button onClick={handleClose}>Cancelar</button>
          <button disabled={amount <= 0 || loading} onClick={handlePlaceBet}>
            Apostar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlipModal;
