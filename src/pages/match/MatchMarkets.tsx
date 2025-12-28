import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { marketService } from "../../services/market.service";
import { playerMarketService } from "../../services/playerMarket";
import { matchService } from "../../services/match.service";
import { useBetSlip } from "../../components/Bet/BetSlipContext";

import type { Market } from "../../types/market";
import type { PlayerMarketType, PlayerMarketOutputDTO } from "../../types/playerMarket";
import type { MatchOutputDTO } from "../../types/match";

import {
  formatMarketType,
  formatPlayerMarketType,
  formatSelectionWithMatch,
} from "../../utils/MarketFormatters";

import "./matchMarket.css";

const MatchMarkets = () => {
  const { id } = useParams();
  const matchId = Number(id);

  const { openBetSlip } = useBetSlip();

  const [match, setMatch] = useState<MatchOutputDTO | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [playerMarkets, setPlayerMarkets] = useState<PlayerMarketOutputDTO[]>([]);

  useEffect(() => {
    if (!matchId) return;

    matchService.getById(matchId).then(setMatch);
    marketService.getByMatch(matchId).then(setMarkets);
    playerMarketService.getByMatchDetails(matchId).then(setPlayerMarkets);
  }, [matchId]);

  const groupedPlayerMarketsByTeam = useMemo(() => {
    const result: Record<string, Record<PlayerMarketType, PlayerMarketOutputDTO[]>> = {};

    playerMarkets.forEach(pm => {
      const teamName = pm.teamName || "Desconocido";

      if (!result[teamName]) {
        result[teamName] = {
          Goal: [],
          Assist: [],
          YellowCard: [],
          RedCard: []
        };
      }

      result[teamName][pm.playerMarketType].push(pm);
    });

    return result;
  }, [playerMarkets]);

  if (!match) return null;

  return (
    <div className="match-markets-container">
      <div className="match-header">
        <div className="match-teams">
          {match.homeTeamName} vs {match.awayTeamName}
        </div>
        <div className="match-date">
          {new Date(match.startTime).toLocaleDateString()} ·{" "}
          {new Date(match.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {markets.map((market) => (
        <div key={market.id} className="market-block">
          <div className="market-title">{formatMarketType(market.marketType)}</div>

          <div className="market-selections">
            {market.selections?.map((s) => (
              <button
                key={s.id}
                className="selection-btn"
                onClick={() =>
                  openBetSlip({
                    type: "market",
                    selectionId: s.id,
                    label: formatSelectionWithMatch(market, s, match),
                    odds: s.odd
                  })
                }
              >
                <span>{formatSelectionWithMatch(market, s, match)}</span>
                <span className="odd">{s.odd}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {Object.entries(groupedPlayerMarketsByTeam).map(([teamName, marketsByType]) => (
        <div key={teamName} className="team-block">
          <h3>{teamName}</h3>

          {Object.entries(marketsByType).map(([type, markets]) => (
            <div key={type} className="market-block">
              <div className="market-title">
                {formatPlayerMarketType(type as PlayerMarketType)}
              </div>

              <div className="market-selections">
                {markets.flatMap(pm =>
                  pm.selections?.map(s => (
                    <button
                      key={s.id}
                      className="selection-btn"
                      onClick={() =>
                        openBetSlip({
                          type: "player",
                          selectionId: s.id,
                          label: `${pm.playerName} — ${formatPlayerMarketType(type as PlayerMarketType)}`,
                          odds: s.odd
                        })
                      }
                    >
                      <span>{pm.playerName}</span>
                      <span className="odd">{s.odd}</span>
                    </button>
                  )) ?? []
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchMarkets;
