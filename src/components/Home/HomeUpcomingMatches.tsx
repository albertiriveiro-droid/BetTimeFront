import { useEffect, useMemo, useState } from "react";
import { matchService } from "../../services/match.service";
import { marketService } from "../../services/market.service";
import type { MatchOutputDTO } from "../../types/match";
import { useNavigate } from "react-router-dom";
import "./home.css";

interface OneXTwoMarket {
  id: number;
  marketType: string;
  selections: { id: number; name: string; odd: number }[];
}

const HomeUpcomingMatches = () => {
  const [matches, setMatches] = useState<MatchOutputDTO[]>([]);
  const [marketsByMatch, setMarketsByMatch] = useState<
    Record<number, OneXTwoMarket>
  >({});
  const [searchTeam, setSearchTeam] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const navigate = useNavigate();

  const leagues = [
    "LaLiga",
    "Premier League",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
  ];

  useEffect(() => {
    matchService.getAll().then((allMatches) => {
      const pending = allMatches
        .filter((m) => !m.finished)
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() -
            new Date(b.startTime).getTime()
        );

      setMatches(pending);

      pending.forEach((m) => {
        marketService
          .getOneXTwoByMatch(m.id)
          .then((markets: OneXTwoMarket[]) => {
            if (markets.length > 0) {
              setMarketsByMatch((prev) => ({
                ...prev,
                [m.id]: markets[0],
              }));
            }
          });
      });
    });
  }, []);

  const handleMatchClick = (matchId: number) => {
    navigate(`/match/${matchId}`);
  };

  const resetFilters = () => {
    setSearchTeam("");
    setSelectedLeague(null);
  };

  const filteredMatches = useMemo(() => {
    let result = matches;

    if (selectedLeague) {
      result = result.filter((m) => m.leagueName === selectedLeague);
    }

    if (searchTeam.trim()) {
      const term = searchTeam.toLowerCase();
      result = result.filter(
        (m) =>
          m.homeTeamName.toLowerCase().includes(term) ||
          m.awayTeamName.toLowerCase().includes(term)
      );
    }

    return result;
  }, [matches, searchTeam, selectedLeague]);

  const groupedMatches = useMemo(() => {
    return filteredMatches.reduce<Record<string, MatchOutputDTO[]>>(
      (acc, match) => {
        const league = match.leagueName;
        if (!acc[league]) acc[league] = [];
        acc[league].push(match);
        return acc;
      },
      {}
    );
  }, [filteredMatches]);

  return (
    <div className="home-matches-container">
     
      <input
        type="text"
        className="home-search"
        placeholder="Buscar por equipo..."
        value={searchTeam}
        onChange={(e) => setSearchTeam(e.target.value)}
      />

     
      <div className="home-league-filters">
        {leagues.map((league) => (
          <button
            key={league}
            className={`league-filter-btn ${
              selectedLeague === league ? "active" : ""
            }`}
            onClick={() => setSelectedLeague(league)}
          >
            {league}
          </button>
        ))}

        <button className="league-filter-btn reset" onClick={resetFilters}>
          Todos
        </button>
      </div>

      <h2>Próximos partidos</h2>

      {Object.entries(groupedMatches).map(([league, leagueMatches]) => (
        <div key={league} className="home-league-group">
          <div className="home-league-title">{league}</div>

          {leagueMatches.map((m) => {
            const market = marketsByMatch[m.id];

            const homeOdd =
              market?.selections.find((s) => s.name === "Home")?.odd ?? "-";
            const drawOdd =
              market?.selections.find((s) => s.name === "Draw")?.odd ?? "-";
            const awayOdd =
              market?.selections.find((s) => s.name === "Away")?.odd ?? "-";

            return (
              <div key={m.id} className="home-match-card">
                <div className="home-match-date">
                  {new Date(m.startTime).toLocaleDateString()}
                </div>

                <div className="home-match-content">
                  <div
                    className="home-match-teams"
                    onClick={() => handleMatchClick(m.id)}
                  >
                    <div className="home-team">{m.homeTeamName}</div>
                    <div className="away-team">{m.awayTeamName}</div>

                    <div className="home-match-time">
                      {new Date(m.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="home-match-odds">
                    <button className="odd-btn">{homeOdd}</button>
                    <button className="odd-btn">{drawOdd}</button>
                    <button className="odd-btn">{awayOdd}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {filteredMatches.length === 0 && (
        <div className="home-empty">No se encontraron partidos</div>
      )}
    </div>
  );
};

export default HomeUpcomingMatches;
