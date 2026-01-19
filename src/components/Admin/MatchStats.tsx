import { useEffect, useState } from "react";
import { matchService } from "../../services/match.service";
import { playerService } from "../../services/player.service";
import { playerMatchStatsService } from "../../services/playerMatchStats.service";
import type { MatchOutputDTO } from "../../types/match";
import type { PlayerMatchStatsDTO } from "../../types/playerMatchStats";
import MatchCreateForm from "./MatchCreateForm";
import "./admin.css";

const AdminMatchStats = () => {
  const [pendingMatches, setPendingMatches] = useState<MatchOutputDTO[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<MatchOutputDTO[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchOutputDTO | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerMatchStatsDTO[]>([]);
  const [playerNames, setPlayerNames] = useState<Record<number, string>>({});
  const [loadingStats, setLoadingStats] = useState(false);


  const loadMatches = async () => {
    const matches = await matchService.getAll();
    setPendingMatches(matches.filter((m) => !m.finished));
    setFinishedMatches(matches.filter((m) => m.finished));
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const handleSelectMatch = async (match: MatchOutputDTO) => {
    setSelectedMatch(match);
    setLoadingStats(true);
    setPlayerStats([]);
    setPlayerNames({});

    try {
      const stats = await playerMatchStatsService.getByMatch(match.id);
      setPlayerStats(stats);

      const names: Record<number, string> = {};
      for (const ps of stats) {
        try {
          const player = await playerService.getById(ps.playerId);
          names[ps.playerId] = player.name;
        } catch {
          names[ps.playerId] = `Jugador #${ps.playerId}`;
        }
      }
      setPlayerNames(names);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="admin-matchstats">
     
      <MatchCreateForm onMatchCreated={loadMatches} />

      <h2 className="admin-matchstats-title">Partidos pendientes</h2>
      <table className="match-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Liga</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Inicio</th>
            <th>Duración</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pendingMatches.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.leagueName}</td>
              <td>{m.homeTeamName}</td>
              <td>{m.awayTeamName}</td>
              <td>{new Date(m.startTime).toLocaleString()}</td>
              <td>{m.durationMinutes} min</td>
              <td>
                <button
                  className="admin-matchstats-btn"
                  onClick={() => handleSelectMatch(m)}
                >
                  Ver stats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="admin-matchstats-title">Partidos finalizados</h2>
      <table className="match-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Liga</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Resultado</th>
            <th>Duración</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {finishedMatches.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.leagueName}</td>
              <td>{m.homeTeamName}</td>
              <td>{m.awayTeamName}</td>
              <td>
                {m.homeScore} - {m.awayScore}
              </td>
              <td>{m.durationMinutes} min</td>
              <td>
                <button
                  className="admin-matchstats-btn"
                  onClick={() => handleSelectMatch(m)}
                >
                  Ver stats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedMatch && (
        <div className="admin-matchstats-details">
          <h2 className="admin-matchstats-title">
            Estadísticas — {selectedMatch.homeTeamName} vs {selectedMatch.awayTeamName}
          </h2>

          {loadingStats ? (
            <div className="admin-matchstats-loading">Cargando estadísticas...</div>
          ) : (
            <table className="admin-matchstats-stats-table">
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th>Goles</th>
                  <th>Asistencias</th>
                  <th>Amarillas</th>
                  <th>Rojas</th>
                  <th>Minutos</th>
                </tr>
              </thead>
              <tbody>
                {playerStats.length > 0 ? (
                  playerStats.map((ps) => (
                    <tr key={ps.playerId}>
                      <td>{playerNames[ps.playerId] || `Jugador #${ps.playerId}`}</td>
                      <td>{ps.goals}</td>
                      <td>{ps.assists}</td>
                      <td>{ps.yellowCard}</td>
                      <td>{ps.redCard}</td>
                      <td>{ps.minutesPlayed}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No hay estadísticas disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMatchStats;
