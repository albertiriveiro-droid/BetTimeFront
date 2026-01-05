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

        await Promise.all(
          uniqueMatchIds.map(async (id) => {
            if (!mapCopy[id]) {
              try {
                const match = await matchService.getById(id);
                mapCopy[id] = match;
              } catch {
                console.warn(`No se pudo cargar partido ${id}`);
              }
            }
          })
        );

        setMatchesMap(mapCopy);
      } catch (err) {
        console.error("Error cargando apuestas", err);
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
      if ((bet.selectionName.toLowerCase() === "over" || bet.selectionName.toLowerCase() === "under") && bet.threshold !== undefined) {
        selectionLabel = `${bet.selectionName} ${bet.threshold}`;
      } else {
        selectionLabel = bet.selectionName;
      }
    } else if (bet.playerName && bet.playerMarketType) {
      selectionLabel = `${bet.playerName} - ${bet.playerMarketType}`;
    }

    const potentialWin = (bet.amountBet * bet.odds).toFixed(2);
    const wonAmount = bet.won ? bet.amountWon?.toFixed(2) ?? "0" : "0";
    const statusClass = bet.won === null ? "pending" : bet.won ? "won" : "lost";
    const matchDate = match?.startTime ? new Date(match.startTime) : null;

  
    const matchResult = match && activeTab === "finished"
      ? bet.marketType === "TotalCorners"
        ? `Corners: ${match.homeCorners}+${match.awayCorners}`
        : `Resultado: ${match.homeScore}:${match.awayScore}`
      : null;

    return (
      <div key={bet.id} className={`bet-card ${statusClass}`}>
        <div className="bet-main">

          
          <div className="bet-info">
            <div className="bet-market">{bet.marketType ?? bet.playerMarketType}</div>
            <div className="bet-selection">{selectionLabel}</div>
            <div className="bet-odds-block">
              <span className="bet-label">Cuota</span>
              <div className="bet-odds">{bet.odds}</div>
            </div>
            <div className="bet-match">
              {matchLabel}
              {matchResult && <div className="match-result">{matchResult}</div>}
            </div>
          </div>

        
          <div className="bet-financials">
            <div className="bet-money-block">
              <span className="bet-label">Importe</span>
              <div className="bet-stake">{bet.amountBet}€</div>
            </div>

            <div className="bet-money-block">
              <span className="bet-label">{bet.won === null ? "Ganancia potencial" : "Ganancia"}</span>
              <div className={`bet-win ${statusClass}`}>
                {bet.won === null ? potentialWin : bet.won ? wonAmount : "0"}€
              </div>
            </div>

            {matchDate && (
              <div className="bet-date">
                {matchDate.toLocaleDateString()} ·{" "}
                {matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bets-page-container">
      <h2>Mis Apuestas</h2>

      <div className="bets-tabs">
        <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
          Pendientes ({pendingBets.length})
        </button>
        <button className={activeTab === "finished" ? "active" : ""} onClick={() => setActiveTab("finished")}>
          Terminadas ({finishedBets.length})
        </button>
      </div>

      <div className="bets-list">
        {activeTab === "pending"
          ? pendingBets.length === 0
            ? <p>No tienes apuestas pendientes</p>
            : pendingBets.map(renderBet)
          : finishedBets.length === 0
          ? <p>No tienes apuestas terminadas</p>
          : [...finishedBets]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(renderBet)
        }
      </div>
    </div>
  );
};

export default BetsPage;
