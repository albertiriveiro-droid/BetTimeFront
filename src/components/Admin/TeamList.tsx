// src/components/admin/TeamsList.tsx
import { useEffect, useState } from "react";
import { teamService } from "../../services/team.service";
import type { Team } from "../../types/team";
import "./admin.css";

const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    teamService.getAll().then(setTeams);
  }, []);

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>League ID</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.name}</td>
            <td>{t.leagueId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamsList;
