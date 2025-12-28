import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { betService } from "../../services/bet.service";
import { matchService } from "../../services/match.service";
import type { BetOutputDTO } from "../../types/bet";
import type { MatchOutputDTO } from "../../types/match";
import "./betspage.css";

const BetsPage = () => {
  const { user, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"pending" | "finished">("pending");
  const [pendingBets, setPendingBets] = useState<BetOutputDTO[]>([]);
  const [finishedBets, setFinishedBets] = useState<BetOutputDTO[]>([]);
  const [matchesMap, setMatchesMap] = useState<Record<number, MatchOutputDTO>>({});

  
  useEffect(() => {
    if (!user) return;

    const fetchBetsAndMatches = async () => {
      try {
        const [pending, finished] = await Promise.all([
          betService.getActiveByUser(user.id),
          betService.getFinishedByUser(user.id),
        ]);

        setPendingBets(pending);
        setFinishedBets(finished);
        refreshUser();

       
        const allBets = [...pending, ...finished];
        const uniqueMatchIds = Array.from(new Set(allBets.map(b => b.matchId)));

        const mapCopy = { ...matchesMap };
        await Promise.all(uniqueMatchIds.map(async (id) => {
          if (!mapCopy[id]) {
            try {
              const match = await matchService.getById(id);
              mapCopy[id] = match;
            } catch (err) {
              console.warn(`No se pudo cargar partido ${id}`, err);
            }
          }
        }));

        setMatchesMap(mapCopy);
      } catch (err) {
        console.error("Error cargando apuestas o partidos", err);
      }
    };

    fetchBetsAndMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const renderBet = (bet: BetOutputDTO) => {
    const match = matchesMap[bet.matchId];
    const matchLabel = match
      ? `${match.homeTeamName} vs ${match.awayTeamName}`
      : `Partido #${bet.matchId}`;

 
    let selectionLabel = "-";

    if (bet.selectionName) {
      selectionLabel = bet.selectionName;

  
      if (bet.selectionName.toLowerCase().includes("over") && bet.playerMarketType) {
        selectionLabel = `${bet.selectionName} ${bet.playerMarketType}`;
      }
    } else if (bet.playerName && bet.playerMarketType) {
      selectionLabel = `${bet.playerName} - ${bet.playerMarketType}`;
    }

    const potentialWin = (bet.amountBet * bet.odds).toFixed(2);
    const wonAmount = bet.won ? bet.amountWon?.toFixed(2) ?? "0" : "0";

    return (
      <div key={bet.id} className="bet-card">
        <div className="bet-match">{matchLabel}</div>
        <div className="bet-market">Mercado: {bet.marketType ?? bet.playerMarketType ?? "-"}</div>
        <div className="bet-selection">Selección: {selectionLabel}</div>
        <div className="bet-amount">Cantidad: {bet.amountBet}€</div>
        <div className="bet-odds">Odds: {bet.odds}</div>
        <div className="bet-potential">
          {bet.won === null && <>Ganancia potencial: {potentialWin}€</>}
          {bet.won === true && <>Ganancia: {wonAmount}€</>}
          {bet.won === false && <>Ganancia: 0€</>}
        </div>
        <div className="bet-date">{new Date(bet.date).toLocaleString()}</div>
      </div>
    );
  };

  return (
    <div className="bets-page-container">
      <h2>Mis Apuestas</h2>

      <div className="bets-tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pendientes ({pendingBets.length})
        </button>

        <button
          className={activeTab === "finished" ? "active" : ""}
          onClick={() => setActiveTab("finished")}
        >
          Terminadas ({finishedBets.length})
        </button>
      </div>

      <div className="bets-list">
        {activeTab === "pending" &&
          (pendingBets.length === 0
            ? <p>No tienes apuestas pendientes</p>
            : pendingBets.map(renderBet))}

        {activeTab === "finished" &&
          (finishedBets.length === 0
            ? <p>No tienes apuestas terminadas</p>
            : finishedBets.map(renderBet))}
      </div>
    </div>
  );
};

export default BetsPage;
