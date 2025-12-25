import { useEffect, useState } from "react";
import { leagueService } from "../../services/league.service";
import type { League } from "../../types/league";
import "./admin.css";

const LeaguesList = () => {
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    leagueService.getAll().then(setLeagues);
  }, []);

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Sport ID</th>
        </tr>
      </thead>
      <tbody>
        {leagues.map((l) => (
          <tr key={l.id}>
            <td>{l.id}</td>
            <td>{l.name}</td>
            <td>{l.sportId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaguesList;