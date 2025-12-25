import { useEffect, useState } from "react";
import { matchService } from "../../services/match.service";
import { marketService } from "../../services/market.service";
import { playerMarketService } from "../../services/playerMarket";
import PlayerMarketsList from "./PlayerMarketList";
import MarketsList from "./MarketList";

import type { MatchOutputDTO } from "../../types/match";
import type { Market } from "../../types/market";
import type { PlayerMarket } from "../../types/playerMarket";

import "./admin.css";

const AdminMatchMarkets = () => {
  const [matches, setMatches] = useState<MatchOutputDTO[]>([]);
  const [matchId, setMatchId] = useState<number | null>(null);

  const [markets, setMarkets] = useState<Market[]>([]);
  const [playerMarkets, setPlayerMarkets] = useState<PlayerMarket[]>([]);

  useEffect(() => {
    matchService.getAll().then(setMatches);
  }, []);

  useEffect(() => {
    if (!matchId) return;

    marketService.getByMatch(matchId).then(setMarkets);
    playerMarketService.getByMatch(matchId).then(setPlayerMarkets);
  }, [matchId]);

  return (
    <div className="admin-section">
      <h2>Mercados por partido</h2>

      <select
        className="admin-select"
        onChange={e => setMatchId(Number(e.target.value))}
      >
        <option value="">Selecciona partido</option>
        {matches.map(m => (
          <option key={m.id} value={m.id}>
            {m.homeTeamName} vs {m.awayTeamName}
          </option>
        ))}
      </select>

      {matchId && (
        <>
          <MarketsList markets={markets} />
          <PlayerMarketsList playerMarkets={playerMarkets} />
        </>
      )}
    </div>
  );
};

export default AdminMatchMarkets;
