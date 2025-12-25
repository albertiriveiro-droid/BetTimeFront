import { useEffect, useState } from "react";
import { matchService } from "../../services/match.service";
import type { MatchOutputDTO } from "../../types/match";
import "./admin.css";

const MatchesList = () => {
  const [pendingMatches, setPendingMatches] = useState<MatchOutputDTO[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<MatchOutputDTO[]>([]);

  useEffect(() => {
    matchService.getAll().then((matches) => {
      setPendingMatches(matches.filter((m) => !m.finished));
      setFinishedMatches(matches.filter((m) => m.finished));
    });
  }, []);

  return (
    <div className="admin-matches">
      <h2>Partidos pendientes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Liga</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Inicio</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {pendingMatches.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.leagueId}</td>
                <td>{m.homeTeamName}</td>
                <td>{m.awayTeamName}</td>
              <td>{new Date(m.startTime).toLocaleString()}</td>
              <td>{m.durationMinutes} min</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Partidos finalizados</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Liga</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Resultado</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {finishedMatches.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.leagueId}</td>
                <td>{m.homeTeamName}</td>
                <td>{m.awayTeamName}</td>
              <td>{m.homeScore} - {m.awayScore}</td>
              <td>{m.durationMinutes} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesList;